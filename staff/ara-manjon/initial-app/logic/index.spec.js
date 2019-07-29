
describe('logic', () => {
    beforeEach(() => {
        users = new Curray()
    })

    describe('register', () => {
        it('should succeed on correct data', () => {
            const user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            }

            register(user.name, user.surname, user.email, user.password)

            const _user = users.pop()

            expect(_user).toEqual(user)
        })

        it('should fail on empty name', () => {
            expect(() => {
                register('', 'Barzi', 'manuelbarzi@gmail.com', '123')
            }).toThrowError(Error, 'Name is empty or blank.')
        })

        it('should fail on non-valid e-mail', () => {
            expect(() => {
                register('Manuel', 'Barzi', 'manuelbarzi#gmail.com', '123')
            }).toThrowError(Error, 'E-mail is not valid.')
        })

        describe('when user already exists', () => {
            const user = {
                name: 'John-' + Math.random(),
                surname: 'Doe-' + Math.random(),
                email: 'johndoe-' + Math.random() + '@mail.com',
                password: '123-' + Math.random()
            }

            beforeEach(() => {
                users.push(user)
            })

            it('should fail on already existing e-mail', () => {
                expect(() => {
                    register(user.name, user.surname, user.email, user.password)
                }).toThrowError(Error, 'E-mail is already registered.')
            })
        })
    })

    describe('login', () => {
        const user = {
            name: 'John-' + Math.random(),
            surname: 'Doe-' + Math.random(),
            email: 'johndoe-' + Math.random() + '@mail.com',
            password: '123-' + Math.random()
        }

        beforeEach(() => {
            users.push(user)
        })

        it('should succeed on correct data', () => {
            expect(() => {
                login(user.email, user.password)
            }).not.toThrow()
        })

        it('should fail on empty email', () => {
            expect(() => {
                login('', user.password);
            }).toThrowError(Error, 'E-mail is empty or blank.')
        })

        it('should fail on non-valid e-mail', () =>{
            expect(()=> {
                login('manuelbarzi#gmail.com', '123')
            }).toThrowError(Error, 'E-mail is not valid.')
        })
    })

    describe('search ducks', () => {
        it('should succed on matching criteria', done => {
            const query = 'white'

            logic.searchDucks(query, (ducks) => {
                expect(ducks).toBeDefined()
                expect(ducks instanceof Array).toBeTruthy()
                expect(duck.length).toBe(12)

                ducks.forEach(duck => {
                    expect(duck.id).toBeDefined()
                    expect(duck.title).toBeDefined()
                    expect(duck.imageUrl).toBeDefined()
                    expect(duck.price).toBeDefined()
                })
                done()
            })
        })//cuando no hay resultados y cuando el usuario introduce un string vacio
    })

    describe('retrive duck', () => {
        it('should succed on valid id', done => {
            const id = '5c3853aebd1bde8520e66ee8'

            logic.retrieveDuck(id, duck => {
                expect(duck).toBeDefined()
                expect(duck.id).toBe(id)
                expect(duck.title).toBeDefined()
                expect(duck.imageUrl).toBeDefined()
                expect(duck.price).toBeDefined()
                expect(duck.link).toBeDefined()

                done()

            })
        })
    })

    describe('add duck to favorites',()=>{
        it('should')
    })
})