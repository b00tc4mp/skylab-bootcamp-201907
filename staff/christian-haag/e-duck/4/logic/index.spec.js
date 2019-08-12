'use strict'

const { random } = Math

describe('logic', () => {
    beforeEach(() => {
        // users = []
    })

    describe('register user', () => {
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

        it('should succeed on correct data', done => {
            expect(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password, error => {
                expect(error).toBeUndefined()

                done()
            })).not.toThrow()
        })

        it('should fail on empty name', () => {
            expect(() => {
                logic.registerUser('', 'Barzi', 'manuelbarzi@gmail.com', '123', '123', () => { })
            }).toThrowError(Error, 'name is empty or blank')
        })

        it('should fail on non-valid e-mail', () => {
            expect(() => {
                logic.registerUser('Manuel', 'Barzi', 'manuelbarzi#gmail.com', '123', '123', () => { })
            }).toThrowError(Error, 'e-mail is not valid')
        })

        it('should fail on non-matching re-password', () => {
            expect(() => {
                logic.registerUser('Manuel', 'Barzi', 'manuelbarzi@gmail.com', '123', '456', () => { })
            }).toThrowError(Error, 'passwords do not match')
        })

        // TODO test more cases

        describe('when user already exists', () => {
            it('should fail on already existing e-mail', done => {
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
        const user = {
            name: 'John-' + random(),
            surname: 'Doe-' + random(),
            username: 'johndoe-' + random() + '@mail.com',
            password: '123-' + random()
        }

        beforeEach(() => {
            users.push(user)
        })

        it('should succeed on correct data', () => {
            expect(() => {
                const _user = logic.authenticateUser(user.username, user.password)

                expect(_user).toBeUndefined()
            }).not.toThrow()
        })

        it('should fail on empty username', () => {
            expect(() => {
                logic.authenticateUser('', user.password)
            }).toThrowError(Error, 'e-mail is empty or blank')
        })

        it('should fail on non-valid e-mail', () => {
            expect(() => {
                logic.authenticateUser('manuelbarzi#gmail.com', '123')
            }).toThrowError(Error, 'e-mail is not valid')
        })

        // TODO test more cases
    })

    xdescribe('retrieve user', () => {
        const user = {
            name: 'John-' + random(),
            surname: 'Doe-' + random(),
            username: 'johndoe-' + random() + '@mail.com',
            password: '123-' + random()
        }

        beforeEach(() => {
            users.push(user)
        })

        it('should succeed on matching user with e-mail', () => {
            expect(() => {
                const _user = logic.retrieveUser(user.username)

                const { name, surname, username, password } = _user

                expect(name).toBe(user.name)
                expect(surname).toBe(user.surname)
                expect(username).toBe(user.username)
                expect(password).toBeUndefined()
            }).not.toThrow()
        })

        it('should fail on empty username', () => {
            expect(() => {
                logic.retrieveUser('')
            }).toThrowError(Error, 'e-mail is empty or blank')
        })

        it('should fail on non-valid e-mail', () => {
            expect(() => {
                logic.retrieveUser('manuelbarzi#gmail.com')
            }).toThrowError(Error, 'e-mail is not valid')
        })

        // TODO test more cases
    })

    xdescribe('search ducks', () => {
        it('should succeed on matching criteria', done => {
            const query = 'white' // 12 results

            logic.searchDucks(undefined, query, (error, ducks) => {
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
            logic.searchDucks(undefined, 'patata', (error, ducks) => {
                expect(error).toBeUndefined()

                expect(ducks).toBeDefined()
                expect(ducks.length).toBe(0)

                done()
            })
        })

        it('should fail on undefined query', () => {
            expect(() => logic.searchDucks()).toThrowError(TypeError, `undefined is not a string`)
        })

        it('should fail on undefined expression', () => {
            expect(() => logic.searchDucks(undefined, 'something')).toThrowError(TypeError, `undefined is not a function`)
        })

        // TODO test more cases

        describe('when user already has favorite ducks', () => {
            let name, surname, username, password, user

            beforeEach(() => {
                users = new Array

                name = `n-${random()}`
                surname = `s-${random()}`
                username = `e-${random()}@mail.com`
                password = `p-${random()}`

                user = { name, surname, username, password, favorites: new Array('5c3853aebd1bde8520e66e52', '5c3853aebd1bde8520e66e97', '5c3853aebd1bde8520e66e9e') }

                users.push(user)
            })

            it('should succeed on matching criteria', done => {
                const query = 'white' // 12 results

                logic.searchDucks(username, query, (error, ducks) => {
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

    xdescribe('retrieve duck', () => {
        it('should succeed on valid id', done => {
            const id = '5c3853aebd1bde8520e66ee8'

            logic.retrieveDuck(undefined, id, (error, duck) => {
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

        it('should fail on non valid id', done => {
            const id = '5c3853aebd1bde8520e66ff9'

            logic.retrieveDuck(undefined, id, (error, duck) => {
                expect(error).toBeDefined()
                expect(duck).toBeUndefined()

                done()
            })
        })

        // TODO test more cases

        describe('when user already has a favorite duck', () => {
            const id = '5c3853aebd1bde8520e66e97'
            let name, surname, username, password, user

            beforeEach(() => {
                users = new Array

                name = `n-${random()}`
                surname = `s-${random()}`
                username = `e-${random()}@mail.com`
                password = `p-${random()}`

                user = { name, surname, username, password, favorites: new Array('5c3853aebd1bde8520e66e52', id, '5c3853aebd1bde8520e66e9e') }

                users.push(user)
            })

            it('should succeed on valid id', done => {
                logic.retrieveDuck(username, id, (error, duck) => {
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

                logic.retrieveDuck(username, id, (error, duck) => {
                    expect(error).toBeDefined()
                    expect(duck).toBeUndefined()

                    done()
                })
            })

            // TODO test more cases
        })
    })

    xdescribe('toggle favorite duck', () => {
        let name, surname, username, password

        beforeEach(() => {
            users = new Array

            name = `n-${random()}`
            surname = `s-${random()}`
            username = `e-${random()}@mail.com`
            password = `p-${random()}`

            users.push({ name, surname, username, password, favorites: new Array })
        })

        it('should succeed on correct duck id', done => {
            const id = '5c3853aebd1bde8520e66ee8'

            logic.toggleFavDuck(username, id, error => {
                expect(error).toBeUndefined()

                const { favorites } = users.find(user => user.username === username)
                expect(favorites.length).toBe(1)

                const favorite = favorites[0]
                expect(favorite).toBe(id)

                done()
            })
        })

        it('should fail on non existing username', () => {
            username = 'invalid@mail.com'

            expect(() => logic.toggleFavDuck(username))
                .toThrowError(Error, `user with username ${username} not found`)
        })

        it('should fail non existing duck id', done => {
            const id = '5c3853aebd1bde8520e66ff9'

            logic.toggleFavDuck(username, id, error => {
                expect(error).toBeDefined()

                const { message } = error
                expect(message).toBe(`cannot retrieve duck with id ${id}`)

                done()
            })
        })

        // TODO test more cases

        describe('when duck already in favorites', () => {
            let name, surname, username, password, favorites, duckId, user

            beforeEach(() => {
                users = new Array

                name = `n-${random()}`
                surname = `s-${random()}`
                username = `e-${random()}@mail.com`
                password = `p-${random()}`
                favorites = new Array
                duckId = '5c3853aebd1bde8520e66ee8'

                favorites.push(duckId)

                user = { name, surname, username, password, favorites }

                users.push(user)
            })

            it('should succeed on matching duck id', done => {
                logic.toggleFavDuck(username, duckId, error => {
                    expect(error).toBeUndefined()

                    expect(favorites.length).toBe(0)

                    done()
                })
            })

            // TODO test more cases
        })
    })

    xdescribe('retrieve favorite ducks', () => {
        let name, surname, username, password

        beforeEach(() => {
            users = new Array

            name = `n-${random()}`
            surname = `s-${random()}`
            username = `e-${random()}@mail.com`
            password = `p-${random()}`

            users.push({ name, surname, username, password, favorites: new Array('5c3853aebd1bde8520e66ee8', '5c3853aebd1bde8520e66ec4') })
        })

        it('should succeed on previously added fav ducks', done => {
            logic.retrieveFavoriteDucks(username, (error, ducks) => {
                expect(error).toBeUndefined()

                expect(ducks).toBeDefined()
                expect(ducks.length).toBe(2)

                ducks.forEach(({ id, title, imageUrl, price, description, link }) => {
                    expect(id).toBeDefined()
                    expect(title).toBeDefined()
                    expect(imageUrl).toBeDefined()
                    expect(price).toBeDefined()
                    expect(description).toBeDefined()
                    expect(link).toBeDefined()

                    const { favorites } = users[0]
                    const _id = favorites.find(fav => fav === id)
                    expect(_id).toBeDefined()
                    expect(_id).toBe(id)
                })

                done()
            })
        })

        // TODO test more cases
    })
})
