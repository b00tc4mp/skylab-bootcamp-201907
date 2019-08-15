logic.authenticateUser = (user, pass) => {
    validate.string(user, 'username')
    validate.string(pass, 'password')
    validate.email(user, 'username')

    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, JSON.stringify({ username: user, password: pass }))
    .then(res => {
        if (res.status === 'KO') throw new Error(res.error)
        return res.data
    })
}