{
    const { random } = Math

    describe('logic - toggle favorite meal', () => {
        const idMeal = '52959'

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

        it('should succeed on correct duck id', () =>
            logic.toggleFavMeal(credentials.id, credentials.token, idMeal)
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
                            expect(favorite).toBe(idMeal)
                        })
                )
        )

        describe('when meal is already a favorite', () => {
            const id = '52959'

            let credentials

            beforeEach(() => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: [id]
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

            it('should succeed on correct duck id', () =>
                logic.toggleFavMeal(credentials.id, credentials.token, id)
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