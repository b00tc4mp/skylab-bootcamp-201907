{
    const { random } = Math

    describe('logic - toggle favorite track', () => {
        describe('when you do not have songs in favorites', () => {
            const trackId = '7rbCL7W893Zonbfnevku5s'

            let user, credentials

            beforeEach(() => {
                user = {
                    name: 'Pau-' + random(),
                    surname: 'Dones-' + random(),
                    username: 'paudo-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: []
                }

                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, JSON.stringify(user))
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)

                        return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, JSON.stringify({ username: user.username, password: user.password }))
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)

                                credentials = response.data
                            })
                    })
            })

            it('should succeed on correct track id', () =>
                logic.toggleFavTrack(credentials.id, credentials.token, trackId)
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
                                expect(favorite).toBe(trackId)
                            })
                    )
            )

        })

        describe('when you have a song in favorites', () => {
            const trackId = '7rbCL7W893Zonbfnevku5s'

            let user, credentials

            beforeEach(() => {
                user = {
                    name: 'Pau-' + random(),
                    surname: 'Dones-' + random(),
                    username: 'paudo-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: [trackId]
                }

                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, JSON.stringify(user))
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)

                        return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, JSON.stringify({ username: user.username, password: user.password }))
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)

                                credentials = response.data
                            })
                    })
            })


            it('should succeed on correct track id', () =>
                logic.toggleFavTrack(credentials.id, credentials.token, trackId)
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