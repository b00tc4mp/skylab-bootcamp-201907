{
    const { random } = Math

    describe('logic - search lyrics', () => {
        let user

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }
        })

        it('should succeed on matching song title and artist', done => {
            const apikey= 'e492562d27469098b0922d5d580837eb'
            const q_artist = 'aerosmith'
            const q_track = 'dude looks like a lady'

        
        })

        it('should get an empty array on no matching criteria', done => {
            const apikey= 'e492562d27469098b0922d5d580837eb'
            const q_artist= 'grtiuudkfhkdgh'
            const q_track= 'kurutosjfodik'

            logic.searchSongs(undefined, undefined, q_artist, q_track, (songs) => {
                // expect(error).toBeUndefined()

                expect(message.header.status_code).toBe('200')

                // expect(songs).toBeDefined()
                // expect(songs.length).toBe(0)

                expect(message.body.track_list).toBeDefined()
                expect(message.body.track_list.length).toBe(0)
                
                done()
            })
        })

        it('should launch an error message on undefined artist', () => {
            expect(() => logic.searchDucks()).toThrowError(TypeError, `query with value undefined is not a string`)
        })

        it('should launch an error message on undefined song title', () => {
            expect(() => logic.searchDucks(undefined, undefined, 'something')).toThrowError(TypeError, `expression with value undefined is not a function`)
        })

        it('should launch an error message on undefined artist and song title', () => {
            expect(() => logic.searchDucks(undefined, undefined, 'something')).toThrowError(TypeError, `expression with value undefined is not a function`)
        })

        // TODO test more cases

        describe('when user already has favorite songs', () => {
            let data

            beforeEach(done => {
                user.favorites.push('5c3853aebd1bde8520e66e99', '5c3853aebd1bde8520e66e8a', '5c3853aebd1bde8520e66e70')

                call('https://skylabcoders.herokuapp.com/api/user', 'post',
                    { 'content-type': 'application/json' },
                    user,
                    (error, response) => {
                        if (error) done(error)
                        else if (response.status === 'KO') done(new Error(response.error))
                        else call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                            { 'content-type': 'application/json' },
                            { username: user.username, password: user.password },
                            (error, response) => {
                                if (error) done(error)
                                else if (response.status === 'KO') done(new Error(response.error))
                                else {
                                    data = response.data

                                    done()
                                }
                            }
                        )
                    }
                )
            })

            it('should succeed on matching song title and artist', done => {
                const q_artist = 'aerosmith'
                const q_track = 'dude looks like a lady'

                // logic.searchDucks(data.id, data.token, query, (error, ducks) => {
                //     expect(error).toBeUndefined()

                //     expect(ducks).toBeDefined()
                //     expect(ducks instanceof Array).toBeTruthy()
                //     expect(ducks.length).toBe(12)

                //     let favorites = 0

                //     ducks.forEach(duck => {
                //         expect(duck.id).toBeDefined()
                //         expect(duck.title).toBeDefined()
                //         expect(duck.imageUrl).toBeDefined()
                //         expect(duck.price).toBeDefined()

                //         duck.favorite && favorites++
                //     })

                //     expect(favorites).toBe(user.favorites.length)

                //     done()
                })
            })
        })
    })
}