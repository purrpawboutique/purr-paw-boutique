# Purr & Paw Boutique Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from premium lifestyle e-commerce (Anthropologie's warmth, Goop's elegance, boutique pet brands like Wild One). The design emphasizes emotional connection, product storytelling, and curated shopping experience.

## Core Design Principles
- **Warmth & Intimacy**: Soft edges, generous spacing, inviting compositions
- **Premium Quality**: Elevated but approachable, never cold or clinical
- **Pet-Centric Love**: Celebrate the joy of pet ownership through visual storytelling

## Typography System
- **Primary Font**: Playfair Display (serif) for headings - elegant, warm, premium feel
- **Secondary Font**: Inter or Source Sans Pro for body text - clean, readable
- **Hierarchy**:
  - Hero headlines: text-5xl to text-7xl, font-medium
  - Section titles: text-3xl to text-4xl
  - Product names: text-xl to text-2xl, font-medium
  - Body text: text-base to text-lg, leading-relaxed
  - Captions/labels: text-sm, uppercase tracking-wide for sophistication

## Layout & Spacing System
**Tailwind Units**: Primarily use 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 md:py-24 lg:py-32
- Card spacing: p-6 to p-8
- Grid gaps: gap-6 to gap-8
- Container max-width: max-w-7xl with generous px-6 lg:px-8

## Component Library

### Navigation
- Sticky header with logo centered or left-aligned
- Clean menu items with subtle hover states
- Shopping cart icon with item count badge
- Mobile: Elegant slide-in menu with smooth transitions

### Hero Section
**Large hero image required**: Full-width lifestyle shot of happy pets wearing boutique clothing in cozy home setting
- Height: min-h-[600px] lg:min-h-[700px]
- Overlay: Subtle gradient overlay for text readability
- Content: Logo integration, welcoming headline ("Dress Your Best Friend in Love"), primary CTA with blurred background button
- Positioning: Content centered or left-aligned with breathing room

### Product Cards
- Clean white/cream cards with subtle shadow (shadow-sm hover:shadow-lg transition)
- Product image with 4:3 or 1:1 aspect ratio
- Product name, brief description, price prominently displayed
- Rounded corners (rounded-lg) for softness
- Add to cart button integrated seamlessly
- Hover: Gentle lift effect, reveal secondary image if available

### Product Grid
- 2 columns mobile (grid-cols-2), 3 tablet (md:grid-cols-3), 4 desktop (lg:grid-cols-4)
- Generous gap-6 to gap-8
- Filter/sort options above grid in clean, minimal design

### Product Detail Pages
- Large image gallery: Primary image with thumbnail row below
- Product info panel: Name, price, size selector (buttons), quantity, add to cart
- Accordion sections: Description, sizing guide, care instructions, shipping
- Related products carousel at bottom

### Shopping Cart
- Slide-out drawer from right side
- Item list with thumbnail, name, size, quantity controls, remove option
- Sticky total and checkout button at bottom
- Empty state with cute pet illustration and shop CTA

### Footer
- Multi-column layout (4 columns desktop, stack mobile)
- Sections: Shop, About, Customer Care, Connect
- Newsletter signup with elegant input field
- Social icons
- Logo placement
- Trust indicators (secure payment, return policy icons)

### Additional Sections
- "Our Story" with warm imagery and narrative text
- Customer testimonials with pet photos
- Instagram feed integration
- Sizing guide with helpful illustrations

## Images Strategy
**Hero**: Required - Lifestyle photography of pets in boutique clothing, warm indoor settings
**Product Images**: Clean, white or soft neutral backgrounds, consistent lighting
**About/Story**: Candid, warm photos showing brand personality and craftsmanship
**Testimonials**: Customer pet photos wearing products in natural settings
**Overall style**: Warm lighting, soft focus backgrounds, authentic moments

## Interaction Patterns
- Smooth page transitions (minimal, refined)
- Add to cart: Subtle animation with success feedback
- Product hover: Gentle scale or secondary image reveal
- Filter application: Fade transitions, no harsh jumps
- Scroll animations: Minimal - only fade-in for key sections
- Button states: Clear hover/active without distracting effects (except hero buttons with blurred backgrounds)

## Form Design
- Generous padding in input fields (p-4)
- Rounded corners (rounded-lg)
- Soft border colors with elegant focus states
- Labels above inputs, clear placeholder text
- Error states: Gentle red accent, helpful messaging

## Responsive Behavior
- Mobile-first approach
- Product grid: 2→3→4 columns progression
- Navigation: Hamburger menu for mobile with elegant drawer
- Hero: Adjust text sizing and positioning for smaller screens
- Touch-friendly: All interactive elements minimum 44px tap target

This design creates an intimate, premium shopping experience that makes customers feel they're choosing something special for their beloved pets.