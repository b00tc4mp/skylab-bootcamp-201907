{
    const { random } = Math

    describe('logic - retrieve favorite gifs', () => {
        let user, credentials

        beforeEach(() => {
            user = {
                name: 'LePink-' + random(),
                surname: 'Martini-' + random(),
                username: 'teamwork-' + random() + '@mail.com',
                password: 'zzz-' + random(),
                favorites: []
            }

            user.favorites.push('GpyS1lJXJYupG', 'qg5pk8s2h5kJy', 'l0MYFKSkOwGsoS30A')

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

        it('should succeed on previously added fav gifs', () =>
            logic.retrieveFavGifs(credentials.id, credentials.token)
                .then(gifs => {
                    expect(gifs).toBeDefined()
                    expect(gifs.length).toBe(3)

                    gifs.forEach(({ data: { id, title, images, url}, favorite }) => {
                        expect(id).toBeDefined()
                        expect(title).toBeDefined()
                        expect(images.downsized_large.url).toBeDefined()
                        expect(url).toBeDefined()
                        expect(favorite).toBeDefined()

                        const { favorites } = user
                        expect(favorites.includes(id)).toBeTruthy()
                    })
                })
        )
    })
}