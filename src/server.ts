import { buildApp } from './app';

async function start() {
  try {
    const app = buildApp();

    const address = await app.listen({
      port: 5173,
      host: '0.0.0.0',
    });

    console.log(`Running at ${address}`);
  } catch (err) {
    console.error('Error starting:', err);
  }
}

start();
