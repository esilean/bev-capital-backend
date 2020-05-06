describe('API -> GET /api/users', () => {
    it('#get all users', async (done) => {
        const response = await global['request'].get('/api/users')

        expect(response.status).toEqual(200)
        expect(response.body).toHaveLength(0)
        done()
    })
})
