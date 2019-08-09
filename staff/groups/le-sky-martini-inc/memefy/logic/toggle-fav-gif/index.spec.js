{
    const { random } = Math

    describe('logic - toggle favorite gif', () => {
        const gifId = '3o6nV5VC6LwwZdDzXO'

        let user, credentials

        beforeEach(() => {
            user = {
                name: 'LePink-' + random(),
                surname: 'Martini-' + random(),
                username: 'teamwork-' + random() + '@mail.com',
                password: 'zzz-' + random(),
                favorites: []
            }

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)

                    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)

                            credentials = response.data
                        })
                })
        })

        it('should succeed on correct gif id', () =>
            logic.toggleFavGif(credentials.id, credentials.token, gifId)
                .then(() =>
                    call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}`, 'get', { 'authorization': `bearer ${credentials.token}` }, undefined)
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)

                            const user = response.data

                            expect(user.id).toBe(credentials.id)

                            const { favorites } = user
                            expect(favorites).toBeDefined()
                            expect(favorites.length).toBe(1)

                            const [favorite] = favorites
                            expect(favorite).toBe(gifId)
                        })
                )
        )

    
         it('should fail on non existing id', () =>
             logic.toggleFavGif('invalid-id', credentials.token, credentials.id)
             .then(response => expect(response).toBeDefined())
             .catch(error => expect(error).toBeDefined())
         )

        describe('when gif already in favorites', () => {
            const gifId = 'GpyS1lJXJYupG'

            let credentials

            beforeEach(() => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: [gifId]
                }

                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)

                        return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)

                                credentials = response.data
                            })
                    })
            })

            it('should succeed on correct gif id', () =>
                logic.toggleFavGif(credentials.id, credentials.token, gifId)
                    .then(() =>
                        call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}`, 'get', { 'authorization': `bearer ${credentials.token}` }, undefined)
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)

                                const user = response.data

                                expect(user.id).toBe(credentials.id)

                                const { favorites } = user
                                expect(favorites).toBeDefined()
                                expect(favorites.length).toBe(0)
                            })
                    )
            )



        })
    })
}