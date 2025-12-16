# 🚀 PRODUCTION DEPLOYMENT CHECKLIST

## ❌ CRITICAL - MUST COMPLETE BEFORE DEPLOYMENT

### 1. **STRIPE LIVE KEYS** 
- [ ] Replace `STRIPE_SECRET_KEY` with live key (starts with `sk_live_`)
- [ ] Replace `VITE_STRIPE_PUBLISHABLE_KEY` with live key (starts with `pk_live_`)
- [ ] Add `STRIPE_WEBHOOK_SECRET` from Stripe dashboard
- [ ] Test a real payment in Stripe dashboard

### 2. **DOMAIN CONFIGURATION**
- [ ] Update any hardcoded URLs to use `https://purrpawboutique.uk`
- [ ] Configure Stripe webhook endpoint: `https://purrpawboutique.uk/api/webhooks/stripe`
- [ ] Set up SSL certificate for the domain

### 3. **ENVIRONMENT VARIABLES**
```bash
# Required for production:
STRIPE_SECRET_KEY=your_live_secret_key
VITE_STRIPE_PUBLISHABLE_KEY=your_live_publishable_key  
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NODE_ENV=production
PORT=5000
```

## ✅ COMPLETED

### Pages & Content
- [x] Returns/Refund policy page created
- [x] Shipping page exists
- [x] Contact page exists
- [x] All product data is real (no placeholders)
- [x] Test files removed

### Technical
- [x] Build process works (`npm run build`)
- [x] All TypeScript errors resolved
- [x] No console errors in production build

## ⚠️ RECOMMENDED IMPROVEMENTS

### Performance
- [ ] Optimize images (compress product photos)
- [ ] Implement code splitting to reduce bundle size
- [ ] Add image lazy loading

### SEO & Analytics
- [ ] Add Google Analytics
- [ ] Add meta descriptions for all pages
- [ ] Add structured data for products
- [ ] Create sitemap.xml

### Security
- [ ] Add rate limiting for API endpoints
- [ ] Implement CSRF protection
- [ ] Add security headers

## 🔧 VERCEL DEPLOYMENT STEPS

### 1. **GitHub Repository**
   ```bash
   # Repository is ready at:
   https://github.com/purrpawboutique/purr-paw-boutique.git
   ```

### 2. **Vercel Setup**
   - [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - [ ] Click "Import Project"
   - [ ] Connect GitHub repository: `purrpawboutique/purr-paw-boutique`
   - [ ] Configure build settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`

### 3. **Environment Variables in Vercel**
   Add these in Vercel Dashboard → Project → Settings → Environment Variables:
   ```
   STRIPE_SECRET_KEY=your_live_secret_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_live_publishable_key
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   NODE_ENV=production
   ```

### 4. **Domain Configuration**
   - [ ] In Vercel Dashboard → Project → Settings → Domains
   - [ ] Add custom domain: `purrpawboutique.uk`
   - [ ] Configure DNS records as instructed by Vercel
   - [ ] Wait for SSL certificate provisioning

### 5. **Stripe Webhook Configuration**
   - [ ] Go to Stripe Dashboard → Webhooks
   - [ ] Add endpoint: `https://purrpawboutique.uk/api/stripe-webhook`
   - [ ] Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
   - [ ] Copy webhook secret to Vercel environment variables

### 6. **Test Deployment**
   - [ ] Visit `https://purrpawboutique.uk`
   - [ ] Test product browsing
   - [ ] Add item to cart
   - [ ] Complete checkout with test card (use Stripe test mode first)
   - [ ] Verify payment in Stripe dashboard
   - [ ] Switch to live mode and test with real card

## 🚨 CRITICAL WARNINGS

- **DO NOT DEPLOY** with test Stripe keys
- **DO NOT DEPLOY** without SSL certificate
- **TEST PAYMENTS** thoroughly before going live
- **BACKUP** your data before deployment

## 📞 SUPPORT CONTACTS

If you need help with:
- **Stripe Setup**: https://stripe.com/docs/keys
- **Domain Configuration**: Your hosting provider
- **SSL Certificates**: Let's Encrypt or your hosting provider