#!/bin/bash

echo "🚀 Preparing Purr & Paw Boutique for deployment..."

# Ensure .env is not tracked
git rm --cached .env 2>/dev/null || echo "✅ .env file not tracked"

# Add all files except those in .gitignore
git add .

# Commit changes
git commit -m "feat: Production-ready Purr & Paw Boutique e-commerce platform

- Complete product catalog with Haute Couture collection
- Stripe payment integration with environment variables
- Responsive design with image galleries
- Customer service pages (Shipping, Returns, Contact)
- Production build configuration
- Vercel deployment ready"

# Push to main branch
git push origin main

echo "✅ Code pushed to GitHub successfully!"
echo ""
echo "🌐 Ready for Vercel deployment:"
echo "1. Import repository: https://github.com/purrpawboutique/purr-paw-boutique.git"
echo "2. Set environment variables in Vercel dashboard"
echo "3. Configure custom domain: purrpawboutique.uk"
echo "4. Set up Stripe webhooks"
echo ""
echo "📋 See PRODUCTION_CHECKLIST.md for complete deployment guide"