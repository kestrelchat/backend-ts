const clients = new Set<WebSocket>();

export function addClient(ws: WebSocket) {
  clients.add(ws);
}

export function removeClient(ws: WebSocket) {
  clients.delete(ws);
}

export function broadcast(message: string) {
  for (const client of clients) {
    client.send(message);
  }
}
