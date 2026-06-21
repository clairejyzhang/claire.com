// Dev server, barebones version of how Vite works: watch the filesystem, and on
// any change push a "reload" to the browser over a WebSocket. Pages are rendered
// fresh from source on every request (no dist/, never stale), and every response
// is sent no-store so the browser can't cache an old version.
const fs = require('fs');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const { PAGES_DIR, POSTS_DIR, PUBLIC_DIR } = require('./lib/site');

// Re-required fresh on each request so edits to the rendering code take effect
// without restarting the server (Node caches required modules otherwise).
const sitePath = require.resolve('./lib/site');

const PORT = process.env.PORT || 3001;

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.m4a': 'audio/mp4',
};

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);

  const send = (status, type, body) => {
    res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
    res.end(body);
  };

  // Static asset straight from public/.
  const asset = path.join(PUBLIC_DIR, url);
  if (asset.startsWith(PUBLIC_DIR) && fs.existsSync(asset) && fs.statSync(asset).isFile()) {
    send(200, MIME[path.extname(asset)] || 'application/octet-stream', fs.readFileSync(asset));
    return;
  }

  // Otherwise render the route fresh from source (and from fresh code).
  let routes;
  try {
    delete require.cache[sitePath];
    routes = require(sitePath).renderSite({ hmr: true });
  } catch (err) {
    send(500, 'text/html', `<pre>${err.stack}</pre>`);
    return;
  }
  const route = url !== '/' && url.endsWith('/') ? url.slice(0, -1) : url;
  send(routes[route] ? 200 : 404, 'text/html', routes[route] || '<h1>404</h1>');
});

// Reload channel over WebSocket. We only ever push to the browser, so we just
// complete the handshake and keep the raw socket — no need to parse frames.
const sockets = new Set();
server.on('upgrade', (req, socket) => {
  if (req.url !== '/__reload') return socket.destroy();
  const accept = crypto
    .createHash('sha1')
    .update(req.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    .digest('base64');
  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      `Sec-WebSocket-Accept: ${accept}\r\n\r\n`
  );
  sockets.add(socket);
  const drop = () => sockets.delete(socket);
  socket.on('close', drop);
  socket.on('error', drop);
});

// A WebSocket text frame for a short (<126 byte) payload.
const frame = (text) => {
  const data = Buffer.from(text);
  return Buffer.concat([Buffer.from([0x81, data.length]), data]);
};

// Watch source files; on a change, tell every open page to reload (debounced so
// an editor's multi-step save fires once).
let timer = null;
for (const dir of [PAGES_DIR, POSTS_DIR, PUBLIC_DIR, __dirname]) {
  fs.watch(dir, { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const msg = frame('reload');
      for (const socket of sockets) {
        try {
          socket.write(msg);
        } catch {
          sockets.delete(socket);
        }
      }
    }, 50);
  });
}

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
