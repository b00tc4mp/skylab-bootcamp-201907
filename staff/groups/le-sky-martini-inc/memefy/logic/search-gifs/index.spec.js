{
    const { random } = Math

    describe('logic - search gifs', () => {
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

        it('should succeed on matching criteria', () => {
            const query = 'white' 

            return logic.searchGifs(undefined, undefined, query)
                .then(gifs => {
                    expect(gifs).toBeDefined()
                    expect(gifs instanceof Array).toBeTruthy()
                    expect(gifs.length).toBe(25) // stablished limit on query! :-)

                    gifs.forEach(gif => {
                        expect(gif.id).toBeDefined()
                        expect(gif.title).toBeDefined()
                        expect(gif.images.downsized_large.url).toBeDefined()
                    })
                })
        })

        it('should get empy array on no matching criteria', () =>
            logic.searchGifs(undefined, undefined, 'sdgsdfhui')
                .then(gifs => expect(gifs.length).toBe(0))
        )

        it('should fail on undefined query', () =>
            expect(() => logic.searchGifs()).toThrowError(TypeError, `query with value undefined is not a string`)
        )

        // it('should fail on empty query', () =>
        //     expect(() => logic.searchGifs('')).toThrowError(TypeError, `query is empty or blank`)
        // )




        

        describe('when user already has favorite gifs', () => {
            let credentials

            beforeEach(() => {
                user.favorites.push('IoSE0hXjv5voc', '12O8iY6QuhWAwM', 'JFDoXMoG8lpVS')

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

            it('should succeed on matching criteria', () => {
                const query = 'white'

                return logic.searchGifs(credentials.id, credentials.token, query)
                    .then(gifs => {
                        expect(gifs).toBeDefined()
                        expect(gifs instanceof Array).toBeTruthy()
                        expect(gifs.length).toBe(25) // our API limit

                        let favorites = 0

                        gifs.forEach(gif => {
                            expect(gif.id).toBeDefined()
                            expect(gif.title).toBeDefined()
                            expect(gif.images.downsized_large.url).toBeDefined()
                            expect(gif.url).toBeDefined()

                            gif.favorite && favorites++
                        })

                        expect(favorites).toBeDefined()
                    })
            })
        })
    })
}