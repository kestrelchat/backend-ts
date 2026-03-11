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

import { Pool } from 'pg';
import { config } from '../../utils/config';

export const postgres = new Pool({
  connectionString: config.database.postgres.url,
  max: config.database.postgres.max_connections,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

postgres.on('connect', () => {
  console.log('Postgres connected');
});

postgres.on('error', (err) => {
  console.error('Postgres error:', err);
});
