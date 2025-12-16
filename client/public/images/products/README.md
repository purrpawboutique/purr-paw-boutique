# Product Images Directory Structure

This directory contains organized product images for the Purr & Paw Boutique website.

## Directory Structure

```
/public/images/products/
├── holiday-christmas-luxurious-gown/
├── holiday-christmas-midnight-princess-gothic-lolita-dress/
└── holiday-christmas-candlelight-cape/
```

## Image Organization Guidelines

### File Naming Convention
- **Main product image**: `main.jpg` or `main.png`
- **Additional views**: `view-1.jpg`, `view-2.jpg`, etc.
- **Detail shots**: `detail-1.jpg`, `detail-2.jpg`, etc.
- **Lifestyle photos**: `lifestyle-1.jpg`, `lifestyle-2.jpg`, etc.

### Recommended Image Specifications
- **Format**: JPG or PNG
- **Main images**: 800x800px minimum (square aspect ratio)
- **Detail images**: 600x600px minimum
- **File size**: Under 500KB for web optimization
- **Quality**: High resolution for zoom functionality

### Example Structure for Each Product
```
holiday-christmas-luxurious-gown/
├── main.jpg              # Primary product image
├── view-1.jpg            # Side view
├── view-2.jpg            # Back view
├── detail-1.jpg          # Close-up of fabric/details
├── detail-2.jpg          # Close-up of embellishments
├── lifestyle-1.jpg       # Pet wearing the product
└── lifestyle-2.jpg       # Styled product shot
```

## Usage in Code

To reference these images in your React components:

```typescript
// For main product image
const mainImage = "/images/products/holiday-christmas-luxurious-gown/main.jpg";

// For image gallery
const productImages = [
  "/images/products/holiday-christmas-luxurious-gown/main.jpg",
  "/images/products/holiday-christmas-luxurious-gown/view-1.jpg",
  "/images/products/holiday-christmas-luxurious-gown/view-2.jpg",
  "/images/products/holiday-christmas-luxurious-gown/detail-1.jpg",
];
```

## SEO and Accessibility
- Use descriptive alt text for all images
- Include product name and key features in alt text
- Optimize images for web (compress without losing quality)
- Consider WebP format for better compression

## Notes
- The `.gitkeep` files in each directory ensure the folders are tracked by git
- Delete `.gitkeep` files once you add actual product images
- Consider using a CDN for production deployment for better performance