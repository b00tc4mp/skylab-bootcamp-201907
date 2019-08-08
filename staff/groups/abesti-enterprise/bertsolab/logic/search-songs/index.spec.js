{
    const { random } = Math

    describe('logic - search songs', () => {
        let user

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Rambo-' + random(),
                username: 'johnrambo-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }
        })

        it('should succeed on matching song title and artist', () => {
            const q_artist = 'aerosmith'
            const q_track = 'dude looks like a lady'

            return logic.searchSongs(undefined, undefined, q_artist, q_track)
            .then(songs => {
                expect(songs instanceof Array).toBeTruthy()
                expect(songs).toBeDefined()
                expect(songs.length).toBe(8)

                songs.forEach(song => {
                    expect(song.track.track_id).toBeDefined()
                    expect(song.track.track_name).toBeDefined()
                    expect(song.track.album_name).toBeDefined()
                    expect(song.track.artist_name).toBeDefined()
                })
            }).catch(error => expect(error).toBeUndefined())
        })

        it('should get an empty array on no matching criteria', () => {
            const q_artist= 'grtiuudkfhkdgh'
            const q_track= 'kurutosjfodik'

            return logic.searchSongs(undefined, undefined, q_artist, q_track)
                .then(songs => {
                    expect(songs).toBeDefined()
                    expect(songs.length).toBe(0)

                }).catch(error => expect(error).toBeUndefined())
        })

        it('should launch an error message on undefined artist', () => {
            expect(() => logic.searchSongs(undefined, undefined, undefined)).toThrowError(TypeError, `query with value undefined is not a string`)
        })

        it('should launch an error message on undefined song title', () => {
            q_artist = 'aerosmith'
            expect(() => logic.searchSongs(undefined, undefined, q_artist, undefined)).toThrowError(TypeError, `query with value undefined is not a string`)
        })

        it('should launch an error message on undefined artist and song title', () => {
            const q_artist = undefined
            const q_track = undefined

            expect(() => logic.searchSongs(undefined, undefined, q_artist, q_track)).toThrowError(TypeError, `query with value undefined is not a string`)
        })

        it('should return an error on controlled artist alias', () => {
            const q_artist = 'areosmith'
            const q_track = 'dude looks like a lady'

            return logic.searchSongs(undefined, undefined, q_artist, q_track)
            .then(songs => {
                expect(songs instanceof Array).toBeTruthy()
                expect(songs).toBeDefined()
                expect(songs.length).toBe(7)

                songs.forEach(song => {
                    expect(song.track.track_id).toBeDefined()
                    expect(song.track.track_name).toBeDefined()
                    expect(song.track.album_name).toBeDefined()
                    expect(song.track.artist_name).toBeDefined()
                })
            }).catch(error => expect(error).toBeUndefined())
        })

        it('should return an empty array on uncontrolled typo', () => {
            const q_artist= 'abreosmith'
            const q_track= 'dude looks like a lady'

            return logic.searchSongs(undefined, undefined, q_artist, q_track)
                .then(songs => {
                    expect(songs).toBeDefined()
                    expect(songs.length).toBe(0)

                }).catch(error => expect(error).toBeUndefined())
        })

        

        describe('when user already has favorite songs', () => {
            let credentials

            beforeEach(() => {
                user.favorites.push('5c3853aebd1bde8520e66e99', '5c3853aebd1bde8520e66e8a', '5c3853aebd1bde8520e66e70')

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

            it('should succeed on matching song title and artist', () => {
                const q_artist = 'aerosmith'
                const q_track = 'dude looks like a lady'
    
                return logic.searchSongs(credentials.id, credentials.token, q_artist, q_track)
                .then(songs => {
                    expect(songs instanceof Array).toBeTruthy()
                    expect(songs).toBeDefined()
                    expect(songs.length).toBe(8)
    
                    songs.forEach(song => {
                        expect(song.track.track_id).toBeDefined()
                        expect(song.track.track_name).toBeDefined()
                        expect(song.track.album_name).toBeDefined()
                        expect(song.track.artist_name).toBeDefined()
                    })
                }).catch(error => expect(error).toBeUndefined())
            })
        })
    })
}