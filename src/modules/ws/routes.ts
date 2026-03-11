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
