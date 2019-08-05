{
    describe('API logic', () => {

        const { random } = Math

        describe('logic SEARCH chuck-Jokes', () => {


            beforeEach(() => {
                user = {
                    name: 'Chuck' + random(),
                    surname: 'Norris' + random(),
                    username: 'chuck' + random() + '@norris.com',
                    password: '123' + random(),
                    favorites: []
                }
            })

            it('schould match all criterias', () => {
                const query = 'animal'

                return logic.searchJokes(undefined, undefined, query)
                    .then(jokes => {
                        expect(jokes).toBeDefined()
                        expect(jokes.result instanceof Array).toBeTruthy()
                        expect(jokes.total).toBe(17)


                        jokes.result.map(joke => {

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

            it('should return empty array if query is not found', () => {
                return logic.searchJokes(undefined, undefined, 'qwerty')
                    .then(joke => {
                        expect(joke.result.length).toBe(0)
                    })
            })

            it('should return error on empty query', () => {
                return logic.searchJokes(undefined, undefined, '')
                    .then(errors => {
                        expect(errors).toBeDefined()
                        expect(() => logic.searchJokes()).toThrowError(TypeError, 'query with value undefined is not a valid string')
                    })
            })


            describe('when user has already favorite jokes', () => {
                let credentials

                beforeEach(() => {

                    user.favorites.push("Y3XtQY1nQAWbZK9LCffH0A", "v04aFGwkRvyDfL65MsYSaQ", "dwxnerd8qamdgrzsl9aakq", "kh2dFDFJRh22lt0PXUFlRQ")

                    return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)

                            return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                                .then(response => {
                                    if (response.status === 'KO') throw new Error(response.error)

                                    credentials = response.data

                                })
                        })
                })


                it('should suceed on matching criteria', () => {
                    const query = 'all'

                    return logic.searchJokes(credentials.id, credentials.token, query)
                        .then(jokes => {
                            expect(jokes).toBeDefined()
                            expect(jokes.result instanceof Array).toBeTruthy()
                            expect(jokes.total).toBe(1469)

                            let favorites = 0

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

                                joke.favorite && favorites++

                            })

                            expect(favorites).toBe(user.favorites.length)
                        })

                })



            })

        })

    })
}