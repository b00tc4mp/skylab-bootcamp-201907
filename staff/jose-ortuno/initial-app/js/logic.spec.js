'use strict';

describe('logic', function() {
    // con esto limpiamos el curray y comenzamos de cero
    beforeEach(function() {
        users = new Curray();
    });

    describe('register', function() {
        it('should succeed on correct data', function() {
          var user = {
              name: 'jose',
              surname: 'ortuño',
              email: 'jose@gmail.com',
              password: '123'
          };
          
          userRegister(user.name, user.surname, user.email, user.password);

          var _user = users.pop();
          expect(_user).toEqual(user);
        });

        it('should fail on empty name', function() {
            expect(function() {
                userRegister('', 'ortuño', 'jos@gmail.com', '123');
            }).toThrowError(Error, 'Name is empty or blank');
        });

        it('s hould fail on non-valid email', function() {
            expect(function() {
                userRegister('jose', 'ortuño', 'jose#gmail.com', '123');
            }).toThrowError(Error, 'E-mail is not valid');
        });
    });

    describe('login', function() {
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
                userLogin(user.email, user.password);
            }).not.toThrow();
        });

        it('should fail on empty email', function () {
            expect(function() {
                userLogin('', user.password);
            }).toThrowError(Error, 'E-mail is empty or blank.');
        });

        it('should fail on non-valid e-mail', function () {
            expect(function () {
                userLogin('manuelbarzi#gmail.com', '123');
            }).toThrowError(Error, 'Wrong credentials. Try again!');
        });
    });
});