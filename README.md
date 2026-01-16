# cvsmith

Renders a CV from JSON, (eventually) into various different formats including HTML, PDF, and machine-readable ATS formats. This powers https://www.chrissarbora.com/.

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

## Personalizing

This project pulls in a submodule, [cv](https://github.com/tophyr/cv), which is intended to contain your actual professional history. Fork that repo, fill in your own data, and then put its `cv.json` and `profile.jpg` insde `public/data/` here then run the build. Voila! You have your own web CV.

## Improving

Pull requests are **extremely** welcome. I built this as basically a "stay busy"/"show off kiiinda" project once I started looking for a new position. It's not fancy, it's not particularly stylish, and it's certainly not finished. If this project turns out to be valuable in your own job search then that will absolutely be reward enough for me, but if you get the bug to improve it then please do consider yourself welcome to.

Some ideas I have for areas of improvement:
* PDF generation in Javascript rather than in the browser's "print" flow (ie, give the project better control over the generated PDF)
* Selectable/Hidable Position, Showcase and Keywords entries
* Better and/or configurable CSS/styling