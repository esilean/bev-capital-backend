/* eslint-disable @typescript-eslint/no-explicit-any */
export interface OperationInterface {
  getEventType(): EventTypeInterface
  on(eventType: string, handler: any): any
}

export interface EventTypeInterface {
  [key: string]: string
}
