// Example product data structure using the new image directory organization

export interface ProductImage {
  url: string;
  alt: string;
  type: 'main' | 'view' | 'detail' | 'lifestyle';
}

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  images: ProductImage[];
  features: string[];
  materials: string[];
  careInstructions: string[];
  sizes: Array<{
    name: string;
    measurements: {
      chest: string;
      length: string;
      neck: string;
      sleeve?: string;
    };
    inStock: boolean;
    stockQuantity?: number;
  }>;
  isNew?: boolean;
  isBestseller?: boolean;
}

// Product data using uploaded images and updated pricing
export const holidayProducts: ProductData[] = [
  {
    id: "holiday-christmas-luxurious-gown",
    slug: "holiday-christmas-luxurious-gown",
    name: "Christmas Luxurious Gown",
    price: 59.99,
    category: "Holiday Collection",
    description: "An exquisite luxurious gown perfect for holiday celebrations. Crafted with premium materials and elegant details that will make your pet the star of any festive gathering.",
    images: [
      {
        url: "/images/products/holiday-christmas-luxurious-gown/main.JPG",
        alt: "Holiday Christmas Luxurious Gown - Main View",
        type: "main"
      },
      {
        url: "/images/products/holiday-christmas-luxurious-gown/view1.JPG",
        alt: "Holiday Christmas Luxurious Gown - Gallery View 1",
        type: "view"
      },
      {
        url: "/images/products/holiday-christmas-luxurious-gown/view2.JPG",
        alt: "Holiday Christmas Luxurious Gown - Gallery View 2",
        type: "view"
      },
      {
        url: "/images/products/holiday-christmas-luxurious-gown/view3.JPG",
        alt: "Holiday Christmas Luxurious Gown - Gallery View 3",
        type: "view"
      }
    ],
    features: [
      "Premium velvet fabric with gold accents",
      "Comfortable fit with adjustable straps",
      "Easy-to-use snap closures",
      "Machine washable",
      "One size fits most"
    ],
    materials: [
      "Outer: 100% Premium Velvet",
      "Lining: Soft Cotton Blend",
      "Trim: Metallic Gold Thread",
      "Hardware: Nickel-free Snaps"
    ],
    careInstructions: [
      "Machine wash cold on gentle cycle",
      "Air dry only - do not tumble dry",
      "Iron on low heat if needed",
      "Store flat to maintain shape"
    ],
    sizes: [
      {
        name: "One Size",
        measurements: { chest: "16-24\"", length: "12-16\"", neck: "12-16\"" },
        inStock: true
      }
    ],
    isNew: true,
    isBestseller: true
  },
  {
    id: "holiday-christmas-midnight-princess-gothic-lolita-dress",
    slug: "holiday-christmas-midnight-princess-gothic-lolita-dress",
    name: "Midnight Princess Gothic Lolita Dress",
    price: 59.99,
    category: "Holiday Collection",
    description: "A stunning gothic lolita dress perfect for sophisticated pets who love dramatic fashion. Features intricate lace details and a flowing silhouette.",
    images: [
      {
        url: "/images/products/holiday-christmas-midnight-princess-gothic-lolita-dress/main.jpg",
        alt: "Midnight Princess Gothic Lolita Dress - Main View",
        type: "main"
      },
      {
        url: "/images/products/holiday-christmas-midnight-princess-gothic-lolita-dress/view1.jpg",
        alt: "Midnight Princess Gothic Lolita Dress - Gallery View 1",
        type: "view"
      },
      {
        url: "/images/products/holiday-christmas-midnight-princess-gothic-lolita-dress/view2.jpg",
        alt: "Midnight Princess Gothic Lolita Dress - Gallery View 2",
        type: "view"
      },
      {
        url: "/images/products/holiday-christmas-midnight-princess-gothic-lolita-dress/view3.jpg",
        alt: "Midnight Princess Gothic Lolita Dress - Gallery View 3",
        type: "view"
      }
    ],
    features: [
      "Intricate lace overlay",
      "Flowing gothic silhouette",
      "Premium black fabric",
      "Comfortable inner lining",
      "Medium size fit"
    ],
    materials: [
      "Outer: Premium Cotton Blend",
      "Lace: Delicate Polyester Lace",
      "Lining: Soft Cotton",
      "Hardware: Antique Brass Buttons"
    ],
    careInstructions: [
      "Hand wash in cold water",
      "Lay flat to dry",
      "Do not bleach",
      "Iron lace on low heat with pressing cloth"
    ],
    sizes: [
      {
        name: "M",
        measurements: { chest: "16-20\"", length: "13\"", neck: "12-14\"" },
        inStock: true
      }
    ],
    isNew: true
  },
  {
    id: "holiday-christmas-candlelight-cape",
    slug: "holiday-christmas-candlelight-cape",
    name: "Christmas Candlelight Cape",
    price: 46.99,
    category: "Holiday Collection",
    description: "A magical candlelight-inspired cape that brings warmth and elegance to your pet's holiday wardrobe. Perfect for evening celebrations and special occasions.",
    images: [
      {
        url: "/images/products/holiday-christmas-candlelight-cape/main.jpg",
        alt: "Holiday Christmas Candlelight Cape - Main View",
        type: "main"
      },
      {
        url: "/images/products/holiday-christmas-candlelight-cape/view1.jpg",
        alt: "Holiday Christmas Candlelight Cape - Gallery View 1",
        type: "view"
      },
      {
        url: "/images/products/holiday-christmas-candlelight-cape/view2.JPG",
        alt: "Holiday Christmas Candlelight Cape - Gallery View 2",
        type: "view"
      },
      {
        url: "/images/products/holiday-christmas-candlelight-cape/view3.jpg",
        alt: "Holiday Christmas Candlelight Cape - Gallery View 3",
        type: "view"
      },
      {
        url: "/images/products/holiday-christmas-candlelight-cape/view4.jpg",
        alt: "Holiday Christmas Candlelight Cape - Gallery View 4",
        type: "view"
      },
      {
        url: "/images/products/holiday-christmas-candlelight-cape/view5.jpg",
        alt: "Holiday Christmas Candlelight Cape - Gallery View 5",
        type: "view"
      }
    ],
    features: [
      "Warm, cozy fabric",
      "Elegant draping design",
      "Easy snap closure",
      "Lightweight and comfortable",
      "Small size fit"
    ],
    materials: [
      "Outer: Wool Blend",
      "Lining: Fleece",
      "Trim: Satin Ribbon",
      "Hardware: Pearl Snap Closure"
    ],
    careInstructions: [
      "Dry clean recommended",
      "Or hand wash in cold water",
      "Air dry flat",
      "Do not wring or twist"
    ],
    sizes: [
      {
        name: "S",
        measurements: { chest: "12-16\"", length: "9\"", neck: "10-12\"" },
        inStock: false,
        stockQuantity: 0
      }
    ],
    isBestseller: true
  },
  {
    id: "costumes-alice-bunny-magic-show-dress",
    slug: "costumes-alice-bunny-magic-show-dress",
    name: "Alice Bunny Magic Show Dress",
    price: 59.99,
    category: "Costumes",
    description: "A whimsical Alice in Wonderland inspired bunny dress perfect for magic shows and special performances. This enchanting costume combines classic fairy tale charm with adorable bunny elements.",
    images: [
      {
        url: "/images/products/costumes-alice-bunny-magic-show-dress/main.jpg",
        alt: "Alice Bunny Magic Show Dress - Main View",
        type: "main"
      },
      {
        url: "/images/products/costumes-alice-bunny-magic-show-dress/view1.jpg",
        alt: "Alice Bunny Magic Show Dress - Gallery View 1",
        type: "view"
      },
      {
        url: "/images/products/costumes-alice-bunny-magic-show-dress/view2.jpg",
        alt: "Alice Bunny Magic Show Dress - Gallery View 2",
        type: "view"
      },
      {
        url: "/images/products/costumes-alice-bunny-magic-show-dress/view3.jpg",
        alt: "Alice Bunny Magic Show Dress - Gallery View 3",
        type: "view"
      }
    ],
    features: [
      "Alice in Wonderland inspired design",
      "Adorable bunny ears and tail details",
      "Perfect for magic shows and performances",
      "High-quality costume materials",
      "Medium size fit"
    ],
    materials: [
      "Outer: Premium Cotton Blend",
      "Lining: Soft Polyester",
      "Trim: Satin Ribbon and Lace",
      "Accessories: Plush Bunny Ears and Tail"
    ],
    careInstructions: [
      "Hand wash in cold water",
      "Air dry flat",
      "Do not bleach",
      "Iron on low heat if needed",
      "Store costume flat to maintain shape"
    ],
    sizes: [
      {
        name: "M",
        measurements: { 
          chest: "40cm", 
          length: "33cm", 
          neck: "23cm",
          sleeve: "5-6cm"
        },
        inStock: true
      }
    ],
    isNew: true
  }
];

