logic.authenticateUser = (user, pass) => {
    validate.string(user, 'username')
    validate.string(pass, 'password')
    validate.email(user, 'username')
    debugger

    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user, password: pass }, 'skylab')
    .then(res => {
        if (res.status === 'KO') throw new Error(res.error)
        return res.data
    })
}