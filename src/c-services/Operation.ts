/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events'
import { EventTypeInterface } from './interfaces/operation.interface'

const createEventTypes = (eventTypes: Array<string>): EventTypeInterface => {
    const obj: EventTypeInterface = eventTypes.reduce((obj, eventType) => {
        obj[eventType] = eventType
        return obj
    }, Object.create(null))

    return obj
}

class Operation extends EventEmitter {
    private eventTypes: EventTypeInterface = {}

    constructor(eventTypes: Array<string>) {
        super()
        this.eventTypes = createEventTypes(eventTypes)
    }

    getEventTypes(): EventTypeInterface {
        return this.eventTypes
    }

    on(eventType: string, handler: any): any {
        if (this.eventTypes[eventType]) {
            return this.addListener(eventType, handler)
        }

        throw new Error(`Invalid eventType "${eventType}" to operation ON ${this.constructor.name}.`)
    }
}

export default Operation
