import { Request, Response, NextFunction } from 'express'
import { CradleInterface } from '../../ioc/interfaces/CradleInterface'

export interface RequestInterface<T> extends Request {
    body: T
    query: {}
    container: {
        cradle: CradleInterface
    }
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ResponseInterface extends Response {}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NextInterface extends NextFunction {}
