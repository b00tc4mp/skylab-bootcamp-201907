{
    const { random } = Math

    describe('logic', () => {
        let user

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }
        })

        describe('search ducks', () => {
            it('should succeed on matching criteria', done => {
                const query = 'white' // 12 results

                logic.searchDucks(undefined, undefined, query, (error, ducks) => {
                    expect(error).toBeUndefined()

                    expect(ducks).toBeDefined()
                    expect(ducks instanceof Array).toBeTruthy()
                    expect(ducks.length).toBe(12)

                    ducks.forEach(duck => {
                        expect(duck.id).toBeDefined()
                        expect(duck.title).toBeDefined()
                        expect(duck.imageUrl).toBeDefined()
                        expect(duck.price).toBeDefined()
                    })

                    done()
                })
            })

            it('should get empy array on no matching criteria', done => {
                logic.searchDucks(undefined, undefined, 'patata', (error, ducks) => {
                    expect(error).toBeUndefined()

                    expect(ducks).toBeDefined()
                    expect(ducks.length).toBe(0)

                    done()
                })
            })

            it('should fail on undefined query', () => {
                expect(() => logic.searchDucks()).toThrowError(TypeError, `query with value undefined is not a string`)
            })

            it('should fail on undefined expression', () => {
                expect(() => logic.searchDucks(undefined, undefined, 'something')).toThrowError(TypeError, `expression with value undefined is not a function`)
            })

            // TODO test more cases

            describe('when user already has favorite ducks', () => {
                let data

                beforeEach(done => {
                    user.favorites.push('5c3853aebd1bde8520e66e99', '5c3853aebd1bde8520e66e8a', '5c3853aebd1bde8520e66e70')

                    call('https://skylabcoders.herokuapp.com/api/user', 'post',
                        { 'content-type': 'application/json' },
                        user,
                        (error, response) => {
                            if (error) done(error)
                            else if (response.status === 'KO') done(new Error(response.error))
                            else call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                                { 'content-type': 'application/json' },
                                { username: user.username, password: user.password },
                                (error, response) => {
                                    if (error) done(error)
                                    else if (response.status === 'KO') done(new Error(response.error))
                                    else {
                                        data = response.data

                                        done()
                                    }
                                }
                            )
                        }
                    )
                })

                it('should succeed on matching criteria', done => {
                    const query = 'white' // 12 results

                    logic.searchDucks(data.id, data.token, query, (error, ducks) => {
                        expect(error).toBeUndefined()

                        expect(ducks).toBeDefined()
                        expect(ducks instanceof Array).toBeTruthy()
                        expect(ducks.length).toBe(12)

                        let favorites = 0

                        ducks.forEach(duck => {
                            expect(duck.id).toBeDefined()
                            expect(duck.title).toBeDefined()
                            expect(duck.imageUrl).toBeDefined()
                            expect(duck.price).toBeDefined()

                            duck.favorite && favorites++
                        })

                        expect(favorites).toBe(user.favorites.length)

                        done()
                    })
                })
            })
        })

    })
}
