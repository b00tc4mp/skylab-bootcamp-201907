{
    const { random } = Math
    const wonderwall = '5wj4E6IsrVtn8IBJQOd0Cl'
    const iNeedMyGirl = '7rbCL7W893Zonbfnevku5s'

    describe('logic - retrieve tracks', () => {
        describe('when the user logged', () => {
            beforeEach(() => {
                user = {
                    name: 'Joaquin-' + random(),
                    surname: 'Sabina-' + random(),
                    username: 'joasab-' + random(),
                    password: '123-' + random(),
                    favorites: []
                }
            })

            describe('when are you retrieve for a song', () => {

                let credentials

                beforeEach(() => {
                    user.favorites.push(wonderwall, iNeedMyGirl)

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

                it('should retrieve items to tracks', () => 
                logic.retrieveTrack(credentials.id, credentials.token, '5wj4E6IsrVtn8IBJQOd0Cl')
                    .then(track => {
                        expect(track.url).toBeDefined()
                        expect(track.linkAlbum).toBeDefined()
                        expect(track.nameAlbum).toBeDefined()
                        expect(track.releaseDate).toBeDefined()
                        expect(track.linkkArtist).toBeDefined()
                        expect(track.nameArtist).toBeDefined()
                        expect(track.explicit).toBeDefined()
                        expect(track.linkTrack).toBeDefined()
                        expect(track.idTrack).toBeDefined()
                        expect(track.nameTrack).toBeDefined()
                        expect(track.popularity).toBeDefined()
                        expect(track.previewUrl).toBeDefined()
                    })
                )

                it('should retrieve a song determinate', () => {
                    return logic.retrieveTrack(credentials.id, credentials.token, '5wj4E6IsrVtn8IBJQOd0Cl')
                    .then(track => {
                        expect(track).toBeDefined()
                        expect(track.nameTrack).toBe('Wonderwall - Remastered')
                        expect(track instanceof Object).toBeTruthy()
                        expect(Object.keys(track).length).toBe(13)
                    })
                })

                it('should retrieve a song determinate', () => {
                    return logic.retrieveTrack(credentials.id, credentials.token, '7rbCL7W893Zonbfnevku5s')
                    .then(track => {
                        expect(track).toBeDefined()
                        expect(track.nameTrack).toBe('I Need My Girl')
                        expect(track instanceof Object).toBeTruthy()
                        expect(Object.keys(track).length).toBe(13)
                    })
                })
            })

        describe('when the user not logged', () => {
            it('should retrieve track', () => 
                logic.retrieveTrack(undefined, undefined, '5wj4E6IsrVtn8IBJQOd0Cl')
                    .then(track => {
                        expect(track).toBeDefined()
                        expect(track.nameTrack).toBe('Wonderwall - Remastered')
                        expect(track instanceof Object).toBeTruthy()
                        expect(Object.keys(track).length).toBe(12)
                    })
            )
            it('should retrieve items to tracks', () => 
                logic.retrieveTrack(undefined, undefined, '5wj4E6IsrVtn8IBJQOd0Cl')
                    .then(track => {
                        expect(track.url).toBeDefined()
                        expect(track.linkAlbum).toBeDefined()
                        expect(track.nameAlbum).toBeDefined()
                        expect(track.releaseDate).toBeDefined()
                        expect(track.linkkArtist).toBeDefined()
                        expect(track.nameArtist).toBeDefined()
                        expect(track.explicit).toBeDefined()
                        expect(track.linkTrack).toBeDefined()
                        expect(track.idTrack).toBeDefined()
                        expect(track.nameTrack).toBeDefined()
                        expect(track.popularity).toBeDefined()
                        expect(track.previewUrl).toBeDefined()
                    }
            ))

            it('should return error: song with value is not a string', () => 
                expect( () =>
                    logic.retrieveTrack(undefined, undefined, 24324532)
                ).toThrowError('song with value 24324532 is not a string')
            )
        })
    })

    })
}