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

        // TODO test more cases

        xdescribe('when user already has a favorite duck', () => {
            const track_id = '5c3853aebd1bde8520e66e97'

            let credentials

            beforeEach(() => {
                user.favorites.push(id)

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

            it('should succeed on valid id', () =>
                logic.retrieveDuck(credentials.id, credentials.token, track_id)
                    .then(duck => {
                        expect(duck).toBeDefined()
                        expect(duck.id).toBe(id)
                        expect(duck.title).toBeDefined()
                        expect(duck.imageUrl).toBeDefined()
                        expect(duck.price).toBeDefined()
                        expect(duck.link).toBeDefined()
                        expect(duck.favorite).toBeTruthy()
                    })
            )

            it('should fail on non valid id', () => {
                const id = '5c3853aebd1bde8520e66ff9'

                return logic.retrieveDuck(credentials.id, credentials.token, id)
                    .then(duck => expect(duck).toBeUndefined())
                    .catch(error => expect(error).toBeDefined())
            })

            // TODO test more cases
        })
    })
}