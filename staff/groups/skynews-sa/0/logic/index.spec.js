/* 'use strict'

const { random } = Math

describe('logic', () => {
    beforeEach(() => {
        users = []
    })

    describe('register', () => {
        it('should succeed on correct data', () => {
            const user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123',
                favorites: new Array
            }

            logic.register(user.name, user.surname, user.email, user.password)

            const _user = users.pop()

            expect(_user).toEqual(user)
        })

        it('should fail on empty name', () => {
            expect(() => {
                logic.register('', 'Barzi', 'manuelbarzi@gmail.com', '123')
            }).toThrowError(Error, 'Name is empty or blank.')
        })

        it('should fail on non-valid e-mail', () => {
            expect(() => {
                logic.register('Manuel', 'Barzi', 'manuelbarzi#gmail.com', '123')
            }).toThrowError(Error, 'E-mail is not valid.')
        })

        describe('when user already exists', () => {
            const user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                email: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random()
            }

            beforeEach(() => {
                users.push(user)
            })

            it('should fail on already existing e-mail', () => {
                expect(() => {
                    logic.register(user.name, user.surname, user.email, user.password)
                }).toThrowError(Error, 'E-mail is already registered.')
            })
        })
    })

    describe('login', () => {
        const user = {
            name: 'John-' + random(),
            surname: 'Doe-' + random(),
            email: 'johndoe-' + random() + '@mail.com',
            password: '123-' + random()
        }

        beforeEach(() => {
            users.push(user)
        })

        it('should succeed on correct data', () => {
            expect(() => {
                logic.login(user.email, user.password)
            }).not.toThrow()
        })

        it('should fail on empty email', () => {
            expect(() => {
                logic.login('', user.password)
            }).toThrowError(Error, 'E-mail is empty or blank.')
        })

        it('should fail on non-valid e-mail', () => {
            expect(() => {
                logic.login('manuelbarzi#gmail.com', '123')
            }).toThrowError(Error, 'E-mail is not valid.')
        })
    })

    describe('search ducks', () => {
        it('should succeed on matching criteria', done => {
            const query = 'white' // 12 results

            logic.searchDucks(query, (error, ducks) => {
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
            logic.searchDucks('patata', (error, ducks) => {
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
            expect(() => logic.searchDucks('something')).toThrowError(TypeError, `undefined is not a function`)
        })
    })

    describe('retrieve duck', () => {
        it('should succeed on valid id', done => {
            const id = '5c3853aebd1bde8520e66ee8'

            logic.retrieveDuck(id, (error, duck) => {
                expect(error).toBeUndefined()

                expect(duck).toBeDefined()
                expect(duck.id).toBe(id)
                expect(duck.title).toBeDefined()
                expect(duck.imageUrl).toBeDefined()
                expect(duck.price).toBeDefined()
                expect(duck.link).toBeDefined()

                done()
            })
        })

        it('should fail on non valid id', done => {
            const id = '5c3853aebd1bde8520e66ff9'

            logic.retrieveDuck(id, (error, duck) => {
                expect(error).toBeDefined()
                expect(duck).toBeUndefined()

                done()
            })
        })
    })

    describe('add duck to favorites', () => {
        let name, surname, email, password

        beforeEach(() => {
            users = new Array

            name = `n-${random()}`
            surname = `s-${random()}`
            email = `e-${random()}@mail.com`
            password = `p-${random()}`

            users.push({ name, surname, email, password, favorites: new Array })
        })

        it('should succeed on correct duck id', done => {
            const id = '5c3853aebd1bde8520e66ee8'

            logic.addDuckToFavorites(email, id, error => {
                expect(error).toBeUndefined()

                const { favorites } = users.find(user => user.email === email)
                expect(favorites.length).toBe(1)

                const favorite = favorites[0]
                expect(favorite).toBe(id)

                done()
            })
        })

        it('should fail on non existing email', () => {
            email = 'invalid@mail.com'

            expect(() => logic.addDuckToFavorites(email))
                .toThrowError(Error, `user with email ${email} not found`)
        })

        it('should fail non existing duck id', done => {
            const id = '5c3853aebd1bde8520e66ff9'

            logic.addDuckToFavorites(email, id, error => {
                expect(error).toBeDefined()

                const { message } = error
                expect(message).toBe(`cannot retrieve duck with id ${id}`)

                done()
            })
        })
    })

    describe('remove duck from favorites', () => {
        let name, surname, email, password, favorites, duckId, user

        beforeEach(() => {
            users = new Array

            name = `n-${random()}`
            surname = `s-${random()}`
            email = `e-${random()}@mail.com`
            password = `p-${random()}`
            favorites = new Array
            duckId = '5c3853aebd1bde8520e66ee8'

            favorites.push(duckId)

            user = { name, surname, email, password, favorites }

            users.push(user)
        })

        it('should succeed on matching duck id', () => {
            logic.removeDuckFromFavorites(email, duckId)

            expect(favorites.length).toBe(0)
        })
    })

    describe('retrieve favorite ducks', () => {
        let name, surname, email, password

        beforeEach(() => {
            users = new Array

            name = `n-${random()}`
            surname = `s-${random()}`
            email = `e-${random()}@mail.com`
            password = `p-${random()}`

            users.push({ name, surname, email, password, favorites: new Array('5c3853aebd1bde8520e66ee8', '5c3853aebd1bde8520e66ec4') })
        })

        it('should succeed on previously added fav ducks', done => {
            logic.retrieveFavoriteDucks(email, (error, ducks) => {
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
    })
})
 */