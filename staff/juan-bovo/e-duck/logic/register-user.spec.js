{
    const { random } = Math

    describe('register user', () => {
        let user

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }
        })

        it('should succeed on correct data', done => {
            expect(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password, error => {
                expect(error).toBeUndefined()

                call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                    { 'content-type': 'application/json' },
                    { username: user.username, password: user.password },
                    (error, response) => {
                        if (error) done(error)
                        else if (response.status === 'KO') done(new Error(response.error))
                        else {
                            const { id, token } = response.data

                            call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
                                { 'authorization': `bearer ${token}` },
                                undefined,
                                (error, response) => {
                                    if (error) done(error)
                                    else if (response.status === 'KO') done(new Error(response.error))
                                    else {
                                        const _user = response.data

                                        expect(_user.name).toBe(user.name)
                                        expect(_user.surname).toBe(user.surname)
                                        expect(_user.username).toBe(user.username)
                                        expect(_user.password).toBeUndefined()
                                        expect(_user.id).toBe(id)
                                        expect(_user.favorites).toBeDefined()
                                        expect(_user.favorites).toEqual(user.favorites)

                                        done()
                                    }
                                }
                            )
                        }
                    }
                )
            })).not.toThrow()
        })

        it('should fail on empty name', () => {
            expect(() => {
                logic.registerUser('', 'Barzi', 'manuelbarzi@gmail.com', '123', '123', () => { })
            }).toThrowError(Error, 'name is empty or blank')
        })

        it('should fail on non-valid username', () => {
            expect(() => {
                logic.registerUser('Manuel', 'Barzi', 'manuelbarzi#gmail.com', '123', '123', () => { })
            }).toThrowError(Error, 'username with value manuelbarzi#gmail.com is not a valid e-mail')
        })

        it('should fail on non-matching re-password', () => {
            expect(() => {
                logic.registerUser('Manuel', 'Barzi', 'manuelbarzi@gmail.com', '123', '456', () => { })
            }).toThrowError(Error, 'passwords do not match')
        })

        // TODO test more cases

        describe('when user already exists', () => {
            it('should fail on already existing username', done => {
                expect(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password, error => {
                    expect(error).toBeUndefined()

                    expect(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password, error => {
                        expect(error).toBeDefined()

                        done()
                    })).not.toThrow()
                })).not.toThrow()
            })

            // TODO test more cases
        })
    })
}