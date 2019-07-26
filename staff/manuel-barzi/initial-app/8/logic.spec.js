'use strict';

describe('logic', function () {
    beforeEach(function () {
        users = new Curray();
    });

    describe('register', function () {
        it('should succeed on correct data', function () {
            var user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            };

            logic.register(user.name, user.surname, user.email, user.password);

            var _user = users.pop();

            expect(_user).toEqual(user);
        });

        it('should fail on empty name', function () {
            expect(function () {
                logic.register('', 'Barzi', 'manuelbarzi@gmail.com', '123');
            }).toThrowError(Error, 'Name is empty or blank.');
        });

        it('should fail on non-valid e-mail', function () {
            expect(function () {
                logic.register('Manuel', 'Barzi', 'manuelbarzi#gmail.com', '123');
            }).toThrowError(Error, 'E-mail is not valid.');
        });

        describe('when user already exists', function () {
            var user = {
                name: 'John-' + Math.random(),
                surname: 'Doe-' + Math.random(),
                email: 'johndoe-' + Math.random() + '@mail.com',
                password: '123-' + Math.random()
            };

            beforeEach(function () {
                users.push(user);
            });

            it('should fail on already existing e-mail', function () {
                expect(function () {
                    logic.register(user.name, user.surname, user.email, user.password);
                }).toThrowError(Error, 'E-mail is already registered.');
            });
        });
    });

    describe('login', function () {
        var user = {
            name: 'John-' + Math.random(),
            surname: 'Doe-' + Math.random(),
            email: 'johndoe-' + Math.random() + '@mail.com',
            password: '123-' + Math.random()
        };

        beforeEach(function () {
            users.push(user);
        });

        it('should succeed on correct data', function () {
            expect(function () {
                logic.login(user.email, user.password);
            }).not.toThrow();
        });

        it('should fail on empty email', function () {
            expect(function () {
                logic.login('', user.password);
            }).toThrowError(Error, 'E-mail is empty or blank.');
        });

        it('should fail on non-valid e-mail', function () {
            expect(function () {
                logic.login('manuelbarzi#gmail.com', '123');
            }).toThrowError(Error, 'E-mail is not valid.');
        });
    });

    describe('search ducks', function () {
        it('should succeed on matching criteria', function (done) {
            var query = 'white'; // 12 results

            logic.searchDucks(query, function (ducks) {
                expect(ducks).toBeDefined();
                expect(ducks instanceof Array).toBeTruthy();
                expect(ducks.length).toBe(12);

                ducks.forEach(function (duck) {
                    expect(duck.id).toBeDefined();
                    expect(duck.title).toBeDefined();
                    expect(duck.imageUrl).toBeDefined();
                    expect(duck.price).toBeDefined();
                });

                done();
            });
        });
    });

    describe('retrieve duck', function () {
        it('should succeed on valid id', function (done) {
            var id = '5c3853aebd1bde8520e66ee8';

            logic.retrieveDuck(id, function (duck) {
                expect(duck).toBeDefined();
                expect(duck.id).toBe(id);
                expect(duck.title).toBeDefined();
                expect(duck.imageUrl).toBeDefined();
                expect(duck.price).toBeDefined();
                expect(duck.link).toBeDefined();

                done();
            });
        });
    });
});