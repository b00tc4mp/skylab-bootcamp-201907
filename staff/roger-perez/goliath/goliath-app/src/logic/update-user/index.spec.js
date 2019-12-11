{
    const { random } = Math

    describe('logic - register user', () => {
        let user, credentials

        beforeEach(() =>
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }
        )

        it('should succeed on correct data', () =>
            logic.registerUser(user.name, user.surname, user.username, user.password, user.password)
                .then(() => call('http://localhost:8080/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password }))
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)
                    else {
                        credentials = response.data

                        return call(`http://localhost:8080/api/user/${credentials.id}`, 'get', { 'authorization': `bearer ${credentials.token}` }, undefined)
                    }
                })
                .then(response => {
                    const _user = response.data

                    expect(_user.name).toBe(user.name)
                    expect(_user.surname).toBe(user.surname)
                    expect(_user.username).toBe(user.username)
                    expect(_user.password).toBeUndefined()
                    expect(_user.id).toBe(credentials.id)
                    expect(_user.favorites).toBeDefined()
                    expect(_user.favorites).toEqual(user.favorites)
                })
        )

        it('should fail on empty name', () =>
            expect(() =>
                logic.registerUser('', 'Doe', 'johndoe@gmail.com', '123', '123')
            ).toThrowError(Error, 'name is empty or blank')
        )

        it('should fail on non-valid username', () =>
            expect(() =>
                logic.registerUser('John', 'Doe', 'johndoe#gmail.com', '123', '123')
            ).toThrowError(Error, 'username with value johndoe#gmail.com is not a valid e-mail')
        )

        it('should fail on non-matching re-password', () =>
            expect(() =>
                logic.registerUser('John', 'Doe', 'johndoe@gmail.com', '123', '456')
            ).toThrowError(Error, 'passwords do not match')
        )

       

        describe('when user already exists', () => {
            it('should fail on already existing username', () =>
                logic.registerUser(user.name, user.surname, user.username, user.password, user.password)
                    .catch(error => expect(error).toBeUndefined())
                    .then(() => logic.registerUser(user.name, user.surname, user.username, user.password, user.password))
                    .catch(error => expect(error).toBeDefined())
            )

        })
    })
}