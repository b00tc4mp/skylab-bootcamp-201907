'use strict'

describe('logic', function () {
    beforeEach(function () {
        users = new Curray();
    });
});


describe('register', function () {
    it('should check that users can be added', function () {
        var user = {
            name: 'Christian',
            surname: 'Haag',
            email: 'a@gmail.com',
            password: '123456789'
        };

        register(user.name, user.surname, user.email, user.password);

        var _user = users.pop()

        expect(_user).toEqual(user);
    });

    it('should fail on empty name', function () {
        expect(function () {
            register('', 'Haag', 'a@gmail.com', '123456789')
        }).toThrowError(Error, 'Name is empty or blank.')
    });

    it('should fail on empty surename', function () {
        expect(function () {
            register('Christian', '', 'a@gmail.com', '123456789')
        }).toThrowError(Error, 'Surname is empty or blank.')
    })

    it('should fail on empty email', function () {
        expect(function () {
            register('Christian', 'Haag', '', '123456789')
        }).toThrowError(Error, 'E-mail is empty or blank.')
    });

    it('should fail on email length', function () {
        expect(function () {
            register('Christian', 'Haag', 'a@mail', '123456789')
        }).toThrowError(Error, 'e-mail to short, minimum 7 charachters of length')
    });

    it('should fail on email format', function () {
        expect(function () {
            register('Christian', 'Haag', 'a--gmail.com', '123456789')
        }).toThrowError(Error, 'Your e-mail format is not correct')
    });

    it('should fail on empty password', function () {
        expect(function () {
            register('Christian', 'Haag', 'a@gmail.com', '')
        }).toThrowError(Error, 'Password is empty or blank')
    });

    it('should fail on password length.', function () {
        expect(function () {
            register('Christian', 'Haag', 'a@gmail.com', '12345')
        }).toThrowError(Error, 'Password must be between 8 and 10 characters')
    });

})

describe('login', function () {
    it('should ')
    var user = {
        name: 'Christian-' + Math.random(),
        surname: 'Haag-' + Math.random(),
        email: 'johndoe-' + Math.random() + '@mail.com',
        password: '123-' + Math.floor(Math.random() * 6)
    };

    beforeEach(function () {
        users.push(user);
    });

    it('should succeed on correct data', function () {
        expect(function () {
            login(user.email, user.password);
        }).not.toThrow();
    });

    it('should fail on empty email', function () {
        expect(function () {
            login('', user.password);
        }).toThrowError(Error, 'E-mail is empty or blank.');
    });
});

