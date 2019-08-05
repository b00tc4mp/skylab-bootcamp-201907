{
    describe("call() => IS IN CHARGE TO MANAGING REQUESTS TO API's" , () => {

        const { random } = Math

        describe('GET case => retrieve data from API' , () => {

            it("should succeed on retrieving ducks" , () => {
                    return call("http://duckling-api.herokuapp.com/api/search?q=white" , 'get' , undefined , undefined)
                        .then(response => expect(response).toBeDefined())
                        .catch(error => expect(error).toBeUndefined())
            
            })
        })

        describe("POST case => register a user" , () => {
            it("should succeed on registring a user" , () => {
                return call("https://skylabcoders.herokuapp.com/api/user" ,
                    'post' ,
                    { 'content-type' : 'application/json' }, 
                    {
                        "name": "Jaume",
                        "surname": "Norris",
                        "age": 35,
                        "project": "chuck"
                        "username": "jaume.norris@bitme.com",
                        "password": "123",
                        "favorites": []
                    })
                        .then(response => expect(response).toBeDefined())
                        .catch(error => expect(error).toBeUndefined())
            })
        })

        fdescribe("POST case => authenticate an user" , () => {
            const user , data
            
            beforeEach(){
                user = {
                    "name": `chuck-${random}`,
                    "surname": `norris-${random}`
                    "age": 35,
                    "project": "chuck",
                    "username": `chuck.${random}.norris@bitme.com`,
                    "password": `123-${random}`,
                    "favorites": []
                }

                return call("https://skylabcoders.herokuapp.com/api/user",
                            "post",
                            {"content-type" : "appplications/json",
                            user})
                                .then(response => {
                                    if (response === 'KO') throw Error (response.error)
                                })
            }
            it()

            return call("https://skylabcoders.herokuapp.com/api/auth",
                        "post",
                        {"content-type" : "application/json"} ,
                        {"username" : user.username , "password" : user.password})
                            .then(response => {
                                if(response.status === 'KO') throw Error (response.error)
                                else{
                                    data = response.data
                                    const { id , token } = data

                                    expect(data).toBeDefined()
                                    expect(id).toBeDefined()
                                    expect(token).toBeDefined()
                                }
                            })
        })

        // TODO => PUT method

        describe("error cases" , () => {

            it("should throw an error => wrong url string" , () => {
                expect( () => {
                    return call(1 , undefined , undefined , undefined)
                }).toThrowError(TypeError , "string with value 1 is not a valid string")
            })

            it("should throw an error => wrong url definition" , () => {
                expect( () => {
                    return call('.skylabcoders.com/ca' , undefined , undefined , undefined)
                }).toThrowError(TypeError , "url with value .skylabcoders.com/ca is not a valid URL")
            })

            it("should throw an error => wrong method definition" , () => {
                expect( () => {
                    return call("http://duckling-api.herokuapp.com/api/search?q=white" , 'describe' , undefined , undefined)
                }).toThrowError(TypeError , "method with value describe does not match one of the following values: get, post, put, patch, delete")
            })
        })
    })
}