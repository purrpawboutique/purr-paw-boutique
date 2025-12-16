# Checkout & Payment Setup Guide

## Overview
The Purr & Paw Boutique checkout system is built with Stripe integration, providing a secure and seamless payment experience for customers.

## Features
- ✅ Multi-step checkout process (Contact → Shipping → Payment)
- ✅ Stripe Elements integration for secure payment processing
- ✅ Real-time payment validation
- ✅ Order confirmation and tracking
- ✅ Responsive design for all devices
- ✅ Cart persistence with localStorage
- ✅ Multiple payment methods (Cards, Apple Pay, Google Pay)
- ✅ Address validation and autocomplete
- ✅ Tax and shipping calculations
- ✅ Order management system

## Setup Instructions

### 1. Stripe Account Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up webhooks for payment confirmations

### 2. Environment Variables
Create a `.env` file in the root directory:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Other Configuration
NODE_ENV=development
PORT=5000
```

### 3. Webhook Configuration
1. In your Stripe Dashboard, go to Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy the webhook secret to your environment variables

## API Endpoints

### Payment Intent Creation
```
POST /api/create-payment-intent
Content-Type: application/json

{
  "amount": 12718, // Amount in pence (£127.18)
  "currency": "gbp",
  "items": [
    {
      "id": "1",
      "name": "Holiday Christmas Cape",
      "price": 59.99,
      "quantity": 1,
      "size": "M"
    }
  ]
}
```

### Order Creation
```
POST /api/orders
Content-Type: application/json

{
  "paymentIntentId": "pi_...",
  "customerInfo": {
    "email": "customer@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+44 7700 900000"
  },
  "shippingAddress": { ... },
  "billingAddress": { ... },
  "items": [ ... ],
  "totals": {
    "subtotal": 105.98,
    "shipping": 0,
    "tax": 21.20,
    "total": 127.18
  }
}
```

### Order Retrieval
```
GET /api/orders/:orderId
```

## Component Structure

### CheckoutPage
Main checkout container that handles:
- Payment intent creation
- Cart validation
- Stripe Elements provider setup
- Order completion flow

### CheckoutForm
Multi-step form with:
- Contact information collection
- Shipping address (using Stripe Address Element)
- Payment processing (using Stripe Payment Element)
- Form validation with React Hook Form + Zod

### OrderSummary
Displays:
- Cart items with images and details
- Price breakdown (subtotal, shipping, tax, total)
- Trust indicators and payment methods
- Free shipping promotions

### OrderConfirmationPage
Post-purchase experience:
- Order confirmation details
- Order status tracking
- Customer actions (download invoice, email details)
- Related product recommendations

## Security Features
- PCI DSS compliant payment processing through Stripe
- Webhook signature verification
- Input validation and sanitization
- Secure payment intent creation
- No sensitive payment data stored locally

## Testing
Use Stripe's test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

## Production Deployment
1. Replace test API keys with live keys
2. Update webhook endpoints to production URLs
3. Configure proper SSL certificates
4. Set up monitoring and logging
5. Test payment flows thoroughly

## Customization
The checkout system is designed to be easily customizable:
- Modify styling in component files
- Add custom validation rules
- Integrate with different payment providers
- Add additional checkout steps
- Customize order confirmation emails

## Support
For issues or questions:
1. Check Stripe documentation
2. Review browser console for errors
3. Verify webhook delivery in Stripe Dashboard
4. Test with different payment methods