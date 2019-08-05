{
    const { random } = Math

    describe("REGISTER CASE" , () =>{
        let user , data
        beforeEach(() => 
            user = {
                name: `Chuck-${random()}`,
                surname: `Norris-${random()}`,
                username: `chuck-${random()}-norris@bitme.com`,
                password: "123",
                project: "chuck",
                favorites: []
            }
        )
        it("should succeed with correct data" , () => 
            logic.registerUser(user.name , user.surname , user.username , user.password , user.password)
                
                .then( () => call("https://skylabcoders.herokuapp.com/api/auth", 'post', {'content-type' : 'application/json'}, {"username" : user.username , "password" : user.password}))
                .then(response => {
                    if (response.status === 'KO') throw Error(response.error)
                    else{
                        data = response.data
                        const { id , token } = data
                        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', {'authorization' : `bearer ${token}`}, undefined)}
                            })
                .then(response =>{
                      const _user = response.data
                      expect(_user.name).toBe(user.name)
                      expect(_user.surname).toBe(user.surname)
                      expect(_user.username).toBe(user.username)
                      expect(_user.project).toBe(user.project)
                      expect(_user.favorites).toBeDefined()
                      expect(_user.favorites).toEqual(user.favorites)
                })
        )

        it("should fail with wrong type of name" , () => 
            expect( () => {
                logic.registerUser(1 , user.surname , user.username , user.password , user.password)
            }).toThrowError(TypeError , "name with value 1 is not a valid string"))
        
        it("should fail with empty or blank name" , () => 
            expect( () => {
                logic.registerUser("" , user.surname , user.username , user.password , user.password)
            }).toThrowError(TypeError , "name is empty or blank"))
        


        it("should fail with wrong type of surname" , () => 
            expect( () => {
                logic.registerUser(user.name , 1 , user.username , user.password , user.password)
            }).toThrowError(TypeError , "surname with value 1 is not a valid string"))
        
        it("should fail with empty or blank surname" , () => 
            expect( () => {
                logic.registerUser(user.name , "", user.username , user.password , user.password)
            }).toThrowError(TypeError , "surname is empty or blank"))
        


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
        
        
        
        it("should fail with wrong type of repassword" , () => 
            expect( () => {
                logic.registerUser(user.name , user.surname , user.username , user.password , 1)
            }).toThrowError(TypeError , "repassword with value 1 is not a valid string"))
        
        it("should fail with empty or blank repassword" , () => 
            expect( () => {
                logic.registerUser(user.name , user.surname , user.username , user.password , "")
            }).toThrowError(TypeError , "repassword is empty or blank"))
        
        it("should fail with wrong repassword" , () => 
            expect( () => {
                logic.registerUser(user.name , user.surname , user.username , user.password , "678")
            }).toThrowError(Error , "password doesn't match")
        )
        
        
    })
}