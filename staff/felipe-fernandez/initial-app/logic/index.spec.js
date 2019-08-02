
describe('logic',  () => {
   
    beforeEach( () => {
       users = new Curray()
    })

    describe('register',  () => {
        it('should succeed on correct data',  () =>  {
            let user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123',
                favorites: []
            }

            logic.register(user.name, user.surname, user.email, user.password)

            let _user = users.pop()

            expect(_user).toEqual(user)
        })

        it('should fail on empty name',  () =>{
            expect( () => {
                logic.register('', 'Barzi', 'manuelbarzi@gmail.com', '123')
            }).toThrowError(Error, 'Name is empty or blank.')
        })

        it('should fail on non-valid e-mail',  () => {
            expect( () => {
                logic.register('Manuel', 'Barzi', 'manuelbarzi#gmail.com', '123')
            }).toThrowError(Error, 'E-mail is not valid.')
        })

        describe('when user already exists',  () => {
            let user = {
                name: 'John-' + Math.random(),
                surname: 'Doe-' + Math.random(),
                email: 'johndoe-' + Math.random() + '@mail.com',
                password: '123-' + Math.random(),
                favorites: []
            };
            
            beforeEach( () => {
                users.push(user)
            })

            it('should fail on already existing e-mail',  () => {
                expect( () => {
                    logic.register(user.name, user.surname, user.email, user.password, user.favorites)
                }).toThrowError(Error, 'E-mail is already registered.')
            })
        })
    })

    describe('login',  () => {
        let user = {
            name: 'John-' + Math.random(),
            surname: 'Doe-' + Math.random(),
            email: 'johndoe-' + Math.random() + '@mail.com',
            password: '123-' + Math.random()
        };
        
        beforeEach( () => {
            users.push(user)
        })

        it('should succeed on correct data',  () => {
            expect( () => {
                logic.login(user.email, user.password)
            }).not.toThrow()
        });

        it('should fail on empty email',  () => {
            expect( () => {
                logic.login('', user.password)
            }).toThrowError(Error, 'E-mail is empty or blank.')
        })

        it('should fail on non-valid e-mail',  () => {
            expect( () => {
                logic.login('manuelbarzi#gmail.com', '123')
            }).toThrowError(Error, 'E-mail is not valid.')
        })
    })

    describe('search ducks',  () => {
        it('should succeed on matching criteria',  (done) => {
            let query = 'white' // 12 results

            logic.searchDucks(query,  (ducks)  => {
                expect(ducks).toBeDefined()
                expect(ducks instanceof Array).toBeTruthy()
                expect(ducks.length).toBe(12)

                ducks.forEach( (duck) => {
                    expect(duck.id).toBeDefined()
                    expect(duck.title).toBeDefined()
                    expect(duck.imageUrl).toBeDefined()
                    expect(duck.price).toBeDefined()
                })

                done()
            })
        })
    })

    describe('retrieve duck',  () => {
        it('should succeed on valid id',  (done) => {
            let id = '5c3853aebd1bde8520e66ee8';

            logic.retrieveDuck(id,  (duck) => {
                expect(duck).toBeDefined()
                expect(duck.id).toBe(id);
                expect(duck.title).toBeDefined()
                expect(duck.imageUrl).toBeDefined()
                expect(duck.price).toBeDefined()
                expect(duck.link).toBeDefined()

                done()
            })
        })
    });
});