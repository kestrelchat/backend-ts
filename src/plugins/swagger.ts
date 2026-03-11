import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { FastifyPluginAsync } from 'fastify';

import { version } from '../../package.json';

const swaggerPlugin: FastifyPluginAsync = async (app) => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Kestrel API',
        description: 'HTTP API for Kestrel',
        version: version,
      },
    },
  });

  await app.register(swaggerUI, {
    routePrefix: '/swagger/',
  });
};

export default fp(swaggerPlugin);
