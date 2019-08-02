{
    describe("logic - retrieve user" , () => {
        let user

        beforeEach((done => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }

            call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' },
                user,
                (error, response) => {
                    if (error) done(error)
                    else if (response.status === 'KO') done(new Error(response.error))
                    else call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                        { 'content-type': 'application/json' },
                        { username: user.username, password: user.password },
                        (error, response) => {
                            if (error) done(error)
                            else if (response.status === 'KO') done(new Error(response.error))
                            else {
                                data = response.data

                                done()
                            }
                        }
                    )
                }
            )
        })

        it('should succeed on correct data', done => {
            expect(() => logic.authenticateUser(user.username, user.password, (error, data) => {
                expect(error).toBeUndefined()

                expect(data).toBeDefined()

                const { id, token } = data
                expect(id).toBeDefined()
                expect(token).toBeDefined()

                done()
            })).not.toThrow()
        })

        it('should fail on empty username', () => {
            expect(() => {
                logic.authenticateUser('', user.password, () => { })
            }).toThrowError(Error, 'username is empty or blank')
        })

        it('should fail on non-valid username', () => {
            expect(() => {
                logic.authenticateUser('manuelbarzi#gmail.com', '123', () => { })
            }).toThrowError(Error, 'username with value manuelbarzi#gmail.com is not a valid e-mail')
        })
    ) 
}