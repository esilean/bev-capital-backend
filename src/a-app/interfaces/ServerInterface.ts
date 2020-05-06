export interface ServerInterface {
    app(): Express.Application
    startServer(): void
}
