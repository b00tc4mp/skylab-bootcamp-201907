'use strict';

describe('logic', function(){

    beforeEach(function(){
        users= new Curray();
        
    });

    describe('register', function(){
        it('should suceed on correct data', function(){
            var user = {
                name: 'Felipe',
                surname: 'Fernandez',
                email: 'f@f.com',
                password: '12345'
            }
            register(user.name, user.surname, user.email, user.password);

            var userCheck = users.pop();

            expect(userCheck).toEqual(user);
        }); 

        it('should fail on empty name', function(){
            expect(function(){
                register('', 'Fernandez','f@f.com', '12345');
            }).toThrowError(Error, 'Name is empty or blank');
        });

        it('should fail on empty surname', function(){
            expect(function(){
                register('Felipe', '','f@f.com', '12345');
            }).toThrowError(Error, 'Surname is empty or blank');
        });

        it('should fail on non-valid email', function(){
            expect(function(){
                register('Felipe', 'Fernandez','f.com', '12345');
            }).toThrowError(Error, 'Fill the email form correctly');
        });

            describe('when user already exists', function(){
                var user = {
                    name: 'Felipe-' + Math.random(),
                    surname: 'Fernandez-' + Math.random(),
                    email: 'f-' + Math.random() + '@f.com',
                    password: '123-' + Math.random()
                };

                beforeEach(function(){
                    users.push(user);
                });

                it('should fail on existing email', function(){
                    expect(function(){
                        register(user.name, user.surname, user.email, user.password);
                    }).toThrowError(Error, 'This email already exists')
                });
            });

    });

    describe('login', function(){
          var user = {
                name: 'John-' + Math.random(),
                surname: 'Doe-' + Math.random(),
                email: 'johndoe-' + Math.random() + '@mail.com',
                password: '123-' + Math.random()
            };
    
            beforeEach(function() {
                users.push(user);
            });
            
            it('should succeed on correct data', function(){
                expect(function(){
                    login(user.email, user.password);
                }).not.toThrow();

            });

            it('should fail on empty email', function(){
                expect(function(){
                    login('', user.password);
                }).toThrowError(Error, 'E-mail is empty or blank.');
            });
            it('should fail on non-valid e-mail', function () {
                expect(function () {
                    login('fe#gmail.com', '123');
                }).toThrowError(Error, 'Fill the email form correctly');
            });
    });




});