import fp from 'fastify-plugin';
import websocket from '@fastify/websocket';
import { FastifyPluginAsync } from 'fastify';

const websocketPlugin: FastifyPluginAsync = async (fastify) => {
  await fastify.register(websocket);
};

export default fp(websocketPlugin);
