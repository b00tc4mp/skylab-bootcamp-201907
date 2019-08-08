{ 
    const { random }= Math

    describe('logic - toggle fav movie', () => {
        let user

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
                })
                .then(() => {
                    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)
                                data = response.data
                        })
                })
            })

        it('should succeed on correct data', () => {
            return logic.toggleFavMovie(data.id, data.token, '680')
                .then(response => {

                    /* We need to retrieve user to check movieId was added to users' favorites */
                    return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                    { 'authorization': `bearer ${data.token}` },
                    undefined)
                        .then(response => {
                            const retrievedUser = response.data
                            expect(retrievedUser.id).toBe(data.id)
                            expect(retrievedUser.favorites instanceof Array).toBeTruthy()
                            expect(retrievedUser.favorites.length).toBe(1)
                            expect(retrievedUser.favorites[0]).toBe('680')
                        })
                    })
            })

        
            describe('when user has already favorites', () => {
            let user
            const movieId = '680'

            beforeEach(() => {

                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: [movieId]
                }

                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                    })
                    .then(() => {
                        return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                    })
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                        data = response.data
                    })


            })


            it('should succeed on correct data',  () => {
                return logic.toggleFavMovie(data.id, data.token, movieId)
                    .then(() => {
                        return call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                        { 'authorization': `bearer ${data.token}` },
                        undefined)
                            .then(response => {
                                const user = response.data
                                expect(user.id).toBe(data.id)
                                expect(user.favorites instanceof Array).toBeTruthy()
                                expect(user.favorites.length).toBe(0)
                                expect(user.favorites.includes(movieId)).toBeFalsy()
                        })
                    })
            })
        })
    })
}