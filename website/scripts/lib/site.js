// Core site logic: reads markdown content from pages/ and posts/, renders to
// plain HTML strings. Shared by the build script (writes files to dist/) and the
// dev server (renders on the fly). Only third-party dependency: `marked`.

const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const ROOT = path.join(__dirname, '..', '..');
const PAGES_DIR = path.join(ROOT, 'pages');
const POSTS_DIR = path.join(ROOT, 'posts');
const PUBLIC_DIR = path.join(ROOT, 'public');

// --- minimal YAML frontmatter parser -------------------------------------
// Supports `key: value` pairs where value is a quoted/unquoted string, a
// number, or an inline array like [17, 18]. That covers everything our content
// needs without pulling in gray-matter.
function parseFrontmatter(raw) {
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(raw);
  if (!match) return { data: {}, content: raw };

  const data = {};
  for (const line of match[1].split('\n')) {
    if (!line.trim()) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
        .map((v) => (isNaN(Number(v)) ? unquote(v) : Number(v)));
    } else if (value !== '' && !isNaN(Number(value))) {
      value = Number(value);
    } else {
      value = unquote(value);
    }
    data[key] = value;
  }
  return { data, content: raw.slice(match[0].length) };
}

function unquote(v) {
  if (
    (v.startsWith("'") && v.endsWith("'")) ||
    (v.startsWith('"') && v.endsWith('"'))
  ) {
    return v.slice(1, -1);
  }
  return v;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// --- content loaders ------------------------------------------------------
function readMarkdown(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = parseFrontmatter(raw);
  return { data, content, html: marked.parse(content) };
}

function getAllPosts() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.replace(/\.md$/, '');
      const { data, html } = readMarkdown(path.join(POSTS_DIR, f));
      return { slug, ...data, html };
    });
}

// --- HTML layout ----------------------------------------------------------
function layout({ title, body, hmr }) {
  // Live reload, the way Vite does it (barebones): the server watches the files
  // and pushes a message here over a WebSocket; we just reload. WebSocket (not
  // SSE) so the connection doesn't count against the browser's per-origin HTTP
  // connection limit, which would otherwise hang the page after a few clicks.
  const hmrScript = hmr
    ? `<script>new WebSocket('ws://' + location.host + '/__reload').onmessage = () => location.reload();</script>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    ${body}
    ${hmrScript}
  </body>
</html>`;
}

// --- page renderers -------------------------------------------------------
// Author's birthday: June 2003. Each post shows its date and the author's age
// at the time. Writing posts have a full `date` (month shown); projects have
// only a `year` (year shown).
const BIRTH_YEAR = 2003;
const BIRTH_MONTH = 6;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];

// Parses a post's `time` field, which is either "Month YYYY" (e.g. "June 2025")
// or just "YYYY". Returns { year, month? } with month as 1-12.
function parseTime(time) {
  const s = String(time == null ? '' : time).trim();
  let m = /^([A-Za-z]+)\s+(\d{4})$/.exec(s);
  if (m) {
    const month = MONTHS.findIndex((n) => n.toLowerCase() === m[1].toLowerCase()) + 1;
    return { year: Number(m[2]), month: month || undefined };
  }
  m = /^(\d{4})$/.exec(s);
  if (m) return { year: Number(m[1]) };
  return {};
}

// A sortable number for a post's time, e.g. June 2025 -> 202506, 2024 -> 202400.
function timeRank(p) {
  const { year, month } = parseTime(p.time);
  return (year || 0) * 100 + (month || 0);
}

function postDateline(p) {
  const { year, month } = parseTime(p.time);
  if (!year) return '';
  const when = month ? `${MONTHS[month - 1]} ${year}` : `${year}`;
  const age = year - BIRTH_YEAR - (month && month < BIRTH_MONTH ? 1 : 0);
  return `${when}, age ${age}`;
}

function renderPostList(posts) {
  // Grouped into a list per year, newest first (sorted by `time`).
  const byYear = new Map();
  for (const p of posts.slice().sort((a, b) => timeRank(b) - timeRank(a))) {
    const y = parseTime(p.time).year || 0;
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y).push(p);
  }

  return [...byYear.entries()]
    .map(([y, ps]) => {
      const items = ps
        .map((p) => `<li><a href="/posts/${p.slug}">${escapeHtml(p.title)}</a></li>`)
        .join('\n');
      return `<p class="year">${y}</p>\n<ul>\n${items}\n</ul>`;
    })
    .join('\n');
}

// Returns a map of URL path -> rendered HTML string for every route.
function renderSite({ hmr = false } = {}) {
  const posts = getAllPosts();
  const routes = {};

  // Homepage: pages/index.md content, then the auto-generated post/project list.
  // A `{{posts}}` placeholder controls where the list goes; otherwise appended.
  // We inject the list into the markdown *before* parsing so marked treats it as
  // a raw block (it would otherwise wrap a bare placeholder paragraph in <p>).
  const indexRaw = fs.readFileSync(path.join(PAGES_DIR, 'index.md'), 'utf8');
  const { data: indexData, content: indexContent } = parseFrontmatter(indexRaw);
  const list = renderPostList(posts);
  const indexMd = indexContent.includes('{{posts}}')
    ? indexContent.replace('{{posts}}', list)
    : indexContent + '\n\n' + list;
  routes['/'] = layout({
    title: indexData.title || 'Claire Zhang',
    body: marked.parse(indexMd),
    hmr,
  });

  // Other pages in pages/ (e.g. about.md -> /about).
  for (const f of fs.readdirSync(PAGES_DIR)) {
    if (!f.endsWith('.md') || f === 'index.md') continue;
    const slug = f.replace(/\.md$/, '');
    const { data, html } = readMarkdown(path.join(PAGES_DIR, f));
    routes[`/${slug}`] = layout({
      title: data.title || slug,
      body: html,
      hmr,
    });
  }

  // Posts -> /posts/<slug>.
  for (const p of posts) {
    const dateline = postDateline(p);
    routes[`/posts/${p.slug}`] = layout({
      title: p.title || p.slug,
      body:
        `<div class="post-nav">` +
        `<img class="post-nav-logo" src="/images/nailong.png" alt="" />` +
        `<a class="back" href="/">← home</a>` +
        `</div>\n<article class="post-${p.slug}">\n` +
        `<h1>${escapeHtml(p.title || p.slug)}</h1>\n` +
        (dateline ? `<p class="post-meta">${dateline}</p>\n` : '') +
        `${p.html}</article>`,
      hmr,
    });
  }

  return routes;
}

module.exports = {
  ROOT,
  PAGES_DIR,
  POSTS_DIR,
  PUBLIC_DIR,
  renderSite,
  getAllPosts,
};
