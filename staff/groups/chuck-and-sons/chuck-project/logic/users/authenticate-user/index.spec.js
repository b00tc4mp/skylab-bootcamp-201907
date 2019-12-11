{
    const { random } = Math

    describe("AUTHENTICATE CASE" , () => {
        let user 

       beforeEach(() => {
            user = {
                name: `Chuck-${random()}`,
                surname: `Norris-${random()}`,
                username: `chuck-${random()}-norris@bitme.com`,
                password: "123",
                project: "chuck",
                favorites: []
            }

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)
                })
        })

        it('should succeed on correct data', () =>
            logic.authenticateUser(user.username, user.password)
                .then(data => {
                    expect(data).toBeDefined()

                    const { id, token } = data
                    expect(id).toBeDefined()
                    expect(token).toBeDefined()
                })
        )

        it("should fail with wrong type of mail" , () => 
            expect( () => {
                logic.registerUser(user.name , user.surname , 1 , user.password , user.password)
            }).toThrowError(TypeError , "username with value 1 is not a valid string"))
        
        it("should fail with empty or blank mail" , () => 
            expect( () => {
                logic.registerUser(user.name , user.surname , "" , user.password , user.password)
            }).toThrowError(TypeError , "username is empty or blank"))
        
        it("should fail with wrong definition of mail" , () => 
            expect( () => {
                logic.registerUser(user.name , user.surname , "chuck#mail.com" , user.password , user.password)
            }).toThrowError(TypeError , "username with value chuck#mail.com is not a valid email"))

        
        
        it("should fail with wrong type of password" , () => 
            expect( () => {
                logic.registerUser(user.name , user.surname , user.username , 1 , user.password)
            }).toThrowError(TypeError , "password with value 1 is not a valid string"))
        
        it("should fail with empty or blank password" , () => 
            expect( () => {
                logic.registerUser(user.name , user.surname , user.username , "" , user.password)
            }).toThrowError(TypeError , "password is empty or blank"))
        
        
    })
}