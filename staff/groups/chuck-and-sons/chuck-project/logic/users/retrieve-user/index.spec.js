{
    const {random} = Math

    describe("RETRIEVE CASE" , () => {
        let user , data

        beforeEach( () => {
             user = {
                name: `Chuck-${random()}`,
                surname: `Norris-${random()}`,
                username: 'johndoe-' + random() + '@mail.com',
                password: "123",
                project: "chuck",
                favorites: []
            }

            return call("https://skylabcoders.herokuapp.com/api/user" , 'post' , { 'content-type' : 'application/json' } , user)
            
            .then(response => {
                if (response.status === 'KO') throw Error (response.error)
            })

            .then( () => {
                return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' } , { username: user.username, password: user.password })
            })

            .then(response => {
                if(response.status === 'KO') throw new Error (response.error)
                data = response.data
            })
        })

        it("should succeed on correct data" , () => 
            logic.retrieveUser(data.id , data.token)
            .then( _user => {
                const { id , name , surname , username , project , password , favorites} = _user

                expect(id).toBe(data.id)
                expect(name).toBe(user.name)
                expect(surname).toBe(user.surname)
                expect(username).toBe(user.username)
                expect(project).toBe(user.project)
                expect(favorites).toBeDefined()
                expect(favorites).toEqual(user.favorites)
                expect(password).toBeUndefined()
            })
        )

        // it("should fail with wrong type of id" , () => 
        //     expect( () => {
        //         logic.retrieverUser( 1 , data.token)
        //     }).toThrowError(TypeError , "id with value 1 is not a valid string"))
        
        // it("should fail with empty or blank id" , () => 
        //     expect( () => {
        //         logic.retrieveUser( "" , data.token)
        //     }).toThrowError(TypeError , "id is empty or blank"))
    })
}