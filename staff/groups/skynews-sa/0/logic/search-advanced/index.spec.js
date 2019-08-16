{
    describe('logic - search advanced news', () => {
        it('should retrieve data', () => {
            let query ="trump"
            return logic.searchNewsAdvanced(query)
            .then(result => {
                expect(result).toBeDefined()
                expect(result.length > 1).toBe(true)
            })
        })

        it('should fail on empty query', () => {
            expect(() => {
                logic.searchNewsAdvanced("")
            }).toThrowError(Error, "no query inserted")
        })

        it('should fail on wrong query', () =>
            logic.searchNewsAdvanced("dasfada")
            .then((res) => expect(res).toBeUndefined())
            .catch((error) => expect(error).toBeDefined()) 
        )
        it('should wrong on empty url image', () =>
        logic.searchNews('business', 'gb')
        .then((res) => expect(res.findIndex(element => element.urlToImage=='' || element.urlToImage== undefined || element.urlToImage== null)).toBe(-1)))
    })
}