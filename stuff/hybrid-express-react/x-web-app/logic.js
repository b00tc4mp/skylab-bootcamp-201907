module.exports = {
    authenticateUser(email, password) {
        if (email === 'pepito@mail.com' && password === '123')
            return { token: 'abc', id: 'xyz' }

        throw Error('wrong credentials')
    }
}