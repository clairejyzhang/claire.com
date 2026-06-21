// Static build: renders every route to an HTML file in dist/ and copies public/.
// Exported so the dev server can reuse the exact same output it ships in prod.
const fs = require('fs');
const path = require('path');
const { ROOT, PUBLIC_DIR, renderSite } = require('./lib/site');

const DIST = path.join(ROOT, 'dist');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

function build({ hmr = false } = {}) {
  fs.rmSync(DIST, { recursive: true, force: true });
  fs.mkdirSync(DIST, { recursive: true });

  const routes = renderSite({ hmr });
  for (const [route, html] of Object.entries(routes)) {
    // "/" -> index.html, "/about" -> about/index.html for clean URLs.
    const outPath =
      route === '/'
        ? path.join(DIST, 'index.html')
        : path.join(DIST, route, 'index.html');
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html);
  }

  copyDir(PUBLIC_DIR, DIST);
  return Object.keys(routes).length;
}

module.exports = { build, DIST };

if (require.main === module) {
  const n = build();
  console.log(`Built ${n} routes to dist/`);
}