// Haute Couture Collection - Fully Custom Made
export const hauteCoutureProducts: ProductData[] = [
  {
    id: "haute-lady-shakespeare-couture-gown",
    slug: "haute-lady-shakespeare-couture-gown",
    name: "Lady Shakespeare Couture Gown",
    price: 699.99,
    category: "Haute Couture · Fully Custom Made",
    description: "Lady Shakespeare is a fully customized, haute couture pet collection inspired by the grandeur of European court culture. Drawing from Early Renaissance, Gothic, and Rococo aesthetics, this design revives romanticism's return to aristocratic elegance after Neoclassicism — dramatic, refined, and unapologetically opulent. Every piece is entirely handcrafted, with layered silhouettes and intricate embellishments creating rich color transitions and depth. Flowing skirts, ornate detailing, and sculptural elements come together to express the Rococo spirit — delicate, elaborate, and gracefully expressive.",
    images: [
      {
        url: "/images/products/haute-lady-shakespeare/main.jpg",
        alt: "Lady Shakespeare Couture Gown - Main View",
        type: "main"
      },
      {
        url: "/images/products/haute-lady-shakespeare/view1.jpg",
        alt: "Lady Shakespeare Couture Gown - Back Design with Crystal Embellishments",
        type: "view"
      },
      {
        url: "/images/products/haute-lady-shakespeare/view2.jpg",
        alt: "Lady Shakespeare Couture Gown - Rococo Pearl Necklace Collar Detail",
        type: "view"
      },
      {
        url: "/images/products/haute-lady-shakespeare/view3.jpg",
        alt: "Lady Shakespeare Couture Gown - Rose-textured Silk Ribbons and Bows",
        type: "view"
      },
      {
        url: "/images/products/haute-lady-shakespeare/view4.jpg",
        alt: "Lady Shakespeare Couture Gown - Intricate Lace Ruffles and Sleeves",
        type: "view"
      },
      {
        url: "/images/products/haute-lady-shakespeare/view5.jpg",
        alt: "Lady Shakespeare Couture Gown - Hand-sculpted 3D Flowers with Crystals",
        type: "view"
      },
      {
        url: "/images/products/haute-lady-shakespeare/view6.jpg",
        alt: "Lady Shakespeare Couture Gown - Full Silhouette Side View",
        type: "view"
      }
    ],
    features: [
      "✨ Couture Details - Back design: Dual-row crystal embellishments with red velvet cross-lacing, dramatic yet refined",
      "✨ Neckline: Rococo-inspired pearl necklace collar, paired with sculpted roses and crossed pearl chains at the chest",
      "✨ Skirt front: Rose-textured silk ribbons and handmade bows, creating layered visual richness",
      "✨ Sleeves & cuffs: Intricate lace ruffles with handcrafted bows, accented by pearls and crystal stones",
      "✨ Artisan florals: Hand-sculpted 3D flowers adorned with dual-tone crystals, adding movement and depth to every angle",
      "Fully customized, made to order",
      "Handcrafted by artisans",
      "Production time: Ships within 30 business days after purchase",
      "Extremely limited: Only 5 pieces worldwide",
      "This piece is not mass-produced. It is made for those who understand time, patience, and beauty."
    ],
    materials: [
      "Premium silk and velvet fabrics",
      "Hand-selected Swarovski crystals",
      "Natural pearls and semi-precious stones",
      "French lace and Italian ribbons",
      "Hand-sculpted floral elements",
      "Artisan-crafted embellishments"
    ],
    careInstructions: [
      "Professional dry cleaning only",
      "Handle with extreme care due to delicate embellishments",
      "Store in provided luxury garment bag",
      "Avoid direct sunlight and moisture",
      "Professional restoration services available"
    ],
    sizes: [
      {
        name: "Custom Made",
        measurements: {
          chest: "Custom fitted to your pet",
          length: "Custom fitted to your pet", 
          neck: "Custom fitted to your pet"
        },
        inStock: true,
        stockQuantity: 5
      }
    ],
    isNew: true,
    isBestseller: false
  }
];

