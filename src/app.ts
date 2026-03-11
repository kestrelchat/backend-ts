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

import websocketPlugin from './plugins/websocket';
import apiRoutes from './modules/api/routes';
import wsRoutes from './modules/ws/routes';

export function buildApp() {
  const app = Fastify();

  app.register(websocketPlugin);

  app.register(apiRoutes, {
    prefix: '/api',
  });

  app.register(wsRoutes, {
    prefix: '/ws',
  });

  return app;
}
