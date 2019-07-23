"use strict";

describe("logic",function(){
    beforeEach(function(){
        users=new Curray();
    });



    describe("register",function(){
        it("should succeed on correct data",function(){
            var user = {
                name: 'Manuel',
                surname: 'Barzi',
                email: 'manuelbarzi@gmail.com',
                password: '123'
            };
            register(user.name,user.surname,user.email,user.password);
            var _user=users.pop();
            expect(_user).toEqual(user);

        });

        it("should fail on empty name",function(){
            expect(function(){
                register("","manuel","albert@mail.com","123");
            }).toThrowError(Error,"Name is empty or blank.");
        });

        it("should fail on empty surname",function(){
            expect(function(){
                register("albert","","albert@mail.com","123");
            }).toThrowError(Error,'Surname is empty or blank.');
        })

        it("should fail on non valid email",function(){
            expect(function(){
                register("albert","fuente","acom","123");
            }).toThrowError(Error,'E-mail is not valid.');
        });

        it("should fail on empty password",function(){
            expect(function(){
                register("albert","fuente","albert@mail.com","");
            }).toThrowError(Error,'Password is empty or blank.\n');
        });

        describe("when user already exists",function(){
            var user = {
                name: 'John-' + Math.random(),
                surname: 'Doe-' + Math.random(),
                email: 'johndoe-' + Math.random() + '@mail.com',
                password: '123-' + Math.random()
            };

            beforeEach(function(){
                users.push(user);
            });
            it("should fail on already existing e-mail",function(){
                expect(function(){
                    register(user.name, user.surname, user.email, user.password);
                }).toThrowError(Error,'E-mail is alrady registered.');
            });
        });
    });



    describe('login',function(){
        var user = {
            name: 'John-' + Math.random(),
            surname: 'Doe-' + Math.random(),
            email: 'johndoe-' + Math.random() + '@mail.com',
            password: '123-' + Math.random()
        };

        beforeEach(function() {
            users.push(user);
        });

        it("should succeed on correct data",function(){
            expect(function(){
                login(user.email,user.password);
            }).not.toThrow();

        });
        it("should fail on empty email",function(){
            expect(function(){
                login("",user.password);
            }).toThrowError(Error,'E-mail is empty or blank.');
        });
        it("should fail on non-valid e-mail",function(){
            expect(function(){
                login("acom","123");
            }).toThrowError(Error,'E-mail is not valid.');
        });
        it("should fail on empty password",function(){
            expect(function(){
                login(user.email,"");
            }).toThrowError(Error,'Password is empty or blank.\n');
        });
        





    })
})