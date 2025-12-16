# Purr & Paw Boutique

A luxury pet fashion e-commerce platform built with React, TypeScript, and Stripe.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## 🌐 Deployment

### Vercel Deployment

1. **Connect to Vercel**:
   - Import this repository in Vercel dashboard
   - Connect to `https://github.com/purrpawboutique/purr-paw-boutique.git`

2. **Environment Variables** (Required):
   ```
   STRIPE_SECRET_KEY=your_live_stripe_secret_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_live_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NODE_ENV=production
   ```

3. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Domain Configuration**:
   - Add custom domain: `purrpawboutique.uk`
   - Configure DNS to point to Vercel

### Stripe Configuration

1. **Webhook Endpoint**:
   - URL: `https://purrpawboutique.uk/api/stripe-webhook`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`

2. **Success/Cancel URLs**:
   - Success: `https://purrpawboutique.uk/thank-you?session_id={CHECKOUT_SESSION_ID}`
   - Cancel: `https://purrpawboutique.uk/cart`

## 🛍️ Features

- **Product Catalog**: Holiday, Signature, OOTD, Accessories, Knits, and Haute Couture collections
- **Shopping Cart**: Persistent cart with size selection
- **Stripe Checkout**: Secure payment processing
- **Responsive Design**: Mobile-first approach
- **Image Galleries**: Product detail pages with multiple views
- **Customer Pages**: Shipping, Returns, Contact information

## 🏗️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **Payment**: Stripe Checkout & Payment Intents
- **Build**: Vite, ESBuild
- **Deployment**: Vercel

## 📁 Project Structure

```
├── client/          # Frontend React application
├── server/          # Backend Express server
├── shared/          # Shared types and utilities
├── dist/            # Production build output
└── public/          # Static assets
```

## 🔒 Security

- Environment variables for all secrets
- Stripe webhook signature verification
- HTTPS enforced in production
- No hardcoded API keys

## 📞 Support

For deployment issues or questions:
- Check `PRODUCTION_CHECKLIST.md`
- Verify environment variables are set
- Ensure Stripe webhooks are configured