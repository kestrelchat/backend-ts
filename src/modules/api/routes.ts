import { FastifyPluginAsync } from 'fastify';

const apiRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return { message: 'Hello, world!' };
  });
};

export default apiRoutes;
