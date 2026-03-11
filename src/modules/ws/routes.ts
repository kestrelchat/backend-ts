/*
 * Kestrel - a lightweight real-time messaging service
 * Copyright (C) 2026 Kestrel Chat
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { FastifyPluginAsync } from 'fastify';
import { addClient, removeClient, broadcast } from './clients';

const wsRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', { websocket: true }, (conn) => {
    const socket = conn.socket;

    addClient(socket);

    console.log('ws client connected');

    socket.on('message', (msg: Buffer | string) => {
      broadcast(msg.toString());
    });

    socket.on('close', () => {
      removeClient(socket);
    });
  });
};

export default wsRoutes;
