logic.registerUser = function(name , surname , username , password, repassword) {
    validate.string(name , 'name')
    validate.string(surname , 'surname')
    validate.string(username , 'username')
    validate.email(username , 'username')
    validate.string(password , 'password')

    if(password !== repassword) throw Error ("password doesn't match")

    const user = {
        "name" : name,
        "surname" : surname,
        "username" : username,
        "password" : password,
        "project" : "chuck",
        "favorites" : []
    }

    call("https://skylabcoders.herokuapp.com/api/user" , 'post' , {'content-type' : 'application/json'} , user)
    .then(response => {
        if (response.status === 'KO') throw Error (response.error)
    })
}