logic.registerUser = function (name, surname, username, password, repassword) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(username, 'username')
    validate.email(username, 'username')
    validate.string(password, 'password')
    validate.string(repassword, 'password repeat')



    call('https://skylabcoders.herokuapp.com/api/user', 'post',
        { 'content-type': 'application/json' },
        { name, surname, username, password, favorites: [] })
        .then(response=>{
            if(response.status === 'KO') expression(new Error(response.error))
        }
    )
}
