{
    const { random } = Math

    describe('logic - retrieve user', () => {
        let user, data

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, JSON.stringify(user))
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)
                    else return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, JSON.stringify({ username: user.username, password: user.password }))
                })
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)

                    data = response.data
                })
        })

        it('should succeed on matching user with username', () =>
            logic.retrieveUser(data.id, data.token)
                .then(_user => {
                    const { id, name, surname, username, password } = _user

                    expect(id).toBe(data.id)
                    expect(name).toBe(user.name)
                    expect(surname).toBe(user.surname)
                    expect(username).toBe(user.username)
                    expect(password).toBeUndefined()
                })
        )

        it('should fail on empty id', () =>
            expect(() =>
                logic.retrieveUser('', 'a-token')
            ).toThrowError(Error, 'id is empty or blank')
        )


    })
}