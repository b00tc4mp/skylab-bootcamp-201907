{
    describe('logic - authenticate user on skylab api', () => {
    let user

        beforeEach(() => {
            user = {
                name: `esputy-${Math.random()}`,
                surname: `esputy-${Math.random()}`,
                username: `esputy-${Math.random()}` + '@email.com',
                password: `esputy-${Math.random()}`,
                favorites: []
            }

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' },
                JSON.stringify(user))
                .then(res => {
                    
                    if (res.status === 'KO') throw new Error(res.error)

                })
        })

        it('should succeed on correct data', () => 
        logic.authenticateUser(user.username, user.password)
            .then(res => {
                expect(res).toBeDefined()
                expect(res.id).toBeDefined()
                expect(res.token).toBeDefined()
            })
            )

        it('should fail on incorrect data', () => 
            expect(() =>     
            logic.authenticateUser('randomwrong-email.com', user.password))
            .toThrowError(Error, 'username with value randomwrong-email.com is not a valid e-mail')
            
        )
        it('should fail on empty password', () => 
            expect(() =>     
            logic.authenticateUser(user.username, '   '))
            .toThrowError(Error, 'password is empty or blank')
            
        )
    })
}
