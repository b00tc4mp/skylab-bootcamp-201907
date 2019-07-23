'use strict';

describe('logic', function () {
    beforeEach(function() {
        users = new Curray();
    });

    describe('register', function () {
        it('should succeed on correct data', function () {
            var user = {
                name: 'Jorge',
                surname: 'Rodriguez',
                email: 'jorge@gmail.com',
                password: '123456'
            };

            register(user.name, user.surname, user.email, user.password);

            var _user = users.pop();

            expect(_user).toEqual(user);
        });

        it('should fail on empty name', function () {
            expect(function () {
                register('', 'Rodriguez', 'jorge@gmail.com', '123456');
            }).toThrowError(Error, 'Name is empty or blank.');
        });

        it('should fail to wrong email', function(){
            expect(function(){
                register('Jorge', 'Rodriguez', 'jorge@@gmail.com', '123456');
            }).toThrowError(Error, 'Email not valid.')
        })

        it('should fail to wrong password', function(){
            expect(function(){
                register('Jorge', 'Rodriguez', 'jorge@gmail.com', '12345')
            }).toThrowError(Error, 'Password is not valid, you need minimum 6 numerics digits.')
        })

        describe('when user already exist', function(){
            expect(function(){
                
            })
        })
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
    });
});