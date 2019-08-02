'use strict'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

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

    describe('register user', () => {
        it('should succeed on correct data', done => {
            expect(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password, error => {
                expect(error).toBeUndefined()

                call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                    { 'content-type': 'application/json' },
                    { username: user.username, password: user.password },
                    (error, response) => {
                        if (error) done(error)
                        else if (response.status === 'KO') done(new Error(response.error))
                        else {
                            const { id, token } = response.data

                            call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
                                { 'authorization': `bearer ${token}` },
                                undefined,
                                (error, response) => {
                                    if (error) done(error)
                                    else if (response.status === 'KO') done(new Error(response.error))
                                    else {
                                        const _user = response.data

                                        expect(_user.name).toBe(user.name)
                                        expect(_user.surname).toBe(user.surname)
                                        expect(_user.username).toBe(user.username)
                                        expect(_user.password).toBeUndefined()
                                        expect(_user.id).toBe(id)
                                        expect(_user.favorites).toBeDefined()
                                        expect(_user.favorites).toEqual(user.favorites)

                                        done()
                                    }
                                }
                            )
                        }
                    }
                )
            })).not.toThrow()
        })

        it('should fail on empty name', () => {
            expect(() => {
                logic.registerUser('', 'Barzi', 'manuelbarzi@gmail.com', '123', '123', () => { })
            }).toThrowError(Error, 'name is empty or blank')
        })

        it('should fail on non-valid username', () => {
            expect(() => {
                logic.registerUser('Manuel', 'Barzi', 'manuelbarzi#gmail.com', '123', '123', () => { })
            }).toThrowError(Error, 'username with value manuelbarzi#gmail.com is not a valid e-mail')
        })

        it('should fail on non-matching re-password', () => {
            expect(() => {
                logic.registerUser('Manuel', 'Barzi', 'manuelbarzi@gmail.com', '123', '456', () => { })
            }).toThrowError(Error, 'passwords do not match')
        })

        // TODO test more cases

        describe('when user already exists', () => {
            it('should fail on already existing username', done => {
                expect(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password, error => {
                    expect(error).toBeUndefined()

                    expect(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password, error => {
                        expect(error).toBeDefined()

                        done()
                    })).not.toThrow()
                })).not.toThrow()
            })

            // TODO test more cases
        })
    })

    describe('authenticate user', () => {
        beforeEach(done => {
            call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' },
                user,
                (error, response) => {
                    if (error) done(error)
                    else if (response.status === 'KO') done(new Error(response.error))
                    else done()
                }
            )
        })

        it('should succeed on correct data', done => {
            expect(() => logic.authenticateUser(user.username, user.password, (error, data) => {
                expect(error).toBeUndefined()

                expect(data).toBeDefined()

                const { id, token } = data
                expect(id).toBeDefined()
                expect(token).toBeDefined()

                done()
            })).not.toThrow()
        })

        it('should fail on empty username', () => {
            expect(() => {
                logic.authenticateUser('', user.password, () => { })
            }).toThrowError(Error, 'username is empty or blank')
        })

        it('should fail on non-valid username', () => {
            expect(() => {
                logic.authenticateUser('manuelbarzi#gmail.com', '123', () => { })
            }).toThrowError(Error, 'username with value manuelbarzi#gmail.com is not a valid e-mail')
        })

        // TODO test more cases
    })

    describe('retrieve user', () => {
        let data

        beforeEach(done => {
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

        it('should succeed on matching user with username', done => {
            expect(() => logic.retrieveUser(data.id, data.token, (error, _user) => {
                expect(error).toBeUndefined()

                const { id, name, surname, username, password } = _user

                expect(id).toBe(data.id)
                expect(name).toBe(user.name)
                expect(surname).toBe(user.surname)
                expect(username).toBe(user.username)
                expect(password).toBeUndefined()

                done()
            })).not.toThrow()
        })

        it('should fail on empty id', () => {
            expect(() => {
                logic.retrieveUser('', 'a-token', () => { })
            }).toThrowError(Error, 'id is empty or blank')
        })

        // TODO test more cases
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

    describe('retrieve duck', () => {
        it('should succeed on valid duck id', done => {
            const id = '5c3853aebd1bde8520e66ee8'

            logic.retrieveDuck(undefined, undefined, id, (error, duck) => {
                expect(error).toBeUndefined()

                expect(duck).toBeDefined()
                expect(duck.id).toBe(id)
                expect(duck.title).toBeDefined()
                expect(duck.imageUrl).toBeDefined()
                expect(duck.price).toBeDefined()
                expect(duck.link).toBeDefined()
                expect(duck.favorite).toBeUndefined()

                done()
            })
        })

        it('should fail on non valid duck id', done => {
            const id = '5c3853aebd1bde8520e66ff9'

            logic.retrieveDuck(undefined, undefined, id, (error, duck) => {
                expect(error).toBeDefined()
                expect(duck).toBeUndefined()

                done()
            })
        })

        // TODO test more cases

        describe('when user already has a favorite duck', () => {
            const id = '5c3853aebd1bde8520e66e97'

            let data

            beforeEach(done => {
                user.favorites.push(id)

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

            it('should succeed on valid id', done => {
                logic.retrieveDuck(data.id, data.token, id, (error, duck) => {
                    expect(error).toBeUndefined()

                    expect(duck).toBeDefined()
                    expect(duck.id).toBe(id)
                    expect(duck.title).toBeDefined()
                    expect(duck.imageUrl).toBeDefined()
                    expect(duck.price).toBeDefined()
                    expect(duck.link).toBeDefined()
                    expect(duck.favorite).toBeTruthy()

                    done()
                })
            })

            it('should fail on non valid id', done => {
                const id = '5c3853aebd1bde8520e66ff9'

                logic.retrieveDuck(data.id, data.token, id, (error, duck) => {
                    expect(error).toBeDefined()
                    expect(duck).toBeUndefined()

                    done()
                })
            })

            // TODO test more cases
        })
    })

    describe('toggle favorite duck', () => {
        const id = '5c3853aebd1bde8520e66e97'

        let data

        beforeEach(done => {
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

        it('should succeed on correct duck id', done => {
            logic.toggleFavDuck(data.id, data.token, id, error => {
                expect(error).toBeUndefined()

                call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                    { 'authorization': `bearer ${data.token}` },
                    undefined,
                    (error, response) => {
                        if (error) done(error)
                        else if (response.status === 'KO') done(new Error(response.error))
                        else {
                            const user = response.data

                            expect(user.id).toBe(data.id)

                            const { favorites } = user
                            expect(favorites).toBeDefined()
                            expect(favorites.length).toBe(1)

                            const [favorite] = favorites
                            expect(favorite).toBe(id)

                            done()
                        }
                    }
                )
            })
        })

        // TODO refactor
        // it('should fail on non existing id', () => {
        //     expect(() => logic.toggleFavDuck('invalid-id', data.token, id, () => {}))
        //         .toThrowError(Error, `user with username ${username} not found`)
        // })

        // TODO refactor
        // it('should fail non existing duck id', done => {
        //     const id = '5c3853aebd1bde8520e66ff9'

        //     logic.toggleFavDuck(username, id, error => {
        //         expect(error).toBeDefined()

        //         const { message } = error
        //         expect(message).toBe(`cannot retrieve duck with id ${id}`)

        //         done()
        //     })
        // })

        // TODO test more cases

        describe('when duck already in favorites', () => {
            const id = '5c3853aebd1bde8520e66e97'

            let data

            beforeEach(done => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: [id]
                }

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

            it('should succeed on correct duck id', done => {
                logic.toggleFavDuck(data.id, data.token, id, error => {
                    expect(error).toBeUndefined()

                    call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                        { 'authorization': `bearer ${data.token}` },
                        undefined,
                        (error, response) => {
                            if (error) done(error)
                            else if (response.status === 'KO') done(new Error(response.error))
                            else {
                                const user = response.data

                                expect(user.id).toBe(data.id)

                                const { favorites } = user
                                expect(favorites).toBeDefined()
                                expect(favorites.length).toBe(0)

                                done()
                            }
                        }
                    )
                })
            })

            // TODO test more cases
        })
    })

    describe('retrieve favorite ducks', () => {
        let data

        beforeEach(done => {
            user.favorites.push('5c3853aebd1bde8520e66e97', '5c3853aebd1bde8520e66ee8', '5c3853aebd1bde8520e66ec4')

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

        it('should succeed on previously added fav ducks', done => {
            logic.retrieveFavoriteDucks(data.id, data.token, (error, ducks) => {
                expect(error).toBeUndefined()

                expect(ducks).toBeDefined()
                expect(ducks.length).toBe(3)

                ducks.forEach(({ id, title, imageUrl, price, description, link }) => {
                    expect(id).toBeDefined()
                    expect(title).toBeDefined()
                    expect(imageUrl).toBeDefined()
                    expect(price).toBeDefined()
                    expect(description).toBeDefined()
                    expect(link).toBeDefined()

                    const { favorites } = user
                    expect(favorites.includes(id)).toBeTruthy()
                })

                done()
            })
        })

        // TODO test more cases
    })
})
