{
    const { random } = Math

    describe('logic - toggle favorite track', () => {
        const trackId = '13040287'

        let user, credentials

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
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

        it('should fail on non existing trackId', () => {
            const trackId = '8a'
        
            return logic.toggleFavTrack(credentials.id, credentials.token, trackId)
            .then(res =>{
                expect(res).toBeDefined()
                        
                expect(res.header.status_code).toBe("404")
            }) 
            .catch(error => expect(error).toBeDefined()) 
        
        })
        

        describe('when track already in favorites', () => {
            const trackId = '13040287'

            let credentials

            beforeEach(() => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: [trackId]
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