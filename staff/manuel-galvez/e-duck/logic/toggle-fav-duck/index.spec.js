{
    const { random } = Math

    describe('logic - toggle favorite duck', () => {
        const duckId = '5c3853aebd1bde8520e66e97'

        let user, data

        beforeEach(done => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }

            call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' },
                user)
                    .then(response => {
                        if (response.status === 'KO') throw Error(response.error)
                        else {
                            return call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                                { 'content-type': 'application/json' },
                                { username: user.username, password: user.password })
                    }})
                    .then(response => {
                        if (response.status === 'KO') throw Error(response.error)
                        else data = response.data
                        done()
                    })
                    .catch(error => error)
                })

        it('should succeed on correct duck id', done => {
            logic.toggleFavDuck(data.id, data.token, duckId)
                .then(() => {
                    return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                    { 'authorization': `bearer ${data.token}` },
                    undefined)})
                .then(response => {
                    if (response.status === 'KO') done(new Error(response.error))
                    else {
                        const user = response.data

                        expect(user.id).toBe(data.id)

                        const { favorites } = user
                        expect(favorites).toBeDefined()
                        expect(favorites.length).toBe(1)

                        const [favorite] = favorites
                        expect(favorite).toBe(duckId)

                        done()
                    }
                })
                .catch(error => expect(error).toBeDefined())
        })
    })

    describe('when duck already in favorites', () => {
        const id = '5c3853aebd1bde8520e66e97'

        let data

        beforeEach(done => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: [id]
            }

            call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' },
                user)
                .then(response => {
                    if (response.status === 'KO') done(Error(response.error))
                    else {
                        return call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                            { 'content-type': 'application/json' },
                            { username: user.username, password: user.password })
                    }})
                    .then(response => {
                        if (response.status === 'KO') done(Error(response.error))
                        else data = response.data
                        done()
                    })
                    .catch(error => error)
                })

            it('should succeed on correct duck id', done => {
                logic.toggleFavDuck(data.id, data.token, id)
                    .then(response => {
                        return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                            { 'authorization': `bearer ${data.token}` },
                            undefined)})
                    .then(response => {
                        if (response.status === 'KO') done(Error(response.error))
                        else {
                            const user = response.data
                            expect(user.id).toBe(data.id)

                            const { favorites } = user
                            expect(favorites).toBeDefined()
                            expect(favorites.length).toBe(0)
                            done()
                        }

                    })
                    .catch(error => expect(error).toBeDefined())
            })

        })
}