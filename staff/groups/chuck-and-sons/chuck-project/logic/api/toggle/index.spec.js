{
    const { random } = Math

    describe("TOGGLE FAVORITES CASE" , () => {
        const idItem = "GT53aU-TR-i0Ia7CmWeAqA"
        let user , credentials

        describe("user hasn't got the id item in favorites array" , () => {
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
                    credentials = response.data
                })
            })

            it("should succeed on coherent data" , () => 
                logic.toggleFavoriteItem(credentials.id , credentials.token , idItem)
                .then(() => 
                    call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}` , 'get' , { 'authorization' : `bearer ${credentials.token}` } , undefined)
                    .then(response => {
                        if (response.status === 'KO') throw Error (response.error)
                        
                        const user = response.data

                        expect(user.id).toBe(credentials.id)
                        expect(user.favorites).toBeDefined()
                        expect(user.favorites[0]).toBe(idItem)
                        // const [favorite] = favorites => expect(favorite).toBe(itemId)
                    })
                )
            )
        })

        describe("user has got the id item in favorites array" , () => {
            beforeEach( () => {
             user = {
                name: `Chuck-${random()}`,
                surname: `Norris-${random()}`,
                username: 'johndoe-' + random() + '@mail.com',
                password: "123",
                project: "chuck",
                favorites: [idItem]
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
                    credentials = response.data
                })
            })

            it("should succeed on coherent data" , () => 
                logic.toggleFavoriteItem(credentials.id , credentials.token , idItem)
                .then(() => 
                    call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}` , 'get' , { 'authorization' : `bearer ${credentials.token}` } , undefined)
                    .then(response => {
                        if (response.status === 'KO') throw Error (response.error)
                        
                        const user = response.data

                        expect(user.id).toBe(credentials.id)
                        expect(user.favorites).toBeDefined()
                        expect(user.favorites.length).toBe(0)
                    })
                )
            )

            it("should thorw error => invalid id" , () => {
                expect( () => {
                    logic.toggleFavoriteItem(1 , credentials.token , idItem)
                }).toThrowError ( TypeError , "id with value 1 is not a valid string")
            })
            
            it("should thorw error => empty id" , () => {
                expect( () => {
                    logic.toggleFavoriteItem('', credentials.token , idItem)
                }).toThrowError ( TypeError , "id is empty or blank")
            })
            
            it("should thorw error => invalid id" , () => {
                expect( () => {
                    logic.toggleFavoriteItem(credentials.id , 1 , idItem)
                }).toThrowError ( TypeError , "token with value 1 is not a valid string")
            })
            
            it("should thorw error => empty id" , () => {
                expect( () => {
                    logic.toggleFavoriteItem(credentials.id, " " , idItem)
                }).toThrowError ( TypeError , "token is empty or blank")
            })
            
            it("should thorw error => invalid id" , () => {
                expect( () => {
                    logic.toggleFavoriteItem(credentials.id , credentials.token , 1)
                }).toThrowError ( TypeError , "idItem with value 1 is not a valid string")
            })
            
            it("should thorw error => empty id" , () => {
                expect( () => {
                    logic.toggleFavoriteItem(credentials.id, credentials.token , "")
                }).toThrowError ( TypeError , "idItem is empty or blank")
            })
        }) 
    })
}