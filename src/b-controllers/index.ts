import Status from 'http-status'
import { Router, Request, Response } from 'express'

export default function index(): Router {
    const router: Router = Router()

    router.get('/', (request: Request, response: Response) => {
        response.status(Status.OK).json({
            status: 'WOA! Bev Capital API is Working!',
        })
    })

    return router
}
