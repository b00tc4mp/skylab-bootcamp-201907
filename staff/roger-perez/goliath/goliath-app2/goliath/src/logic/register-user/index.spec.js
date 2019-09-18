{
    const { random } = Math

    describe('logic - register user', () => {
        let user, credentials

        beforeEach(() =>
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                instrument: 'description' + random(),
                description : 'description' + random(),
                email: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
        
            

            }
        )

        it('should succeed on correct data', () =>
            logic.registerUser(user.name, user.surname,user.instrument, user.description, user.email, user.password, user.password)
                .then(() => call('"http://localhost:8080/api/users"', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password }))
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)
                    else {
                        credentials = response.data

                        return call(`"http://localhost:8080/api/users"/${credentials.id}`, 'get', { 'authorization': `bearer ${credentials.token}` }, undefined)
                    }
                })
                .then(response => {
                    const _user = response.data

                    expect(_user.name).toBe(user.name)
                    expect(_user.surname).toBe(user.surname)
                    expect(_user.email).toBe(user.email)
                    expect(_user.instrument).toBe(user.instrument)
                    expect(_user.description).toBe(user.description)
                    expect(_user.password).toBeUndefined()
                    expect(_user.id).toBe(credentials.id)
                    expect(_user.favorites).toBeDefined()
                    expect(_user.favorites).toEqual(user.favorites)
                })
        )

        it('should fail on empty name', () =>
            expect(() =>
                logic.registerUser('', 'doe', 'johndoe@gmail.com', '123', '123')
            ).toThrowError(Error, 'name is empty or blank')
        )

        it('should fail on non-valid username', () =>
            expect(() =>
                logic.registerUser('John', 'doe', 'johndoe#gmail.com', '123', '123')
            ).toThrowError(Error, 'username with value johndoe#gmail.com is not a valid e-mail')
        )

        it('should fail on non-matching re-password', () =>
            expect(() =>
                logic.registerUser('John', 'doe', 'johndoe@gmail.com', '123', '456')
            ).toThrowError(Error, 'passwords do not match')
        )

        

        describe('when user already exists', () => {
            it('should fail on already existing username', () =>
                logic.registerUser(user.name, user.surname,user.instrument, user.description, user.email, user.password, user.password)
                    .catch(error => expect(error).toBeUndefined())
                    .then(() => logic.registerUser(user.name, user.surname,user.instrument, user.description, user.email, user.password, user.password))
                    .catch(error => expect(error).toBeDefined())
            )

           
        })
    })
}