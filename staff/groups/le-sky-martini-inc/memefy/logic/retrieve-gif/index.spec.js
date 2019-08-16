{
    const { random } = Math

    describe('logic - retrieve gif', () => {
        let user

        beforeEach(() =>
            user = {
                name: 'LePink-' + random(),
                surname: 'Martini-' + random(),
                username: 'teamwork-' + random() + '@mail.com',
                password: 'zzz-' + random(),
                favorites: []
            }
        )

        it('should succeed on valid gif id', () => {
            const id = 'GpyS1lJXJYupG'

            return logic.retrieveGif(undefined, undefined, id)
                .then(gif => {
                    expect(gif).toBeDefined()
                    expect(gif.data.id).toBe(id)
                    expect(gif.data.title).toBeDefined()
                    expect(gif.data.images.downsized_large.url).toBeDefined()
                    expect(gif.favorite).toBeUndefined()
                })
        })

        it('should fail on non valid gif id', () => {
            const id = 'YEvLXxxxxxxxxDb2n3QR2'

            return logic.retrieveGif(undefined, undefined, id)
                .then(gif => expect(gif.id).toBeUndefined())
                .catch(error => expect(error).toBeDefined())
        })

        describe('when user already has a favorite gif', () => {
            const id = 'GpyS1lJXJYupG'

            let data

            beforeEach(() => {
                user.favorites.push(id)
                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)

                        return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                            .then(response => {
                                if (response.status === 'KO') throw new Error(response.error)

                                data = response.data
                            })
                    })
            })

            it('should succeed on valid id', () =>
                logic.retrieveGif(data.id, data.token, id)
                    .then(gif => {
                        expect(gif).toBeDefined()
                        expect(gif.data.id).toBe(id)
                        expect(gif.data.title).toBeDefined()
                        expect(gif.favorite).toBeTruthy()
                    })
            )

            it('should fail on non valid id', () => {
                const id = '5c3853aebd1bde8520hhhe66ff9'

                return logic.retrieveGif(data.id, data.token, id)
                    .then(gif => expect(gif.id).toBeUndefined())
                    .catch(error => expect(error).toBeDefined())
            })
        })
    })
}