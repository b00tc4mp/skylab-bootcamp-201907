'use strict';

describe('logic', function () {
    beforeEach(function(){
        users=new Curray();
    });

    describe("register",function(){
        it("should succed on correct data",function(){
            var user={
                name:"Albert",
                surname:"Fuente",
                email:"a@gmail.com",
                password:"123"
            }
            register(user.name,user.surname,user.email,user.password);
            var _user=users.pop();
            expect(_user).toEqual(user);
        });

        it("should fail on empty name",function(){
            expect(function(){
                register("","Barzi","manuelbarzi@gmail.com","123");
            }).toThrowError(Error, 'Name is empty or blank.');
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
    });
});


describe("when user already exists",function(){
    var user = {
        name: 'John-' + Math.random(),
        surname: 'Doe-' + Math.random(),
        email: 'johndoe-' + Math.random() + '@mail.com',
        password: '123-' + Math.random()
    };
    beforeEach(function(){
        users.push(user)

    })
    it("should fail on alrady existing email",function(){
        expect(function(){
            register(user.name,user.surname,user.email,user.password)

        }).toThrowError(Erro,"email already registered.")
    });
});