// Signature Styles Collection
export const signatureProducts: ProductData[] = [
  {
    id: "signature-cinderella-lolita-cape",
    slug: "signature-cinderella-lolita-cape",
    name: "Cinderella Lolita Cape",
    price: 44.99,
    category: "Signature Styles",
    description: "An enchanting Cinderella-inspired lolita cape that transforms your pet into a fairy tale princess. Features elegant draping and adjustable sizing for the perfect fit.",
    images: [
      {
        url: "/images/products/signature-cinderella-lolita-cape/main.jpg",
        alt: "Signature Cinderella Lolita Cape - Main View",
        type: "main"
      }
    ],
    features: [
      "Fairy tale inspired design",
      "Fully adjustable neck circumference",
      "Elegant cape silhouette",
      "Premium lolita styling",
      "One size fits most"
    ],
    materials: [
      "Outer: Premium Satin",
      "Lining: Soft Cotton",
      "Trim: Delicate Lace",
      "Hardware: Pearl Buttons"
    ],
    careInstructions: [
      "Hand wash in cold water",
      "Air dry flat",
      "Do not bleach",
      "Iron on low heat with pressing cloth"
    ],
    sizes: [
      {
        name: "One Size",
        measurements: { 
          chest: "Adjustable", 
          length: "32cm", 
          neck: "22cm+ (fully adjustable)" 
        },
        inStock: true
      }
    ],
    isNew: true,
    isBestseller: true
  },
  {
    id: "signature-sakura-fairy-princess-dress",
    slug: "signature-sakura-fairy-princess-dress",
    name: "Sakura Fairy Princess Dress",
    price: 70.99,
    category: "Signature Styles",
    description: "A breathtaking sakura-inspired fairy princess dress that captures the delicate beauty of cherry blossoms. Perfect for special occasions and photo sessions.",
    images: [
      {
        url: "/images/products/signature-sakura-fairy-princess-dress/main.jpg",
        alt: "Sakura Fairy Princess Dress - Main View",
        type: "main"
      },
      {
        url: "/images/products/signature-sakura-fairy-princess-dress/view1.jpg",
        alt: "Sakura Fairy Princess Dress - View 1",
        type: "view"
      },
      {
        url: "/images/products/signature-sakura-fairy-princess-dress/view2.jpg",
        alt: "Sakura Fairy Princess Dress - View 2",
        type: "view"
      },
      {
        url: "/images/products/signature-sakura-fairy-princess-dress/view3.jpg",
        alt: "Sakura Fairy Princess Dress - View 3",
        type: "view"
      },
      {
        url: "/images/products/signature-sakura-fairy-princess-dress/view4.jpg",
        alt: "Sakura Fairy Princess Dress - View 4",
        type: "view"
      },
      {
        url: "/images/products/signature-sakura-fairy-princess-dress/view5.jpg",
        alt: "Sakura Fairy Princess Dress - View 5",
        type: "view"
      }
    ],
    features: [
      "Sakura cherry blossom inspired design",
      "Fairy princess silhouette",
      "Delicate floral embellishments",
      "Premium quality materials",
      "XS size for smaller pets"
    ],
    materials: [
      "Outer: Silk Blend",
      "Lining: Soft Tulle",
      "Embellishments: Silk Flowers",
      "Hardware: Hidden Snap Closures"
    ],
    careInstructions: [
      "Dry clean recommended",
      "Handle with care",
      "Store flat to maintain shape",
      "Keep away from sharp objects"
    ],
    sizes: [
      {
        name: "XS",
        measurements: { 
          chest: "26cm", 
          length: "16cm", 
          neck: "17cm" 
        },
        inStock: true
      }
    ],
    isNew: true
  },
  {
    id: "signature-elegant-tweed-gentleman-set",
    slug: "signature-elegant-tweed-gentleman-set",
    name: "Elegant Tweed Gentleman Set",
    price: 59.99,
    category: "Signature Styles",
    description: "A sophisticated tweed gentleman set that brings timeless elegance to your pet's wardrobe. Perfect for formal occasions and stylish everyday wear.",
    images: [
      {
        url: "/images/products/signature-elegant-tweed-gentleman-set/main.jpg",
        alt: "Signature Elegant Tweed Gentleman Set - Main View",
        type: "main"
      },
      {
        url: "/images/products/signature-elegant-tweed-gentleman-set/view1.jpg",
        alt: "Signature Elegant Tweed Gentleman Set - View 1",
        type: "view"
      },
      {
        url: "/images/products/signature-elegant-tweed-gentleman-set/view2.jpg",
        alt: "Signature Elegant Tweed Gentleman Set - View 2",
        type: "view"
      },
      {
        url: "/images/products/signature-elegant-tweed-gentleman-set/view3.jpg",
        alt: "Signature Elegant Tweed Gentleman Set - View 3",
        type: "view"
      }
    ],
    features: [
      "Classic tweed fabric",
      "Gentleman-inspired design",
      "Timeless elegant styling",
      "Available in M and L sizes",
      "Professional tailoring"
    ],
    materials: [
      "Outer: Premium Tweed Wool",
      "Lining: Silk Blend",
      "Trim: Leather Accents",
      "Hardware: Brass Buttons"
    ],
    careInstructions: [
      "Dry clean only",
      "Professional cleaning recommended",
      "Store on padded hangers",
      "Avoid moisture and direct sunlight"
    ],
    sizes: [
      {
        name: "M",
        measurements: { 
          chest: "41cm", 
          length: "29cm", 
          neck: "26cm" 
        },
        inStock: true
      },
      {
        name: "L",
        measurements: { 
          chest: "47cm", 
          length: "32cm", 
          neck: "29cm" 
        },
        inStock: true
      }
    ],
    isBestseller: true
  },
  {
    id: "signature-golden-soirée-set",
    slug: "signature-golden-soirée-set",
    name: "Golden Soirée Set",
    price: 59.99,
    category: "Signature Styles",
    description: "An elegant, Chanel-inspired ensemble designed for refined moments. The Golden Soirée Set includes a matching hat and jacket, paired with two detachable corsages — one for you, one for your pet — creating a beautifully coordinated look for special occasions. Crafted with attention to detail, this set blends classic tweed texture with soft comfort, offering a timeless silhouette that feels polished yet warm.",
    images: [
      {
        url: "/images/products/signature-golden-soiree-set/main.jpg",
        alt: "Golden Soirée Set - Main View",
        type: "main"
      },
      {
        url: "/images/products/signature-golden-soiree-set/view1.jpg",
        alt: "Golden Soirée Set - Complete Set View",
        type: "view"
      },
      {
        url: "/images/products/signature-golden-soiree-set/view2.jpg",
        alt: "Golden Soirée Set - Jacket Detail",
        type: "view"
      },
      {
        url: "/images/products/signature-golden-soiree-set/view3.jpg",
        alt: "Golden Soirée Set - Hat Detail",
        type: "view"
      },
      {
        url: "/images/products/signature-golden-soiree-set/view4.jpg",
        alt: "Golden Soirée Set - Corsage Detail",
        type: "view"
      },
      {
        url: "/images/products/signature-golden-soiree-set/view5.JPG",
        alt: "Golden Soirée Set - Gift Box Collection",
        type: "view"
      },
      {
        url: "/images/products/signature-golden-soiree-set/view6.JPG",
        alt: "Golden Soirée Set - Lifestyle Shot",
        type: "view"
      },
      {
        url: "/images/products/signature-golden-soiree-set/view7.JPG",
        alt: "Golden Soirée Set - Premium Packaging",
        type: "view"
      }
    ],
    features: [
      "Elegant, timeless design inspired by classic couture",
      "Refined tweed texture with a soft, structured feel",
      "Thoughtful details throughout, made to be noticed",
      "Detachable corsages for versatile styling and matching looks",
      "Perfect for formal occasions, dinners, celebrations, and photos",
      "Complete set includes: elegant tweed jacket, matching hat, 2 detachable corsages",
      "Hat circumference: 32cm, Hat diameter: 12cm",
      "Adjustable elastic strap for secure and comfortable fit",
      "Premium Gift Box Collection with gold-stamped accessories"
    ],
    materials: [
      "Outer Fabric: Tweed (30% Cotton, 70% Polyester)",
      "Lining: Combed Cotton - soft, smooth, and breathable",
      "Hat: Matching tweed with adjustable elastic strap",
      "Corsages: Detachable fabric flowers with premium finish"
    ],
    careInstructions: [
      "Dry clean recommended for best results",
      "Hand wash jacket in cold water if needed",
      "Air dry flat away from direct heat",
      "Store hat in dust bag to maintain shape",
      "Handle corsages gently to preserve details"
    ],
    sizes: [
      {
        name: "S",
        measurements: { 
          chest: "35cm", 
          length: "26cm", 
          neck: "26cm",
          sleeve: "7cm"
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "M",
        measurements: { 
          chest: "41cm", 
          length: "30cm", 
          neck: "29cm",
          sleeve: "8.5cm"
        },
        inStock: true,
        stockQuantity: 1
      }
    ],
    isNew: true,
    isBestseller: true
  }
];

// OOTD Collection
export const ootdProducts: ProductData[] = [
  {
    id: "ootd-sherlock-heritage-coat",
    slug: "ootd-sherlock-heritage-coat",
    name: "Sherlock Heritage Coat",
    price: 39.99,
    originalPrice: 54.99,
    category: "OOTD",
    description: "A classic Sherlock Holmes inspired heritage coat perfect for sophisticated pets. Features traditional detective styling with modern comfort.",
    images: [
      {
        url: "/images/products/ootd-sherlock-heritage-coat/main.jpg",
        alt: "OOTD Sherlock Heritage Coat - Main View",
        type: "main"
      },
      {
        url: "/images/products/ootd-sherlock-heritage-coat/view1.jpg",
        alt: "OOTD Sherlock Heritage Coat - View 1",
        type: "view"
      },
      {
        url: "/images/products/ootd-sherlock-heritage-coat/view2.jpg",
        alt: "OOTD Sherlock Heritage Coat - View 2",
        type: "view"
      },
      {
        url: "/images/products/ootd-sherlock-heritage-coat/view3.jpg",
        alt: "OOTD Sherlock Heritage Coat - View 3",
        type: "view"
      },
      {
        url: "/images/products/ootd-sherlock-heritage-coat/view4.jpg",
        alt: "OOTD Sherlock Heritage Coat - View 4",
        type: "view"
      },
      {
        url: "/images/products/ootd-sherlock-heritage-coat/view5.jpg",
        alt: "OOTD Sherlock Heritage Coat - View 5 (Big Dog)",
        type: "view"
      },
      {
        url: "/images/products/ootd-sherlock-heritage-coat/view6.jpg",
        alt: "OOTD Sherlock Heritage Coat - View 6",
        type: "view"
      }
    ],
    features: [
      "Sherlock Holmes inspired design",
      "Heritage coat styling",
      "Multiple size options",
      "Classic detective look",
      "Premium materials"
    ],
    materials: [
      "Outer: Wool Blend",
      "Lining: Cotton",
      "Trim: Faux Leather",
      "Hardware: Antique Brass"
    ],
    careInstructions: [
      "Dry clean recommended",
      "Hand wash in cold water if needed",
      "Air dry flat",
      "Store hanging"
    ],
    sizes: [
      {
        name: "XS",
        measurements: { 
          chest: "30cm", 
          length: "20cm", 
          neck: "21cm" 
        },
        inStock: true
      },
      {
        name: "S",
        measurements: { 
          chest: "35cm", 
          length: "25cm", 
          neck: "26cm" 
        },
        inStock: true
      },
      {
        name: "M",
        measurements: { 
          chest: "41cm", 
          length: "28cm", 
          neck: "29cm" 
        },
        inStock: true
      },
      {
        name: "L",
        measurements: { 
          chest: "47cm", 
          length: "30cm", 
          neck: "32cm" 
        },
        inStock: true
      },
      {
        name: "BD-S",
        measurements: { 
          chest: "60cm", 
          length: "30cm", 
          neck: "40cm" 
        },
        inStock: true
      }
    ],
    isNew: true
  },
  {
    id: "ootd-caramel-knit-turtleneck-sweater",
    slug: "ootd-caramel-knit-turtleneck-sweater",
    name: "Caramel Knit Turtleneck Sweater",
    price: 29.99,
    category: "OOTD",
    description: "A cozy caramel-colored knit turtleneck sweater perfect for everyday comfort. Available in multiple styles including curved-back hound design.",
    images: [
      {
        url: "/images/products/ootd-caramel-knit-turtleneck-sweater/main.jpg",
        alt: "OOTD Caramel Knit Turtleneck Sweater - Main View",
        type: "main"
      },
      {
        url: "/images/products/ootd-caramel-knit-turtleneck-sweater/view1.jpg",
        alt: "OOTD Caramel Knit Turtleneck Sweater - View 1",
        type: "view"
      },
      {
        url: "/images/products/ootd-caramel-knit-turtleneck-sweater/view2.jpg",
        alt: "OOTD Caramel Knit Turtleneck Sweater - View 2",
        type: "view"
      },
      {
        url: "/images/products/ootd-caramel-knit-turtleneck-sweater/view3.jpg",
        alt: "OOTD Caramel Knit Turtleneck Sweater - View 3",
        type: "view"
      },
      {
        url: "/images/products/ootd-caramel-knit-turtleneck-sweater/view4.jpg",
        alt: "OOTD Caramel Knit Turtleneck Sweater - View 4",
        type: "view"
      },
      {
        url: "/images/products/ootd-caramel-knit-turtleneck-sweater/view5.jpg",
        alt: "OOTD Caramel Knit Turtleneck Sweater - View 5",
        type: "view"
      },
      {
        url: "/images/products/ootd-caramel-knit-turtleneck-sweater/view6.jpg",
        alt: "OOTD Caramel Knit Turtleneck Sweater - View 6",
        type: "view"
      },
      {
        url: "/images/products/ootd-caramel-knit-turtleneck-sweater/view7.jpg",
        alt: "OOTD Caramel Knit Turtleneck Sweater - View 7",
        type: "view"
      }
    ],
    features: [
      "Soft caramel knit fabric",
      "Turtleneck design",
      "Multiple style options",
      "Curved-back hound style available",
      "Comfortable everyday wear"
    ],
    materials: [
      "Outer: Soft Knit Cotton",
      "Blend: Acrylic Mix",
      "Trim: Ribbed Knit",
      "Hardware: None"
    ],
    careInstructions: [
      "Machine wash cold",
      "Gentle cycle",
      "Air dry flat",
      "Do not bleach"
    ],
    sizes: [
      {
        name: "XS",
        measurements: { 
          chest: "30cm", 
          length: "22cm", 
          neck: "20cm" 
        },
        inStock: true
      },
      {
        name: "S",
        measurements: { 
          chest: "35cm", 
          length: "25cm", 
          neck: "23cm" 
        },
        inStock: true
      },
      {
        name: "M",
        measurements: { 
          chest: "41cm", 
          length: "28cm", 
          neck: "26cm" 
        },
        inStock: false
      },
      {
        name: "L",
        measurements: { 
          chest: "47cm", 
          length: "31cm", 
          neck: "29cm" 
        },
        inStock: false
      },
      {
        name: "LQ-S",
        measurements: { 
          chest: "41cm", 
          length: "33cm", 
          neck: "33cm" 
        },
        inStock: true
      },
      {
        name: "LQ-M",
        measurements: { 
          chest: "47cm", 
          length: "35cm", 
          neck: "38cm" 
        },
        inStock: true
      }
    ],
    isNew: true
  },
  {
    id: "ootd-panda-style-coat",
    slug: "ootd-panda-style-coat",
    name: "Panda Style Coat",
    price: 34.99,
    category: "OOTD",
    description: "An adorable panda-inspired coat that combines cuteness with functionality. Perfect for pets who love to stand out with playful style.",
    images: [
      {
        url: "/images/products/ootd-panda-style-coat/main.jpg",
        alt: "OOTD Panda Style Coat - Main View",
        type: "main"
      }
    ],
    features: [
      "Panda-inspired design",
      "Cute and functional",
      "Warm winter coat",
      "Playful styling",
      "Limited size availability"
    ],
    materials: [
      "Outer: Fleece",
      "Lining: Soft Cotton",
      "Trim: Faux Fur",
      "Hardware: Snap Closures"
    ],
    careInstructions: [
      "Machine wash cold",
      "Gentle cycle",
      "Air dry",
      "Do not iron"
    ],
    sizes: [
      {
        name: "M",
        measurements: { 
          chest: "41cm", 
          length: "28cm", 
          neck: "26cm" 
        },
        inStock: false
      },
      {
        name: "L",
        measurements: { 
          chest: "47cm", 
          length: "31cm", 
          neck: "32cm" 
        },
        inStock: true
      },
      {
        name: "XL",
        measurements: { 
          chest: "53cm", 
          length: "34cm", 
          neck: "35cm" 
        },
        inStock: false
      }
    ],
    isNew: true
  },
  {
    id: "ootd-premium-green-waterproof-jacket",
    slug: "ootd-premium-green-waterproof-jacket",
    name: "Premium Green Waterproof Jacket",
    price: 31.99,
    originalPrice: 45.99,
    category: "OOTD",
    description: "A premium waterproof jacket in elegant green. Perfect for rainy days while maintaining style and comfort.",
    images: [
      {
        url: "/images/products/ootd-premium-green-waterproof-jacket/main.jpg",
        alt: "OOTD Premium Green Waterproof Jacket - Main View",
        type: "main"
      }
    ],
    features: [
      "Waterproof material",
      "Premium green color",
      "Weather protection",
      "Stylish design",
      "Limited size availability"
    ],
    materials: [
      "Outer: Waterproof Nylon",
      "Lining: Mesh",
      "Trim: Reflective Strips",
      "Hardware: Waterproof Zippers"
    ],
    careInstructions: [
      "Wipe clean with damp cloth",
      "Air dry",
      "Do not machine wash",
      "Store in dry place"
    ],
    sizes: [
      {
        name: "S",
        measurements: { 
          chest: "35cm", 
          length: "23cm", 
          neck: "26cm" 
        },
        inStock: false
      },
      {
        name: "M",
        measurements: { 
          chest: "41cm", 
          length: "28cm", 
          neck: "26cm" 
        },
        inStock: true
      },
      {
        name: "L",
        measurements: { 
          chest: "47cm", 
          length: "31cm", 
          neck: "29cm" 
        },
        inStock: false
      }
    ],
    isNew: true
  },
  {
    id: "ootd-light-purple-waterproof-jacket",
    slug: "ootd-light-purple-waterproof-jacket",
    name: "Light Purple Waterproof Jacket",
    price: 31.99,
    originalPrice: 45.99,
    category: "OOTD",
    description: "A stylish light purple waterproof jacket perfect for all weather conditions. Combines functionality with fashionable design.",
    images: [
      {
        url: "/images/products/ootd-light-purple-waterproof-jacket/main.jpg",
        alt: "OOTD Light Purple Waterproof Jacket - Main View",
        type: "main"
      },
      {
        url: "/images/products/ootd-light-purple-waterproof-jacket/view1.jpg",
        alt: "OOTD Light Purple Waterproof Jacket - View 1",
        type: "view"
      },
      {
        url: "/images/products/ootd-light-purple-waterproof-jacket/view2.jpg",
        alt: "OOTD Light Purple Waterproof Jacket - View 2",
        type: "view"
      },
      {
        url: "/images/products/ootd-light-purple-waterproof-jacket/view3.jpg",
        alt: "OOTD Light Purple Waterproof Jacket - View 3",
        type: "view"
      },
      {
        url: "/images/products/ootd-light-purple-waterproof-jacket/view4.jpg",
        alt: "OOTD Light Purple Waterproof Jacket - View 4",
        type: "view"
      }
    ],
    features: [
      "Light purple color",
      "Waterproof protection",
      "All-weather design",
      "Multiple sizes available",
      "Fashionable and functional"
    ],
    materials: [
      "Outer: Waterproof Polyester",
      "Lining: Breathable Mesh",
      "Trim: Reflective Details",
      "Hardware: Rust-proof Snaps"
    ],
    careInstructions: [
      "Wipe clean with damp cloth",
      "Air dry completely",
      "Do not machine wash",
      "Store hanging"
    ],
    sizes: [
      {
        name: "XS",
        measurements: { 
          chest: "30cm", 
          length: "21cm", 
          neck: "20cm" 
        },
        inStock: true
      },
      {
        name: "S",
        measurements: { 
          chest: "35cm", 
          length: "23cm", 
          neck: "23cm" 
        },
        inStock: true
      },
      {
        name: "M",
        measurements: { 
          chest: "41cm", 
          length: "26cm", 
          neck: "26cm" 
        },
        inStock: true
      },
      {
        name: "L",
        measurements: { 
          chest: "47cm", 
          length: "29cm", 
          neck: "29cm" 
        },
        inStock: true
      },
      {
        name: "XL",
        measurements: { 
          chest: "53cm", 
          length: "33cm", 
          neck: "32cm" 
        },
        inStock: true
      }
    ],
    isNew: true
  },
  {
    id: "ootd-cream-textured-inner-shirt",
    slug: "ootd-cream-textured-inner-shirt",
    name: "Cream Textured Winter Inner Top",
    price: 29.99,
    category: "OOTD",
    description: "Cream Textured Winter Inner Top for Dogs & Cats with French-Style Knit Look and Front Tie Detail. Designed with a gentle wave-pattern fabric and a classic French-style front tie, it brings a touch of vintage romance to your furry friend's autumn and winter wardrobe. Perfect for both small dogs and cats. Soft Cozy Wave-Pattern Fabric makes it ideal for layering on chilly days, cozy indoor moments, and creating effortless warm winter outfits.",
    images: [
      {
        url: "/images/products/ootd-cream-textured-inner-shirt/main.jpg",
        alt: "OOTD Cream Textured Winter Inner Top - Main View",
        type: "main"
      },
      {
        url: "/images/products/ootd-cream-textured-inner-shirt/view1.jpg",
        alt: "OOTD Cream Textured Winter Inner Top - View 1",
        type: "view"
      },
      {
        url: "/images/products/ootd-cream-textured-inner-shirt/view2.jpg",
        alt: "OOTD Cream Textured Winter Inner Top - View 2",
        type: "view"
      },
      {
        url: "/images/products/ootd-cream-textured-inner-shirt/view3.jpg",
        alt: "OOTD Cream Textured Winter Inner Top - View 3",
        type: "view"
      }
    ],
    features: [
      "Elegant front-tie detail inspired by classic French styling",
      "Soft textured fabric with wave-like patterns for a vintage, romantic look",
      "Light and comfortable, ideal as an inner layer or standalone outfit",
      "Suitable for autumn & winter daily wear or photos",
      "Perfect for both small dogs and cats"
    ],
    materials: [
      "Main Fabric: 97% Polyester, 3% Spandex",
      "Soft wave-pattern texture",
      "French-style knit construction",
      "Comfortable stretch blend"
    ],
    careInstructions: [
      "Machine wash cold on gentle cycle",
      "Air dry flat to maintain shape",
      "Do not bleach or iron directly on fabric",
      "Store folded to preserve texture"
    ],
    sizes: [
      {
        name: "XS",
        measurements: { 
          chest: "30cm", 
          length: "23cm", 
          neck: "21cm" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "S",
        measurements: { 
          chest: "35cm", 
          length: "26cm", 
          neck: "26cm" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "M",
        measurements: { 
          chest: "41cm", 
          length: "29cm", 
          neck: "29cm" 
        },
        inStock: false,
        stockQuantity: 0
      },
      {
        name: "L",
        measurements: { 
          chest: "47cm", 
          length: "32cm", 
          neck: "32cm" 
        },
        inStock: false,
        stockQuantity: 0
      }
    ],
    isNew: true
  }
];

// Accessories Collection
export const accessoriesProducts: ProductData[] = [
  {
    id: "accessories-softwalk-leather-leash",
    slug: "accessories-softwalk-leather-leash",
    name: "SoftWalk Leather Leash",
    price: 29.99,
    category: "Accessories",
    description: "Crafted from eco-friendly sheepskin leather, this lightweight leash is designed to make every walk more comfortable—for both you and your pet. Soft to the touch yet durable, it distributes tension evenly to reduce strain, friction, and hand fatigue during daily outings. The breathable, supple leather feels gentle in the hand while remaining resistant to wear and scratching. A smooth zinc alloy clasp ensures secure attachment and effortless handling, finished with clean, reinforced stitching for added strength and longevity. Available in a range of carefully selected colours, this leash pairs everyday practicality with understated elegance.",
    images: [
      {
        url: "/images/products/accessories-softwalk-leather-leash/main.jpg",
        alt: "SoftWalk Leather Leash - Main View",
        type: "main"
      },
      {
        url: "/images/products/accessories-softwalk-leather-leash/view1.jpg",
        alt: "SoftWalk Leather Leash - Detail View 1",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-leather-leash/view2.jpg",
        alt: "SoftWalk Leather Leash - Sea Salt Lemon Color",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-leather-leash/view3.jpg",
        alt: "SoftWalk Leather Leash - Orange Forest Color",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-leather-leash/view4.jpg",
        alt: "SoftWalk Leather Leash - Moon Cloud White Color",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-leather-leash/view5.jpg",
        alt: "SoftWalk Leather Leash - Detail View 5",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-leather-leash/view6.jpg",
        alt: "SoftWalk Leather Leash - Detail View 6",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-leather-leash/view7.jpg",
        alt: "SoftWalk Leather Leash - Detail View 7",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-leather-leash/view8.jpg",
        alt: "SoftWalk Leather Leash - Detail View 8",
        type: "view"
      }
    ],
    features: [
      "Eco-friendly sheepskin leather",
      "Soft, lightweight, and breathable",
      "Even load distribution for comfortable walks",
      "Gentle on hands, reduces friction and pulling strain",
      "Durable zinc alloy clasp (smooth and secure)",
      "Reinforced stitching for long-lasting strength",
      "Multiple colour options available"
    ],
    materials: [
      "Main Material: Eco-friendly Sheepskin Leather",
      "Hardware: Zinc Alloy Clasp",
      "Stitching: Reinforced Thread",
      "Finish: Natural Leather Treatment"
    ],
    careInstructions: [
      "Wipe clean with damp cloth",
      "Allow to air dry naturally",
      "Apply leather conditioner occasionally",
      "Store in dry place away from direct sunlight",
      "Do not machine wash"
    ],
    sizes: [
      {
        name: "Sea Salt Lemon",
        measurements: { 
          chest: "One Size", 
          length: "75cm (excluding handle and clasp)", 
          neck: "Available Colors" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Orange Forest",
        measurements: { 
          chest: "One Size", 
          length: "75cm (excluding handle and clasp)", 
          neck: "Available Colors" 
        },
        inStock: true,
        stockQuantity: 2
      },
      {
        name: "Moon Cloud White",
        measurements: { 
          chest: "One Size", 
          length: "75cm (excluding handle and clasp)", 
          neck: "Available Colors" 
        },
        inStock: true,
        stockQuantity: 3
      }
    ],
    isNew: true,
    isBestseller: true
  },
  {
    id: "accessories-softwalk-airlight-harness",
    slug: "accessories-softwalk-airlight-harness",
    name: "SoftWalk AirLight Harness",
    price: 36.99,
    category: "Accessories",
    description: "Crafted with high-density webbing for exceptional durability and wear resistance. Features a honeycomb mesh lining that's waterproof and fur-resistant, ensuring comfort in all conditions. Enhanced with 3M reflective strips for superior visibility and safer nighttime walks. The smooth, burr-free leash attachment point is built to last without rust or wear. Quick-release buckle design provides secure, reliable fastening with effortless on-and-off convenience. Water-repellent fabric surface resists moisture and stays easy to maintain. This all-season design offers breathable comfort with lightweight, quick-dry performance.",
    images: [
      {
        url: "/images/products/accessories-softwalk-airlight-harness/main.jpg",
        alt: "SoftWalk AirLight Harness - Main View",
        type: "main"
      },
      {
        url: "/images/products/accessories-softwalk-airlight-harness/view1.jpg",
        alt: "SoftWalk AirLight Harness - Detail View 1",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-airlight-harness/view2.jpg",
        alt: "SoftWalk AirLight Harness - Moon Cloud White",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-airlight-harness/view3.jpg",
        alt: "SoftWalk AirLight Harness - Orange Forest",
        type: "view"
      },
      {
        url: "/images/products/accessories-softwalk-airlight-harness/view4.jpg",
        alt: "SoftWalk AirLight Harness - Sea Salt Lemon",
        type: "view"
      }
    ],
    features: [
      "Durable high-density webbing",
      "Water-resistant honeycomb mesh lining",
      "3M reflective details for night visibility",
      "Smooth, rust-resistant leash attachment",
      "Secure buckle for easy on and off",
      "Water-repellent outer fabric",
      "Lightweight, breathable, all-season comfort"
    ],
    materials: [
      "Main Material: High-density Webbing",
      "Lining: Honeycomb Mesh (Waterproof)",
      "Reflective Strip: 3M Reflective Material",
      "Hardware: Rust-resistant Metal Buckles"
    ],
    careInstructions: [
      "Hand wash with mild soap",
      "Air dry completely before storage",
      "Check buckles and straps regularly",
      "Store in dry place"
    ],
    sizes: [
      {
        name: "Moon Cloud White - S",
        measurements: { 
          chest: "40-54cm", 
          length: "Adjustable Harness", 
          neck: "Available Colors" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Moon Cloud White - M",
        measurements: { 
          chest: "46-64cm", 
          length: "Adjustable Harness", 
          neck: "Available Colors" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Moon Cloud White - L",
        measurements: { 
          chest: "52-80cm", 
          length: "Adjustable Harness", 
          neck: "Available Colors" 
        },
        inStock: true,
        stockQuantity: 2
      },
      {
        name: "Orange Forest - M",
        measurements: { 
          chest: "46-64cm", 
          length: "Adjustable Harness", 
          neck: "Available Colors" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Orange Forest - L",
        measurements: { 
          chest: "52-80cm", 
          length: "Adjustable Harness", 
          neck: "Available Colors" 
        },
        inStock: true,
        stockQuantity: 2
      },
      {
        name: "Sea Salt Lemon - L",
        measurements: { 
          chest: "52-80cm", 
          length: "Adjustable Harness", 
          neck: "Available Colors" 
        },
        inStock: true,
        stockQuantity: 1
      }
    ],
    isNew: true,
    isBestseller: true
  }
];

// Handmade Cozy Knits Collection
export const handmadeKnitsProducts: ProductData[] = [
  {
    id: "knits-poncho-merino-wool-hoodie",
    slug: "knits-poncho-merino-wool-hoodie",
    name: "Poncho Merino Wool Hoodie",
    price: 39.99,
    category: "Handmade Cozy Knits",
    description: "A luxurious poncho-style hoodie crafted from 100% premium Merino wool. Naturally soft, breathable and gentle on the skin, this cozy piece offers lightweight warmth without feeling heavy or restrictive. Features a signature hood with charming pom-pom detail and comes in beautiful nature-inspired colours.",
    images: [
      {
        url: "/images/products/knits-poncho-merino-wool-hoodie/main.jpg",
        alt: "Poncho Merino Wool Hoodie - Main View",
        type: "main"
      },
      {
        url: "/images/products/knits-poncho-merino-wool-hoodie/view2.jpg",
        alt: "Poncho Merino Wool Hoodie - Color Options",
        type: "view"
      },
      {
        url: "/images/products/knits-poncho-merino-wool-hoodie/view3.jpg",
        alt: "Poncho Merino Wool Hoodie - Detail View",
        type: "view"
      },
      {
        url: "/images/products/knits-poncho-merino-wool-hoodie/view4.jpg",
        alt: "Poncho Merino Wool Hoodie - Lifestyle Shot",
        type: "view"
      },
      {
        url: "/images/products/knits-poncho-merino-wool-hoodie/view5.jpg",
        alt: "Poncho Merino Wool Hoodie - Size Chart",
        type: "detail"
      }
    ],
    features: [
      "100% Premium Merino Wool - Naturally soft, breathable and gentle on the skin",
      "Lightweight warmth that keeps your pet cosy without feeling heavy or restrictive",
      "Signature Hood with Pom-Pom Detail - A charming hood finished with a soft pom-pom",
      "Easy Slip-On Fit - Designed for comfort and movement",
      "Effortless to wear, flexible enough for everyday lounging or winter walks",
      "Soft, Nature-Inspired Colours - A calm palette drawn from autumn fields and winter skies"
    ],
    materials: [
      "Outer: 100% Premium Merino Wool",
      "Hood: Merino Wool with Pom-Pom Detail",
      "Trim: Natural Wool Ribbing",
      "Hardware: None"
    ],
    careInstructions: [
      "Hand wash in cold water with wool detergent",
      "Gently squeeze out excess water - do not wring",
      "Lay flat to dry away from direct heat",
      "Store folded to maintain shape",
      "Professional wool cleaning recommended"
    ],
    sizes: [
      {
        name: "Honey (Bee Yellow) - S",
        measurements: { 
          chest: "35cm", 
          length: "25cm", 
          neck: "23cm" 
        },
        inStock: false,
        stockQuantity: 0
      },
      {
        name: "Honey (Bee Yellow) - M",
        measurements: { 
          chest: "41cm", 
          length: "28cm", 
          neck: "26cm" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Rose (Rosy Pink) - M",
        measurements: { 
          chest: "41cm", 
          length: "28cm", 
          neck: "26cm" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Olive (Moss Green) - S",
        measurements: { 
          chest: "35cm", 
          length: "25cm", 
          neck: "23cm" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Olive (Moss Green) - M",
        measurements: { 
          chest: "41cm", 
          length: "28cm", 
          neck: "26cm" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Cloud (Sky Blue) - M",
        measurements: { 
          chest: "41cm", 
          length: "28cm", 
          neck: "26cm" 
        },
        inStock: true,
        stockQuantity: 1
      }
    ],
    isNew: true,
    isBestseller: false
  },
  {
    id: "knits-christmas-knitwear",
    slug: "knits-christmas-knitwear",
    name: "Christmas Knitwear",
    price: 34.99,
    category: "Handmade Cozy Knits",
    description: "🎄 Hand-Knitted Christmas Pet Jumper. Celebrate the season with a cozy touch of handmade charm. This festive pet jumper is carefully hand-knitted with adorable Christmas motifs — a playful reindeer and a cheerful snowman — bringing instant holiday warmth to your pet's winter wardrobe. Soft, snug, and full of character, each piece carries the subtle uniqueness of handcraft, making it feel extra special and full of heart.",
    images: [
      {
        url: "/images/products/knits-christmas-knitwear/main.jpg",
        alt: "Christmas Knitwear - Main View",
        type: "main"
      },
      {
        url: "/images/products/knits-christmas-knitwear/view1.jpg",
        alt: "Christmas Knitwear - Snowman Design",
        type: "view"
      },
      {
        url: "/images/products/knits-christmas-knitwear/view2.jpg",
        alt: "Christmas Knitwear - Reindeer Design",
        type: "view"
      },
      {
        url: "/images/products/knits-christmas-knitwear/view3.jpg",
        alt: "Christmas Knitwear - Detail View",
        type: "view"
      }
    ],
    features: [
      "🎄 Hand-knitted with Christmas motifs",
      "Adorable reindeer and snowman designs",
      "Soft, snug, and full of character",
      "Subtle uniqueness of handcraft",
      "Perfect for Christmas photos & cozy nights",
      "Ideal for holiday gatherings",
      "Made for pets who deserve something truly handmade"
    ],
    materials: [
      "Outer: 100% Hand-Knitted Wool",
      "Design: Christmas Motifs (Reindeer & Snowman)",
      "Finish: Handcrafted Details",
      "Hardware: None"
    ],
    careInstructions: [
      "Hand wash in cold water with wool detergent",
      "Gently squeeze out excess water - do not wring",
      "Lay flat to dry away from direct heat",
      "Store folded to maintain shape",
      "Handle with care to preserve handcraft details"
    ],
    sizes: [
      {
        name: "Snowman - S",
        measurements: { 
          chest: "35cm", 
          length: "25cm", 
          neck: "23cm" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Reindeer - S",
        measurements: { 
          chest: "35cm", 
          length: "25cm", 
          neck: "23cm" 
        },
        inStock: true,
        stockQuantity: 1
      },
      {
        name: "Reindeer - M",
        measurements: { 
          chest: "41cm", 
          length: "28cm", 
          neck: "26cm" 
        },
        inStock: true,
        stockQuantity: 1
      }
    ],
    isNew: true,
    isBestseller: false
  }
];

// Combined product collections
export const allProducts: ProductData[] = [...holidayProducts, ...hauteCoutureProducts, ...signatureProducts, ...ootdProducts, ...accessoriesProducts, ...handmadeKnitsProducts];

// Helper function to get main product image
export const getMainProductImage = (product: ProductData): string => {
  const mainImage = product.images.find(img => img.type === 'main');
  return mainImage?.url || product.images[0]?.url || '/images/placeholder-product.jpg';
};

// Helper function to get all product images for gallery
export const getProductGallery = (product: ProductData): ProductImage[] => {
  return product.images;
};

// Helper function to get product by slug
export const getProductBySlug = (slug: string): ProductData | undefined => {
  return allProducts.find(product => product.slug === slug);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): ProductData[] => {
  return allProducts.filter(product => product.category === category);
};