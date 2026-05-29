---
name: Azevedo Martiniano Portal
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf1'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fa'
  on-surface: '#111c2c'
  on-surface-variant: '#44474e'
  inverse-surface: '#263142'
  inverse-on-surface: '#ebf1ff'
  outline: '#74777e'
  outline-variant: '#c4c6cf'
  surface-tint: '#4a5f81'
  primary: '#000d22'
  on-primary: '#ffffff'
  primary-container: '#0a2342'
  on-primary-container: '#768baf'
  inverse-primary: '#b2c7ef'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#0a0d0e'
  on-tertiary: '#ffffff'
  tertiary-container: '#202324'
  on-tertiary-container: '#888a8b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#b2c7ef'
  on-primary-fixed: '#021c3a'
  on-primary-fixed-variant: '#324768'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#f9f9ff'
  on-background: '#111c2c'
  surface-variant: '#d8e3fa'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is anchored in the principles of **Institutional Minimalism**. It is designed to evoke absolute trust, legal authority, and academic clarity for the Cartório Azevedo Martiniano member area. The aesthetic balances the heritage of the notary profession with the efficiency of a modern Educational Distance Learning (EAD) platform.

The style is **Corporate / Modern**, characterized by:
- **Generous Whitespace:** Utilizing negative space to reduce cognitive load during complex legal studies.
- **Precision:** Sharp alignments and consistent rhythmic spacing that mirror the meticulous nature of legal work.
- **Subtle Luxury:** Using gold accents sparingly to denote prestige without compromising the utility of the digital interface.

## Colors

The palette is derived from the core identity of the office, emphasizing stability and excellence.

- **Primary (Midnight Blue):** Used for navigation, headers, and primary actions. It represents the "Institutional" anchor of the brand.
- **Secondary (Noble Gold):** Used strictly for high-value accents, progress indicators in EAD modules, and "Success" states that require a touch of distinction.
- **Surface & Backgrounds:** A range of ultra-light grays (`#F8F9FA` to `#EDF2F7`) are used to create subtle containment without the harshness of pure black-on-white.
- **Typography:** Primary text resides in a deep charcoal rather than pure black to maintain a sophisticated, softer reading experience.

## Typography

This design system utilizes a dual-font strategy to balance character with utility.

- **Headlines (Manrope):** Chosen for its modern geometric construction with slightly condensed proportions, providing a refined, contemporary corporate feel. Use Bold weights for section titles and Semibold for subsections.
- **Body & Interface (Inter):** Leveraged for its exceptional legibility at small sizes and high x-height, essential for long-form educational content and legal documentation.
- **Readability:** Body text should maintain a maximum line length of 70 characters to ensure optimal scanning during study sessions.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Content is contained within a 1280px central track on desktop to ensure line lengths remain readable, while the background surfaces extend to the edge of the viewport.

- **The 8px Grid:** All margins, paddings, and component heights must be multiples of 8px to maintain mathematical harmony.
- **EAD Verticality:** The lesson structure follows a single-column flow for content, with a secondary "Sticky" sidebar for navigation and progress tracking.
- **Breakpoints:**
  - **Desktop (1024px+):** 12-column grid, 40px margins.
  - **Tablet (768px - 1023px):** 8-column grid, 24px margins.
  - **Mobile (Up to 767px):** 4-column grid, 16px margins.

## Elevation & Depth

To maintain a "Professional Minimalist" aesthetic, depth is communicated through **Tonal Layering** rather than heavy shadows.

- **Level 0 (Background):** The base canvas uses the softest gray (`#F8F9FA`).
- **Level 1 (Cards/Containers):** Pure white surfaces with a 1px solid border (`#E2E8F0`). No shadow is applied here to keep the UI "flat" and focused.
- **Level 2 (Dropdowns/Modals):** High-elevation elements use a soft, "Large" ambient shadow: `0 10px 25px -5px rgba(10, 35, 66, 0.05)`. Note the subtle blue tint in the shadow color to harmonize with the primary brand color.
- **Interactive States:** Hovering over a card should result in a 1px Gold (`#C5A059`) border rather than a shadow lift.

## Shapes

The shape language is **Conservative and Structured**. 

- **Standard Radius:** 4px (Soft) is the default for buttons, input fields, and small components. This provides a modern touch while remaining "serious."
- **Large Containers:** Cards and educational modules use 8px (`rounded-lg`) to differentiate them from smaller interactive elements.
- **Icons:** Use thin-stroke (2px) linear icons to match the lightness of the typography. Avoid filled or "bubbly" icon sets.

## Components

### Buttons
- **Primary:** Solid Midnight Blue background, white Inter Semibold text. 4px radius. High-contrast and authoritative.
- **Secondary:** Transparent background with 1px Gold border and Gold text. Used for "View Certificate" or "Download Syllabus."
- **Ghost:** Minimal padding, Midnight Blue text. Used for navigation within the lesson player.

### Input Fields
- **Default:** White background, 1px Gray-200 border. On focus, the border transitions to Midnight Blue with a 2px subtle outer glow of the same color (10% opacity).

### Cards (Educational Modules)
- White background, 1px border. 
- A 4px top-border in Gold is used to denote "Featured" or "In-Progress" courses.
- Internal padding is generous (minimum 24px).

### Progress Indicators
- Linear bars using a 4px height. 
- Background: Light Gray.
- Fill: Noble Gold. This creates a psychological link between "Achievement" and the office’s premium brand color.

### Lists & Navigation
- Vertical navigation in the member area uses 48px height items with 12px left-padding.
- Active states are indicated by a 3px vertical Gold line on the far left of the item.