{
    const { random } = Math

    describe('USER LOGIC' , () => {

        describe("register case" , () =>{
            
            let user , data

            beforeEach( () => {
                user = {
                    "name" : `Chuck-${random()}`,
                    "surname" : `Norris-${random()}`,
                    "username" : `chuck.${random()}.norris.bitme.com`,
                    "password" : "123",
                    "project" : "chuck",
                    "favorites" : []
                }
            })

            it("should succeed" , () => {
                logic.registerUser("https://skylabcoders.herokuapp.com/api/user" , 'post' , {'content-type' : 'application/json'} , user)
                    .then( () => {
                        call("https://skylabcoders.herokuapp.com/api/auth",
                                'post',
                                {'content-type' : 'application/json'},
                                {"username" : user.username , "password" : user.password}
                            )(response => {
                                if (response.status === 'KO') throw Error(response.error)
                                else{
                                    data = response.data
                                    const { id , token } = data

                                    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`,
                                                    'get',
                                                    {'authorization' : token},
                                                    undefined
                                                ).then(response =>{
                                                        const _user = response.data

                                                        expect(user.name).toBe(user.name)
                                                        expect(_user.surname).toBe(user.surname)
                                                        expect(_user.username).toBe(user.username)
                                                        expect(_user.project).toBe(user.project)
                                                        expect(_user.favorites).toBeDefined()
                                                        expect(_user.favorites).toEqual(user.favorites)
                                                })
                                }
                            })
                    })
            })
        })
    })
}