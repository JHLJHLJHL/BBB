/**
 * Flattens the static export in `out/` into one self-contained HTML file.
 *
 * Every stylesheet and script that the exported page pulls from `/_next/...`
 * is read off disk and inlined, so the result opens straight from the file
 * system with no server and no sibling assets. Run it through
 * `npm run build:single`, which sets BBB_EXPORT=1 for `next build` first.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out");
const source = join(outDir, "index.html");
const target = join(root, "dist", "BBB.html");

if (!existsSync(source)) {
  console.error(
    "out/index.html not found — run `npm run build:single`, which sets BBB_EXPORT=1.",
  );
  process.exit(1);
}

/** Resolves a site-absolute asset path to its file in out/. */
const assetPath = (href) => join(outDir, href.split("?")[0].replace(/^\//, ""));

/** `</script>` inside a JS string literal would close the tag we inline into. */
const escapeForScript = (code) =>
  code.replace(/<\/script/gi, "<\\/script").replace(/<!--/g, "<\\!--");

let html = readFileSync(source, "utf8");
const inlined = { css: 0, js: 0, skipped: [] };

// 1. Stylesheets.
html = html.replace(
  /<link[^>]*rel="stylesheet"[^>]*href="(\/_next\/[^"]+)"[^>]*>/gi,
  (tag, href) => {
    const file = assetPath(href);
    if (!existsSync(file)) {
      inlined.skipped.push(href);
      return tag;
    }
    inlined.css++;
    return `<style>${readFileSync(file, "utf8")}</style>`;
  },
);

// 2. Scripts with a src. Order is preserved because each tag is replaced in
//    place; async/defer are dropped so the inline copies still run in order.
html = html.replace(
  /<script([^>]*?)src="(\/_next\/[^"]+)"([^>]*)><\/script>/gi,
  (tag, before, src) => {
    const file = assetPath(src);
    if (!existsSync(file)) {
      inlined.skipped.push(src);
      return tag;
    }
    inlined.js++;
    const type = /type="module"/.test(before) ? ' type="module"' : "";
    return `<script${type}>${escapeForScript(readFileSync(file, "utf8"))}</script>`;
  },
);

// 3. Preload hints point at files that no longer exist beside the page.
html = html.replace(
  /<link[^>]*rel="(?:preload|prefetch|modulepreload)"[^>]*href="\/_next\/[^"]*"[^>]*>/gi,
  "",
);

// 4. The favicon becomes a data URI so the tab icon survives too. Next emits
//    it as a site-absolute /icon.svg, which resolves nowhere once the page is
//    a loose file, so every reference to it is rewritten rather than removed.
const iconFile = join(root, "app", "icon.svg");
if (existsSync(iconFile)) {
  const dataUri = `data:image/svg+xml;base64,${readFileSync(iconFile).toString("base64")}`;
  html = html.replace(/href="\/icon\.svg[^"]*"/gi, `href="${dataUri}"`);
  html = html.replace(/\\?"\/icon\.svg[^"\\]*\\?"/g, `\\"${dataUri}\\"`);
  if (!/rel="icon"/i.test(html)) {
    html = html.replace(
      /<\/head>/i,
      `<link rel="icon" href="${dataUri}"/></head>`,
    );
  }
}

// 5. The App Router's inline RSC payload still names the stylesheet it thinks
//    it has to load. The CSS is already in a <style> tag above, so point those
//    references at an empty data URI — otherwise React injects a <link> that
//    cannot resolve from the file system.
html = html.replace(
  /\\?"\/_next\/static\/css\/[^"\\]+\.css\\?"/g,
  '\\"data:text/css,\\"',
);

// 6. Anything still reaching for /_next means the page is not self-contained.
const leftovers = [...html.matchAll(/["'(](\/_next\/[^"')]+)/g)].map((m) => m[1]);

mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, html, "utf8");

const kb = (statSync(target).size / 1024).toFixed(0);
console.log(
  `dist/BBB.html written — ${kb} KB, ${inlined.css} stylesheet(s), ${inlined.js} script(s) inlined`,
);
if (inlined.skipped.length) {
  console.warn("missing assets:", [...new Set(inlined.skipped)].join(", "));
}
if (leftovers.length) {
  console.warn(
    `still references /_next (${leftovers.length}):`,
    [...new Set(leftovers)].slice(0, 8).join(", "),
  );
} else {
  console.log("no remaining /_next references — file is self-contained");
}
