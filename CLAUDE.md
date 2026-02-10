# Lyric Visualizer

A React/TypeScript application that visualizes Billboard song lyrics data using D3.js.

## Tech Stack

- **Frontend**: React 18, TypeScript, D3.js, Sass
- **Backend**: Express with TypeScript
- **Database**: PostgreSQL
- **Build**: Webpack, Babel

## Development Commands

```bash
npm run start:dev      # Webpack dev server with HMR (port 3030)
npm run server:dev     # Express backend (port 8080)
npm run compile:sass   # Sass watch mode
npm run typecheck      # TypeScript type checking
npm run build:dev      # Webpack watch mode (no HMR)
```

## Project Structure

- `src/components/` - React components (Billboard, D3Chart, CircleBarChart, etc.)
- `src/context/` - React context for app state
- `src/hooks/` - Custom hooks (useD3, useDimension)
- `src/sass/` - Sass stylesheets
- `server/` - Express backend with PostgreSQL

## Verification Workflow

When making frontend changes, follow this process:

1. **After editing components**: Typecheck runs automatically via hook
2. **To visually verify**: Use Chrome integration to inspect localhost:3030
3. **For styling changes**: Check the component renders correctly in the browser

### Visual Verification Steps

When asked to verify UI changes:

1. Ensure dev servers are running (`npm run server:dev` + `npm run start:dev`)
2. Open http://localhost:3030 in Chrome
3. Navigate to the relevant component/section
4. Take a screenshot if needed for comparison
5. Check browser console for errors

## Code Style

- TypeScript strict mode
- ESLint + Prettier configured
- Component files use `.tsx` extension
- Prefer functional components with hooks
