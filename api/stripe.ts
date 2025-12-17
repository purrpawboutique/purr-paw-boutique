import Stripe from 'stripe';

// Use Node.js types instead of @vercel/node to avoid build errors
interface VercelRequest {
  method?: string;
  url?: string;
  headers: { [key: string]: string | string[] | undefined };
  body: any;
  on: (event: string, callback: (chunk: Buffer) => void) => void;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: any) => void;
  send: (data: string) => void;
  end: () => void;
  setHeader: (name: string, value: string) => void;
}

// Initialize Stripe
const secretKey = process.env.STRIPE_SECRET_KEY;
if (!secretKey) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}
const stripe = new Stripe(secretKey, {
  apiVersion: "2025-11-17.clover",
});

// Disable body parsing for webhook endpoint
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to get raw body
async function getRawBody(req: VercelRequest): Promise<string> {
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method, url } = req;
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, stripe-signature');
  
  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (url?.includes('/api/create-checkout-session')) {
      return await handleCreateCheckoutSession(req, res);
    }
    
    if (url?.includes('/api/create-payment-intent')) {
      return await handleCreatePaymentIntent(req, res);
    }
    
    if (url?.includes('/api/checkout-session/')) {
      return await handleGetCheckoutSession(req, res);
    }
    
    if (url?.includes('/api/stripe-webhook')) {
      return await handleStripeWebhook(req, res);
    }
    
    if (url?.includes('/api/orders')) {
      return await handleOrders(req, res);
    }
    
    return res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleCreateCheckoutSession(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customerEmail } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Invalid items' });
    }

    console.log('Creating checkout session for', items.length, 'items');

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
          description: item.size ? `Size: ${item.size}` : undefined,
          images: item.image ? [`https://purrpawboutique.uk${item.image}`] : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

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

    console.log('✅ Checkout session created:', session.id);
    return res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ Checkout session error:', error.message);
    return res.status(500).json({ error: error.message || 'Failed to create checkout session' });
  }
}

async function handleCreatePaymentIntent(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount, currency = 'gbp', items } = req.body;
  
  if (!amount || amount < 50) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount),
    currency,
    automatic_payment_methods: { enabled: true },
    metadata: { items: JSON.stringify(items) },
  });

  return res.json({
    client_secret: paymentIntent.client_secret,
    payment_intent_id: paymentIntent.id,
  });
}

async function handleGetCheckoutSession(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sessionId = req.url?.split('/').pop();
  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID required' });
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'customer_details'],
  });

  return res.json({
    id: session.id,
    payment_status: session.payment_status,
    customer_details: session.customer_details,
    amount_total: session.amount_total,
    currency: session.currency,
    line_items: session.line_items,
    metadata: session.metadata,
  });
}

async function handleStripeWebhook(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!webhookSecret) {
    console.error('⚠️ STRIPE_WEBHOOK_SECRET not configured');
    console.warn('Processing webhook without signature verification - CONFIGURE IN PRODUCTION');
    
    // For initial setup only - parse body directly
    try {
      const rawBody = await getRawBody(req);
      const event = JSON.parse(rawBody);
      await processWebhookEvent(event);
      return res.json({ received: true, warning: 'no_signature_verification' });
    } catch (err: any) {
      console.error('Failed to parse webhook body:', err.message);
      return res.status(400).send('Invalid webhook payload');
    }
  }

  // Production path: verify signature
  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
    console.log('✅ Webhook signature verified:', event.type);
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  await processWebhookEvent(event);
  return res.json({ received: true });
}

async function processWebhookEvent(event: any) {
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('Checkout session completed:', event.data.object.id);
      // TODO: Save order to database
      break;
    case 'payment_intent.succeeded':
      console.log('Payment succeeded:', event.data.object.id);
      // TODO: Update order status
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed:', event.data.object.id);
      // TODO: Handle failed payment
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
}

async function handleOrders(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Create order
    const { paymentIntentId, customerInfo, shippingAddress, billingAddress, items, totals } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    const orderNumber = `PPB-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const order = {
      id: `order_${Date.now()}`,
      orderNumber,
      paymentIntentId,
      status: 'confirmed',
      customerInfo,
      shippingAddress,
      billingAddress,
      items,
      totals,
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    console.log('Order created:', order);
    return res.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        status: order.status,
      },
    });
  }
  
  if (req.method === 'GET') {
    // Get order
    const orderId = req.url?.split('/').pop();
    const mockOrder = {
      id: orderId,
      orderNumber: `PPB-2024-${String(Date.now()).slice(-6)}`,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      items: [
        {
          id: '1',
          name: 'Holiday Christmas Cape',
          image: '/images/products/holiday-christmas-luxurious-gown/main.JPG',
          price: 59.99,
          quantity: 1,
          size: 'M',
        },
      ],
      subtotal: 59.99,
      shipping: 0,
      tax: 12.0,
      total: 71.99,
      shippingAddress: {
        name: 'John Doe',
        street: '123 Pet Street',
        city: 'London',
        postalCode: 'SW1A 1AA',
        country: 'United Kingdom',
      },
      paymentMethod: {
        type: 'Visa',
        last4: '4242',
      },
    };

    return res.json(mockOrder);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}