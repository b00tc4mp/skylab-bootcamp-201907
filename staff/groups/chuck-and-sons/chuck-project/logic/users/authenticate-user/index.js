logic.authenticateUser = function(username , password) {
    validate.str(username , 'username')
    validate.email(username , 'username')
    validate.str(password , 'password')

    return call("https://skylabcoders.herokuapp.com/api/auth" , 'post' , {'content-type' : 'application/json'} , {username , password} )
    .then(response => {
        if (response.status === 'KO') throw Error (response.error)

        return response.data
    })
}