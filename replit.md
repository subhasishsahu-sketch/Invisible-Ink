# Invisible Ink - Steganography Web Application

## Overview

Invisible Ink is a web-based steganography tool that allows users to hide secret messages inside images using LSB (Least Significant Bit) steganography combined with Morse code encoding. The application provides both encoding (hiding messages) and decoding (extracting messages) capabilities through an intuitive, modern interface. Messages are converted to Morse code, then to binary, and embedded into the least significant bits of image pixels, making the changes imperceptible to the human eye.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture with component-based design

**UI Component Library**
- shadcn/ui components built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design system
- Design follows "new-york" style variant with neutral color scheme
- Custom spacing primitives (2, 4, 6, 8, 12) for consistent rhythm
- Responsive design with mobile-first approach (breakpoints at 768px)

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- Local component state using React hooks
- Form handling via react-hook-form with zod validation

**Design System**
- Typography: DM Sans/Inter for UI, JetBrains Mono/Fira Code for monospace displays
- Color system: HSL-based with CSS custom properties for dark/light mode support
- Component variants using class-variance-authority for consistent styling patterns
- Elevation system using subtle shadows and background overlays

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and middleware
- Node.js runtime with ES modules (type: "module")
- Separate entry points for development (index-dev.ts) and production (index-prod.ts)

**Development vs Production**
- Development: Vite dev server integrated as Express middleware for HMR
- Production: Static file serving from pre-built dist/public directory
- Build process: Client built with Vite, server bundled with esbuild

**API Design**
- RESTful API endpoints under `/api` prefix
- Multipart form-data handling via multer for image uploads
- File size limit: 10MB per upload
- Message length limit: 500 characters
- Endpoints:
  - `POST /api/encode`: Accept image + message, return encoded image with Morse preview
  - `POST /api/decode`: Accept encoded image, return extracted message and Morse code

**Image Processing**
- Jimp library for image manipulation and pixel-level access
- LSB steganography algorithm: embeds binary data in least significant bits of RGB channels
- Message format: Text → Morse code → Binary → LSB embedding
- Start/end markers (`<<INVISIBLE_INK_START>>` and `<<INVISIBLE_INK_END>>`) for message boundaries
- Base64 encoding for image data transfer between client and server

### Data Storage Solutions

**Current Implementation**
- In-memory storage (MemStorage class) for user data
- UUID-based user identification
- No persistent database currently in use for the main steganography functionality

**Database Configuration (Prepared but Not Active)**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless driver ready for integration
- Schema defined for users table with UUID primary keys
- Migration system ready via drizzle-kit
- Session storage configured with connect-pg-simple (PostgreSQL session store)

**Rationale for Current Approach**
- The steganography operations are stateless and don't require data persistence
- Images are processed in-memory and returned immediately
- User authentication system is prepared but not currently implemented in the main workflow
- Future enhancement could add user accounts for saving encoded images or sharing links

### Authentication and Authorization

**Prepared Infrastructure**
- User schema defined with username/password fields
- Zod validation schemas for user input
- Session management infrastructure in place (though not actively used)
- No active authentication flow in current implementation

**Current Security Model**
- Client-side only image processing reduces server-side attack surface
- File upload validation (type checking, size limits)
- Message length restrictions prevent resource exhaustion
- CORS and security headers handled by Express middleware

### External Dependencies

**Third-Party Services**
- Unsplash API: Used for fetching random placeholder images when users don't have their own
- Attribution required in footer per Unsplash API terms

**Key NPM Packages**
- Image Processing: `jimp` for pixel manipulation
- File Uploads: `multer` for multipart form handling
- UI Components: `@radix-ui/*` suite for accessible primitives
- Styling: `tailwindcss`, `class-variance-authority`, `clsx`
- Forms: `react-hook-form`, `@hookform/resolvers`, `zod`
- Database (prepared): `drizzle-orm`, `@neondatabase/serverless`
- Session (prepared): `connect-pg-simple`

**Development Tools**
- TypeScript for type safety across client and server
- Vite plugins: runtime error overlay, cartographer, dev banner (Replit-specific)
- PostCSS with Autoprefixer for CSS processing
- Path aliasing for clean imports (`@/`, `@shared/`, `@assets/`)

**Fonts**
- Google Fonts: DM Sans, Architects Daughter, Fira Code, Geist Mono
- Loaded via link tags in HTML for performance