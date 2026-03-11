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

import fs from 'node:fs';
import path from 'node:path';
import toml from '@iarna/toml';

const CONFIG_PATH = path.join(process.cwd(), 'kestrel.toml');

if (!fs.existsSync(CONFIG_PATH)) {
  console.error('kestrel.toml not found. please create one.');
  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
const parsed = toml.parse(raw);

export interface KestrelConfig {
  server: {
    host: string;
    port: number;
  };
}

function createConfig<T extends object>(obj: unknown): T {
  if (!obj || typeof obj !== 'object') {
    throw new Error('Config must be an object');
  }

  return new Proxy(obj, {
    get(target, prop: string) {
      if (!(prop in target)) {
        throw new Error(`Missing config property: ${String(prop)}`);
      }
      const value = (target as Record<string, unknown>)[prop];
      if (value && typeof value === 'object') {
        return createConfig(value);
      }
      return value;
    },
  }) as T;
}

export const config = createConfig(parsed) as unknown as KestrelConfig;
