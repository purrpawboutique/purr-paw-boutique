import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";

// Initialize Stripe with your secret key
const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}
const stripe = new Stripe(secretKey, {
  apiVersion: "2025-11-17.clover",
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Stripe Checkout Session endpoint
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { items, customerEmail } = req.body;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "Invalid items" });
      }

      // Convert cart items to Stripe line items
      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            description: item.size ? `Size: ${item.size}` : undefined,
            images: item.image ? [`https://purrpawboutique.uk${item.image}`] : undefined,
          },
          unit_amount: Math.round(item.price * 100), // Convert to pence
        },
        quantity: item.quantity,
      }));

      // Create Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'https://purrpawboutique.uk/thank-you?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://purrpawboutique.uk/cart',
        customer_email: customerEmail,
        shipping_address_collection: {
          allowed_countries: ['GB', 'IE', 'FR', 'DE', 'ES', 'IT', 'NL', 'BE'],
        },
        billing_address_collection: 'required',
        metadata: {
          items: JSON.stringify(items),
        },
      });

      res.json({ 
        sessionId: session.id,
        url: session.url 
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
  });

  // Stripe Payment Intent endpoint (keeping for backward compatibility)
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount, currency = "gbp", items } = req.body;

      // Validate the amount
      if (!amount || amount < 50) { // Minimum 50 pence
        return res.status(400).json({ error: "Invalid amount" });
      }

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount), // Amount in pence
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          items: JSON.stringify(items),
        },
      });

      res.json({
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  });

  // Get checkout session details
  app.get("/api/checkout-session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['line_items', 'customer_details']
      });

      res.json({
        id: session.id,
        payment_status: session.payment_status,
        customer_details: session.customer_details,
        amount_total: session.amount_total,
        currency: session.currency,
        line_items: session.line_items,
        metadata: session.metadata,
      });
    } catch (error) {
      console.error("Error retrieving checkout session:", error);
      res.status(500).json({ error: "Failed to retrieve session" });
    }
  });

  // Webhook endpoint for Stripe events
  app.post("/api/stripe-webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      console.error("Stripe webhook secret not configured");
      return res.status(400).send("Webhook secret not configured");
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return res.status(400).send(`Webhook Error: ${err}`);
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Checkout session completed:", session.id);
        
        // Here you would typically:
        // 1. Create order in database
        // 2. Send confirmation email
        // 3. Update inventory
        // 4. Trigger fulfillment process
        
        break;
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment succeeded:", paymentIntent.id);
        break;
      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", failedPayment.id);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  });

  // Order creation endpoint
  app.post("/api/orders", async (req, res) => {
    try {
      const {
        paymentIntentId,
        customerInfo,
        shippingAddress,
        billingAddress,
        items,
        totals,
      } = req.body;

      // Verify the payment intent was successful
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({ error: "Payment not completed" });
      }

      // Generate order number
      const orderNumber = `PPB-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;

      // Create order object
      const order = {
        id: `order_${Date.now()}`,
        orderNumber,
        paymentIntentId,
        status: "confirmed",
        customerInfo,
        shippingAddress,
        billingAddress,
        items,
        totals,
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      };

      // In a real app, you would save this to your database
      // await storage.insertOrder(order);

      console.log("Order created:", order);

      res.json({
        success: true,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          status: order.status,
        },
      });
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Get order by ID endpoint
  app.get("/api/orders/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      
      // In a real app, you would fetch from your database
      // const order = await storage.getOrderById(orderId);
      
      // For demo purposes, return mock data
      const mockOrder = {
        id: orderId,
        orderNumber: `PPB-2024-${String(Date.now()).slice(-6)}`,
        status: "confirmed",
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        items: [
          {
            id: "1",
            name: "Holiday Christmas Cape",
            image: "/api/placeholder/100/100",
            price: 59.99,
            quantity: 1,
            size: "M"
          }
        ],
        subtotal: 59.99,
        shipping: 0,
        tax: 12.00,
        total: 71.99,
        shippingAddress: {
          name: "John Doe",
          street: "123 Pet Street",
          city: "London",
          postalCode: "SW1A 1AA",
          country: "United Kingdom"
        },
        paymentMethod: {
          type: "Visa",
          last4: "4242"
        }
      };

      res.json(mockOrder);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  return httpServer;
}
