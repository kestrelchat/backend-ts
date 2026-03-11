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

import fp from 'fastify-plugin';
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { AppError, ErrorResponseBody } from '../utils/AppError';
import { ulid } from 'ulid';

type ErrorLike = { code?: string; status?: number; message?: string };

const errorHandlerPlugin = fp(async (app: FastifyInstance) => {
  app.setErrorHandler((err: unknown, req: FastifyRequest, reply: FastifyReply) => {
    const request_id = ulid();

    const { code, status, message } =
      err instanceof AppError
        ? { code: err.code, status: err.status, message: err.message }
        : err instanceof Error
          ? { code: 'INTERNAL_ERROR', status: 500, message: err.message }
          : (() => {
              const unknownErr = err as ErrorLike;
              return {
                code: unknownErr.code ?? 'UNKNOWN_ERROR',
                status: unknownErr.status ?? 500,
                message:
                  unknownErr.message ?? (typeof err === 'string' ? err : JSON.stringify(err)),
              };
            })();

    const body: ErrorResponseBody = { request_id, error: { code, status, message } };
    reply.status(status).send(body);
  });
});

export default errorHandlerPlugin;
