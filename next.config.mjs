/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `npm run build:single` sets this to emit a static `out/` directory, which
  // scripts/bundle-single-file.mjs then flattens into one portable HTML file.
  // The normal server build is unaffected.
  // (npm_lifecycle_event keeps this working on Windows, where an inline
  // `BBB_EXPORT=1 next build` prefix is not valid shell syntax.)
  ...(process.env.BBB_EXPORT === "1" ||
  process.env.npm_lifecycle_event === "build:single"
    ? { output: "export", images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
