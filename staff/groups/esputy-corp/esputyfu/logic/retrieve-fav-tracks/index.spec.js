{
    const { random } = Math
    const wonderwall = '5wj4E6IsrVtn8IBJQOd0Cl'
    const iNeedMyGirl = '7rbCL7W893Zonbfnevku5s'

    describe('logic - retrieve fav tracks', () => {
        describe('when are you retrieve for a favorites', () => {
            let credentials

            beforeEach(() => {
                user = {
                    name: 'Miguel-' + random(),
                    surname: 'Bose-' + random(),
                    username: 'mibo-' + random(),
                    password: '123-' + random(),
                    favorites: []
                }

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

            it('should succeed on matching criteria', () => 
                logic.retrieveFavTracks(credentials.id, credentials.token)
                    .then(songs => {
                        expect(songs).toBeDefined()
                        expect(songs instanceof Array).toBeTruthy()
                        expect(songs.length).toBe(2)

                        songs.forEach(track => {
                            expect(track.favorite).toBeDefined()
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
                    })
            )
        })
    })
}