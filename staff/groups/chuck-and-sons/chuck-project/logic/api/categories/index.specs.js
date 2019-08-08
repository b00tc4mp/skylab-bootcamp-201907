{
    describe('API CATEGORY', () => {

        describe('API categories request', () => {
            it('Should match all criterias', () => {
                return logic.getCategories()
                    .then(category => {
                        expect(category).toBeDefined()
                        expect(category instanceof Array).toBeTruthy()
                        expect(category.length).toBe(16)
                        expect(category).toMatch('animal')
                        expect(category).toMatch('career')
                        expect(category).toMatch('fashion')
                        expect(category).toMatch('food')
                        expect(category).toMatch('money')
                    })

            })

        })
    })

}