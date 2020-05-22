import socketio from 'socket.io'
export interface PriceWorkerInterface {
  sendPriceToClient(io: socketio.Server, symbol: string): void
}
