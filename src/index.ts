// Kestrel - a lightweight real-time messaging service
// Copyright (C) 2026 Kestrel Chat
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import Fastify from 'fastify';
import websocketPlugin from '@fastify/websocket';

const app = Fastify();

app.register(websocketPlugin);

// HTTP API will be registered under /api
app.register(
  async (api) => {
    // Example endpoint
    api.get('/', async () => ({ message: 'Hello, world!' }));
  },
  { prefix: '/api' },
);

const clients = new Set<WebSocket>(); // store all connected WebSocket clients

// WebSocket will be registered under /ws
app.get('/ws', { websocket: true }, (conn) => {
  clients.add(conn.socket);
  console.log('WS client connected');

  conn.socket.on('message', (msg: string | Buffer) => {
    for (const client of clients) {
      client.send(msg.toString());
    }
  });

  conn.socket.on('close', () => clients.delete(conn.socket));
});

app.listen({ port: 5173 }, (err, address) => {
  if (err) {
    console.error('Error starting:', err);
  }
  console.log(`Running at ${address}`);
});
