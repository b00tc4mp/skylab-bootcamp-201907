'use strict';

describe('logic', () => {
    beforeEach(() => {
        users = new Curray();
    });

    describe('register', () => {
        it('should succeed on correct data', () => {
            const user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            };

            logic.register(user.name, user.surname, user.email, user.password);

            const _user = users.pop();

            expect(_user).toEqual(user);
        });

        it('should fail on empty name', () => {
            expect(() => {
                logic.register('', 'Barzi', 'manuelbarzi@gmail.com', '123');
            }).toThrowError(Error, 'Name is empty or blank.');
        });

        it('should fail on non-valid e-mail', () => {
            expect(() => {
                logic.register('Manuel', 'Barzi', 'manuelbarzi#gmail.com', '123');
            }).toThrowError(Error, 'E-mail is not valid.');
        });

        describe('when user already exists', () => {
            const user = {
                name: 'John-' + Math.random(),
                surname: 'Doe-' + Math.random(),
                email: 'johndoe-' + Math.random() + '@mail.com',
                password: '123-' + Math.random()
            };

            beforeEach(() => {
                users.push(user);
            });

            it('should fail on already existing e-mail', () => {
                expect(() => {
                    logic.register(user.name, user.surname, user.email, user.password);
                }).toThrowError(Error, 'E-mail is already registered.');
            });
        });
    });

    describe('login', () => {
        const user = {
            name: 'John-' + Math.random(),
            surname: 'Doe-' + Math.random(),
            email: 'johndoe-' + Math.random() + '@mail.com',
            password: '123-' + Math.random()
        };

        beforeEach(() => {
            users.push(user);
        });

        it('should succeed on correct data', () => {
            expect(() => {
                logic.login(user.email, user.password);
            }).not.toThrow();
        });

        it('should fail on empty email', () => {
            expect(() => {
                logic.login('', user.password);
            }).toThrowError(Error, 'E-mail is empty or blank.');
        });

        it('should fail on non-valid e-mail', () => {
            expect(() => {
                logic.login('manuelbarzi#gmail.com', '123');
            }).toThrowError(Error, 'E-mail is not valid.');
        });
    });

    describe('search ducks', () => {
        it('should succeed on matching criteria', done => {
            const query = 'white'; // 12 results

            logic.searchDucks(query, (error, ducks) => {
                expect(error).toBeUndefined()

                expect(ducks).toBeDefined();
                expect(ducks instanceof Array).toBeTruthy();
                expect(ducks.length).toBe(12);

                ducks.forEach(duck => {
                    expect(duck.id).toBeDefined();
                    expect(duck.title).toBeDefined();
                    expect(duck.imageUrl).toBeDefined();
                    expect(duck.price).toBeDefined();
                });

                done();
            });
        });

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
    });

    describe('retrieve duck', () => {
        it('should succeed on valid id', done => {
            const id = '5c3853aebd1bde8520e66ee8';

            logic.retrieveDuck(id, (error, duck) => {
                expect(error).toBeUndefined()

                expect(duck).toBeDefined();
                expect(duck.id).toBe(id);
                expect(duck.title).toBeDefined();
                expect(duck.imageUrl).toBeDefined();
                expect(duck.price).toBeDefined();
                expect(duck.link).toBeDefined();

                done();
            });
        });

        it('should fail on non valid id', done => {
            const id = '5c3853aebd1bde8520e66ff9';

            logic.retrieveDuck(id, (error, duck) => {
                expect(error).toBeDefined()
                expect(duck).toBeUndefined()

                done();
            });
        });
    });
});
