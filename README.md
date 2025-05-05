Demo: https://playpod-frontend.vercel.app/

# PLayPod

A modern web application for rhythm-based music interaction and play.

## Project Description

PlayPod is a dynamic web application that combines music and interactive elements to create an engaging rhythm-based experience. Built with React and TypeScript, it provides a responsive interface for music exploration and interaction.

## Installation and Setup

```bash
# Clone the repository
git clone [repository-url]
cd rhythm-verse-play

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at http://localhost:8080

## API Endpoints

The frontend currently connects to the following backend endpoints:

- `/api/*` - Core application API routes
- `/media/*` - Media file access
- `/static/*` - Static asset access

All API requests are proxied to a Django backend running at http://127.0.0.1:8000.

## Design and Development Process

The development process focused on creating a modular, component-based architecture using React and TypeScript. The UI was designed using Tailwind CSS to ensure responsive design and consistent styling.

The project follows a structured approach with clear separation between:
- Components (reusable UI elements)
- Pages (route-specific views)
- Hooks (shared functionality)
- Contexts (application state)
- Layouts (page structure)

## Unique Approaches

- **Component Tagging**: Used the "lovable-tagger" in development mode to improve component identification and debugging
- **Internationalization**: Implemented through dedicated i18n directory for multi-language support
- **Custom Animation System**: Developed with Tailwind's animation utilities for smooth UI transitions

## Development Tradeoffs

- **Performance vs. Developer Experience**: Chose to use SWC compiler with Vite for faster development experience, balancing build speed with bundle size
- **API Proxying**: Implemented a development proxy to connect with the Django backend, simplifying API calls at the cost of some configuration complexity
- **Styling Approach**: Selected Tailwind CSS for rapid UI development, accepting the tradeoff of more verbose HTML markup for faster styling iterations

## Known Issues

- Some API endpoints may return 404 errors during development if the corresponding Django backend routes are not properly configured
- Media loading may experience delays when first accessing content through the proxy

## Technology Stack Choice

- **React + TypeScript**: Provides type safety and better developer experience through static type checking
- **Vite**: Offers significantly faster development server and build times compared to alternatives
- **Tailwind CSS**: Enables rapid UI development with utility-first approach
- **Django Backend**: Chosen for its robust ORM, admin interface, and security features

## Development Challenges

The development process presented some challenges due to my limited familiarity with the specific language and framework combination. Despite these obstacles, I put forth my best effort to implement a clean, maintainable codebase that follows best practices. Learning TypeScript's type system alongside React's component patterns required additional time investment but ultimately resulted in more robust code.
