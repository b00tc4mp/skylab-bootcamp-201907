{
    const { random } = Math

    describe('retrieve user', () => {
        let user

        beforeEach(done => {
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
    
        
        it('should succeed on matching user with username', done => {
            expect(() => logic.retrieveUser(data.id, data.token, (error, _user) => {
                expect(error).toBeUndefined()
    
                const { id, name, surname, username, password } = _user
    
                expect(id).toBe(data.id)
                expect(name).toBe(user.name)
                expect(surname).toBe(user.surname)
                expect(username).toBe(user.username)
                expect(password).toBeUndefined()
    
                done()
            })).not.toThrow()
        })
    
        it('should fail on empty id', () => {
            expect(() => {
                logic.retrieveUser('', 'a-token', () => { })
            }).toThrowError(Error, 'id is empty or blank')
        })
    
        // TODO test more cases
    })
}