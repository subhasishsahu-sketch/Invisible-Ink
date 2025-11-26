# Invisible Ink - Design Guidelines

## Design Approach

**Selected Approach:** Hybrid - Drawing inspiration from modern creative tools (Linear, Notion) combined with security-focused applications (1Password, Signal). The interface should feel both professional and slightly mysterious, reflecting the covert nature of steganography while maintaining excellent usability.

**Core Principle:** Balance technical precision with visual intrigue. This is a utility tool that deals with hidden information - the design should hint at secrets without being cryptic.

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, and 12 for consistent rhythm (p-2, p-4, m-6, h-8, gap-12, etc.)

**Page Structure:**
- Two-column layout for encode/decode sections on desktop (lg:grid-cols-2), stack on mobile
- Maximum width container: max-w-7xl with horizontal padding
- Consistent section spacing: py-12 on mobile, py-16 on desktop

## Typography Hierarchy

**Font Stack:**
- Primary: Inter or DM Sans for clean, modern readability
- Monospace: JetBrains Mono for Morse code display and technical outputs

**Hierarchy:**
- H1 (Hero/Page Title): 3xl/4xl, semibold, tight leading
- H2 (Section Headers): 2xl/3xl, semibold 
- H3 (Card Titles): xl, medium
- Body: base, regular
- Technical Output (Morse/Binary): sm, monospace
- Labels: sm, medium, uppercase tracking-wide

## Core Components

### Hero Section
- Height: 60vh minimum, not full viewport
- Centered content with tagline and brief explanation
- Large encoded image preview in background (subtle, partially transparent)
- Primary CTA: "Start Encoding" button with background blur
- Secondary info: "How it works" expandable section below hero

### Encode Section
**Image Upload Zone:**
- Large drop area with dashed border (min-h-64)
- Icon: upload cloud with arrow
- States: default, hover (border highlight), dragging (background change), error
- Alternative: "Fetch Random Image" button with Unsplash attribution

**Message Input:**
- Textarea with character counter
- Real-time Morse code preview below input (monospace, letter-spacing for dots/dashes)
- Visual: animated dots and dashes appearing as user types

**Encoding Process Visualization:**
- Three-step indicator: Text → Morse → Binary → Image
- Progress bar during encoding
- Success state shows preview with download button

### Decode Section
**Upload Zone:**
- Similar design to encode but with different copy
- File validation messaging
- Preview of uploaded image

**Decoding Output:**
- Sequential reveal: Binary → Morse → Text
- Animated transition between stages (subtle)
- Final message displayed in card with copy button

### Result Cards
- Rounded corners with subtle shadow
- Image preview with aspect ratio maintained
- Download button (primary) and "Encode Another" (secondary)
- Metadata display: file size, dimensions, encoding timestamp

## Navigation
- Fixed header with logo/title on left
- Navigation links: Home, How It Works, About
- Toggle between Encode/Decode modes (tab-style switching)
- Compact, height: h-16

## Interactive Elements

**Buttons:**
- Primary: Large (h-12), rounded, medium font weight
- Secondary: Outlined variant
- Icon buttons: Square (h-10 w-10) for copy/download actions
- All buttons on images: backdrop-blur-md background

**Form Inputs:**
- Textarea: Rounded, border, focus ring, padding p-4
- File upload: Dashed border, padding p-8, cursor-pointer on hover
- Character limit indicator: positioned top-right of textarea

**Cards:**
- Rounded-lg, border, padding p-6
- Hover: subtle shadow increase (no color change)

## Unique Visual Elements

**Morse Code Display:**
- Dots (•) and dashes (–) with increased letter spacing
- Monospace font, slightly larger than body text
- Grouping by letter with subtle separators

**Binary Visualization:**
- Grid pattern showing sample of binary data
- Truncated with "..." for long sequences
- Scrollable container with fixed height

**Process Indicators:**
- Horizontal stepper with connecting lines
- Icons for each stage (text, morse code symbol, binary, image)
- Active step highlighted, completed steps with checkmark

## Page Sections

1. **Hero** (60vh): Headline, value proposition, CTA, background encoded image
2. **Main Tool** (natural height): Side-by-side encode/decode with tab switching on mobile
3. **How It Works** (py-16): Three-column grid explaining steganography process with icons
4. **Use Cases** (py-16): Grid of example scenarios (journalism, personal privacy, creative projects)
5. **Footer** (py-12): Credits, Unsplash attribution, GitHub link, privacy note

## Images

**Hero Background:** 
- Abstract technical image (circuit board, data visualization, or encrypted pattern)
- Slightly blurred, 30% opacity
- Position: cover, centered

**How It Works Section:**
- Three illustrative icons (custom or from Heroicons)
- Lock icon, image icon, morse code symbol

**Example Images:**
- Placeholder encoded images in Use Cases section
- Grid layout (2-3 columns) with captions

## Accessibility & Polish

- All interactive elements with proper focus states (ring-2 ring-offset-2)
- ARIA labels for file uploads and icon buttons
- Loading states with spinners for API calls
- Error messages in dedicated containers with error icons
- Success/info toast notifications for user actions
- Drag-and-drop with keyboard alternative (file input fallback)
- Mobile-responsive grid collapses (grid to stack)