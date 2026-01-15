# cvsmith

Renders a CV from JSON, (eventually) into various different formats including HTML, PDF, and machine-readable ATS formats.

## Setup, Build, and Deployment

This project is a Vite + React application written in TypeScript. The compiled production output is a static site generated into the `dist/` directory.

### Setup
Ensure you have a recent Node.js version installed (Node 18+ recommended). From the project root, install dependencies:

```sh
npm install
```

### Running/Deployment

To run the development server with hot reloading:

```sh
npm run dev
```

To produce a production-ready build:

```sh
npm run build
```

This runs the TypeScript compiler for type checking and then invokes Vite to generate optimized static assets in `dist/`. This directory is now a fully self-contained _and static_ site, suitable for simple HTTP fileserving. Deploy the contents of the `dist/` directory to any static hosting provider (e.g. Nginx, Apache, GitHub Pages, Cloudflare Pages, Netlify, or S3).