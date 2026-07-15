/**
 * 0.3.8 迷你 WebSocket 广播服务（零依赖，仅教学）
 * 运行: node server.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = Number(process.env.PORT) || 3788;
const HTML = path.join(__dirname, 'index.html');
const clients = new Set();

function acceptKey(secWebSocketKey) {
  return crypto
    .createHash('sha1')
    .update(secWebSocketKey + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11')
    .digest('base64');
}

function encodeText(str) {
  const payload = Buffer.from(str, 'utf8');
  const len = payload.length;
  let header;
  if (len < 126) {
    header = Buffer.alloc(2);
    header[0] = 0x81;
    header[1] = len;
  } else if (len < 65536) {
    header = Buffer.alloc(4);
    header[0] = 0x81;
    header[1] = 126;
    header.writeUInt16BE(len, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = 0x81;
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(len), 2);
  }
  return Buffer.concat([header, payload]);
}

function decodeFrames(buffer, onText, onClose) {
  let offset = 0;
  while (offset + 2 <= buffer.length) {
    const b0 = buffer[offset];
    const b1 = buffer[offset + 1];
    const opcode = b0 & 0x0f;
    const masked = (b1 & 0x80) !== 0;
    let len = b1 & 0x7f;
    let pos = offset + 2;
    if (len === 126) {
      if (pos + 2 > buffer.length) break;
      len = buffer.readUInt16BE(pos);
      pos += 2;
    } else if (len === 127) {
      if (pos + 8 > buffer.length) break;
      len = Number(buffer.readBigUInt64BE(pos));
      pos += 8;
    }
    const maskLen = masked ? 4 : 0;
    if (pos + maskLen + len > buffer.length) break;
    let payload = buffer.subarray(pos + maskLen, pos + maskLen + len);
    if (masked) {
      const mask = buffer.subarray(pos, pos + 4);
      payload = Buffer.from(payload.map((byte, i) => byte ^ mask[i % 4]));
    }
    offset = pos + maskLen + len;
    if (opcode === 0x8) {
      onClose();
      break;
    }
    if (opcode === 0x1) onText(payload.toString('utf8'));
    if (opcode === 0x9) {
      /* ping → pong */
    }
  }
  return buffer.subarray(offset);
}

function broadcast(obj, except) {
  const buf = encodeText(JSON.stringify(obj));
  for (const socket of clients) {
    if (socket !== except && socket.writable) socket.write(buf);
  }
}

function upgrade(req, socket) {
  const key = req.headers['sec-websocket-key'];
  if (!key) {
    socket.destroy();
    return;
  }
  const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey(key)}`,
    '\r\n',
  ];
  socket.write(headers.join('\r\n'));
  clients.add(socket);
  let rest = Buffer.alloc(0);

  socket.on('data', (chunk) => {
    rest = Buffer.concat([rest, chunk]);
    rest = decodeFrames(
      rest,
      (text) => {
        let msg;
        try {
          msg = JSON.parse(text);
        } catch {
          msg = { type: 'chat', text };
        }
        const out = {
          type: 'chat',
          text: String(msg.text || ''),
          from: String(msg.from || 'anon').slice(0, 24),
          at: new Date().toISOString(),
        };
        const buf = encodeText(JSON.stringify(out));
        for (const s of clients) {
          if (s.writable) s.write(buf);
        }
      },
      () => socket.end(),
    );
  });

  socket.on('close', () => clients.delete(socket));
  socket.on('error', () => {
    clients.delete(socket);
    socket.destroy();
  });

  const hello = encodeText(
    JSON.stringify({ type: 'system', text: '已连接，可发送消息', at: new Date().toISOString() }),
  );
  socket.write(hello);
  broadcast({ type: 'system', text: `在线 ${clients.size} 人`, at: new Date().toISOString() }, socket);
}

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    fs.createReadStream(HTML).pipe(res);
    return;
  }
  res.writeHead(404).end('Not Found');
});

server.on('upgrade', (req, socket) => {
  if (req.url === '/ws') upgrade(req, socket);
  else socket.destroy();
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`WebSocket demo: http://127.0.0.1:${PORT}`);
  console.log(`WS endpoint:    ws://127.0.0.1:${PORT}/ws`);
});
