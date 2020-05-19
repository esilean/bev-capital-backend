import socketio from 'socket.io'
export interface PriceWorkerInterface {
  getPrice(io: socketio.Server, symbol: string): void
}
