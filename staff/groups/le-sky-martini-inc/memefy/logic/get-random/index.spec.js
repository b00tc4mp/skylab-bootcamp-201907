{
    describe('logic - get random', () => {
        it('should succeed on retrieving a valid random gif', () =>
        logic.getRandom(undefined, undefined, undefined)
            .then(gif => {
                expect(gif).toBeDefined()
                expect(gif.data.id).toBeDefined()
                expect(gif.data.is_sticker).toBe(0)
                expect(gif.data.title).toBeDefined()
                expect(gif.data.images.downsized_large.url).toBeDefined()
                expect(gif.data.import_datetime).toBeDefined()
                expect(gif.data.bitly_url).toBeDefined()
            })
        )
    })
}