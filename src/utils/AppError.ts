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

export interface ErrorResponseBody {
  error: {
    code: string;
    status: number;
    message?: string;
  };
  request_id: string;
}

export class AppError extends Error {
  code: string;
  status: number;

  constructor(code: string, status: number, message?: string) {
    super(message);
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, AppError.prototype);
  }

  static BadRequest(msg?: string) {
    return new AppError('BAD_REQUEST', 400, msg);
  }
  static Unauthorized(msg?: string) {
    return new AppError('UNAUTHORIZED', 401, msg);
  }
  static Forbidden(msg?: string) {
    return new AppError('FORBIDDEN', 403, msg);
  }
  static NotFound(msg?: string) {
    return new AppError('NOT_FOUND', 404, msg);
  }
  static Conflict(msg?: string) {
    return new AppError('CONFLICT', 409, msg);
  }
  static Internal(msg?: string) {
    return new AppError('INTERNAL_ERROR', 500, msg);
  }
}
