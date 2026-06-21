# claire.com

A barebones, server-side-generated personal site. The only runtime dependency is
[`marked`](https://github.com/markedjs/marked) for markdown parsing; the dev
server and static build are plain Node.js scripts.

## Structure

```
pages/            Standalone pages (markdown)
  index.md        -> /          (the single homepage; {{posts}} injects the list)
posts/            Posts (markdown), each -> /posts/<filename>
public/           Static assets, copied to the site root (e.g. /images/, styles.css)
scripts/
  lib/site.js     Shared rendering logic (frontmatter + markdown -> HTML)
  build.js        Static build -> dist/
  dev.js          Dev server with live reload (HMR)
dist/             Build output (gitignored)
```

## Editing content

All content lives in markdown files with YAML frontmatter.

- The homepage is `pages/index.md`. The `{{posts}}` placeholder is replaced with the
  posts, grouped by year (newest first).
- Add a post: drop `posts/my-post.md`, served at `/posts/my-post`. Give it a `title`
  and a `time` — either `Month YYYY` (e.g. `June 2025`) or just `YYYY`. Posts sort by
  `time`, and each post page shows the time plus the author's age, e.g. "June 2025,
  age 22".
- Styles live in `public/styles.css`.

## Commands

```
npm install
npm run dev      # http://localhost:3001 with live reload
npm run build    # render everything to dist/
```

The `dist/` folder is a plain static site (clean URLs via `<route>/index.html`)
deployable to any static host.
