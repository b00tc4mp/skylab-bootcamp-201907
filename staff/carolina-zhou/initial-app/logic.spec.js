'use strict';

describe('logic', function () {
    beforeEach(function() {
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

            register(user.name, user.surname, user.email, user.password);

            var _user = users.pop();

            expect(_user).toEqual(user);
        });

        it('should fail on empty name', function () {
            expect(function () {
                register('', 'Barzi', 'manuelbarzi@gmail.com', '123');
            }).toThrowError(Error, 'Name is empty or blank.');
        });

        it('should fail on non-valid e-mail', function () {
            expect(function () {
                register('Manuel', 'Barzi', 'manuelbarzi#gmail.com', '123');
            }).toThrowError(Error, 'E-mail is not valid.');
        });

        it('should fail on existent account', function () {
            expect(function () {
                users.push({
                    name: "Carolina",
                    surname: "Zhou",                  
                    email: "carol.z.lin.95@gmail.com",
                    password: "123456",  
                });

                register('Carolina', 'Zhou', 'carol.z.lin.95@gmail.com', '123456')
            }).toThrowError(Error, 'There is already an account with the provided e-mail address.');
        });
    });

    describe('login', function () {
        var user = {
            name: 'John-' + Math.random(),
            surname: 'Doe-' + Math.random(),
            email: 'johndoe-' + Math.random() + '@mail.com',
            password: '123-' + Math.random()
        };

        beforeEach(function() {
            users.push(user);
        });

        it('should succeed on correct data', function () {
            expect(function() {
                login(user.email, user.password);
            }).not.toThrow();
        });

        it('should fail on empty email', function () {
            expect(function() {
                login('', user.password);
            }).toThrowError(Error, 'E-mail is empty or blank.');
        });

        it('should fail on non-valid email', function () {
            expect(function () {
                login('manuelbarzi#gmail.com', '123');
            }).toThrowError(Error,'E-mail is not valid.');
        });

        it('should fail on wrong credentials', function () {
            expect(function() {
                users.push({
                    email: "carol.z.lin.95@gmail.com",
                    name: "Carolina",
                    password: "123456",
                    surname: "Zhou"
                });
                login("carol.z.lin.95@gmail.com", "123");
            }).toThrowError(Error, 'Wrong credentials.');
        });
    });
});