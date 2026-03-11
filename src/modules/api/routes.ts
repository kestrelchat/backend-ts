import { FastifyPluginAsync } from 'fastify';

const apiRoutes: FastifyPluginAsync = async (app) => {
  app.get(
    '/',
    {
      schema: {
        summary: 'Example endpoint',
        description: 'This is a example endpoint!',
        tags: ['example'],
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Hello, world!' },
            },
          },
        },
      },
    },
    async () => {
      return { message: 'Hello, world!' };
    },
  );
};

export default apiRoutes;
