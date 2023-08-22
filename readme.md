# Electron Template

An electron template for vite+typescript+react+tailwind. Also configured for github releases, check `./.github/workflows/release.yml` and `./release.js` and "postMake" hook in `./forge.config.ts` for more insight. 
> NOTE:  You can import native node modules directly into renderer, use context bridge like in preload.ts.

> NOTE: Because of something (unknown to me), every dependency is included un-bundled, so I recommend adding most of deps to dev-deps for now. **Build and run app to make sure its working fine**.