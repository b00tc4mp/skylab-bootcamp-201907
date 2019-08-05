{
    const { random } = Math

    describe('logic  search chuck Jokes', () => {


        beforeEach(() => {
            user = {
                name: 'Chuck' + random(),
                surname: 'Norris' + random(),
                username: 'chuck' + random() + '@norris.com',
                password: '123' + random()
            }
        })

        it('schould match all criterias', () => {
            const query = 'animal'

            return logic.searchJokes(undefined, undefined, query)
                .then(jokes => {
                    expect(jokes).toBeDefined()
                    expect(jokes instanceof Array).toBeTruthy
                    expect(jokes.total).toBe(17)


                    jokes.result.forEach(joke => {
                        expect(joke.categories).toBeDefined()
                        expect(joke.categories instanceof Array).toBeTruthy()
                        expect(joke.created_at).toBeDefined()
                        expect(joke.icon_url).toBeDefined()
                        expect(joke.id).toBeDefined()
                        expect(joke.updated_at).toBeDefined()
                        expect(joke.url).toBeDefined()
                        expect(joke.value).toBeDefined()
                        expect(typeof joke.value).toBe('string')

                    })
                })

        })
    })
}