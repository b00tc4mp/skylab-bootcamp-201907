{
    const { random } = Math

    describe('logic - retrieve lyrics', () => {
        let user

        beforeEach(() =>
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }
        )

        it('should succeed on valid track_id', () => {
            const track_id = '30974361'

            return logic.retrieveLyrics(undefined, undefined, track_id)
                .then(lyrics => {
                    expect(lyrics).toBeDefined()
                    expect(lyrics).toBe("That, that dude looks like a lady\nThat, that dude looks like a lady\nThat, that dude looks like a lady\nThat, that dude looks like a lady\n\nCruised into a bar on the shore\nHer picture graced the grime on the door\nShe's a long lost love at first bite\nBaby, maybe you're wrong\nBut you know it's all right, that's right\n\nBack stage we're having the time\nOf our lives until somebody says\nForgive me if I seem out of line\nThen she whipped out a gun\nAnd tried to blow me away\n\nThat, that dude looks like a lady\nThat, that dude looks like a lady\n...\n\n******* This Lyrics is NOT for Commercial use *******\n(1409618543212)")
                })
                .catch(error => expect(error).toBeUndefined())
        })

        it('should fail on non valid track_id', () => {
            const track_id = '3097436a1'

            return logic.retrieveLyrics(undefined, undefined, track_id)
                .then(lyrics => {
                    expect(lyrics).toBeUndefined()
                    expect(res.message.header.status_code).toBe('401')
                })
                .catch(error => expect(error).toBeDefined())
        })

        it('should return a 404 on non existant track_id', () => {
            const track_id = '2039441'

            return logic.retrieveLyrics(undefined, undefined, track_id)
                .then(lyrics => {
                    expect(lyrics).toBeUndefined()
                    expect(res.message.header.status_code).toBe('404')
                })
                .catch(error => expect(error).toBeDefined())
        })

        describe('when user already has a favorite track', () => {
            const track_id = '30974362'

            let credentials

            beforeEach(() => {
                user.favorites.push(track_id)

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

            it('should succeed on valid track_id', () => {
                return logic.retrieveLyrics(undefined, undefined, track_id)
                    .then(lyrics => {
                        expect(lyrics).toBeDefined()
                        expect(lyrics).toBe("Here we are, born to be kings\nWe're the princes of the Universe\nHere we belong, fighting to survive\nIn a world with the darkest powers\n\nAnd here we are\nWe're the princes of the Universe\nHere we belong, fighting for survival\nWe've come to be the rulers of your world\n\nI am immortal\nI have inside me blood of kings\nI have no rival\nNo man can be my equal\nTake me to the future of your world\n\n...\n\n******* This Lyrics is NOT for Commercial use *******\n(1409618543212)")
                    })
                    .catch(error => expect(error).toBeUndefined())
                })

            it('should fail on non valid track_id', () => {
                const track_id = '3097436a1'

                return logic.retrieveLyrics(undefined, undefined, track_id)
                .then(lyrics => {
                    expect(lyrics).toBeUndefined()
                    expect(res.message.header.status_code).toBe('401')
                })
                .catch(error => expect(error).toBeDefined())
            })
        })
    })
}