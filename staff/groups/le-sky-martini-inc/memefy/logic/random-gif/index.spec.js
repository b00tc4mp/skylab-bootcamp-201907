{
    const { random } = Math

    xdescribe('logic - random gif', () => {
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

        xit('should succeed on valid gif id', () => {
            const id = 'GpyS1lJXJYupG'

            return logic.randomGif(undefined, undefined, id)
                .then(gif => {
                    expect(gif).toBeDefined()
                    expect(gif.data.id).toBeDefined()
                    expect(gif.data.title).toBeDefined()
                    expect(gif.data.images.downsized_large.url).toBeDefined()
                })
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
                logic.randomGif(data.id, data.token, id)

                    .then(gif => {
                        expect(gif).toBeDefined()
                        expect(gif.data.id).toBe("GpyS1lJXJYupG")
                        expect(gif.data.title).toBeDefined()
                        expect(gif.favorite).toBeTruthy()
                    })
            )

            it('should fail on non valid id', () => {
                const id = '5c3853aebd1bde8520hhhe66ff9'

                return logic.randomGif(data.data.id, data.token, id)
                    .then(gif => expect(gif.data.id).toBeUndefined())
                    .catch(error => expect(error).toBeDefined())
            })
        })
    })
}