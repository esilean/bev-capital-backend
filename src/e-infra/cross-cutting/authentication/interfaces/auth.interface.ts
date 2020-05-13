/* eslint-disable @typescript-eslint/no-explicit-any */

import { Handler } from 'express'

export interface TokenInterface {
  id: string
  name: string
  email: string
  token?: string
}

export interface JwtInterface {
  signin(payload: TokenInterface): string
  verify(token: string): boolean
}

export interface AuthInterface {
  initialize(): Handler
  authenticate(): any
}
