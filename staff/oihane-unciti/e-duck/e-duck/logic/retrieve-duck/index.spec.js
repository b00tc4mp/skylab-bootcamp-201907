{
    const { random } = Math

    describe('retrieve duck', () => {
        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }
        })
        
        it('should succeed on valid duck id', done => {
            const id = '5c3853aebd1bde8520e66ee8'

            logic.retrieveDuck(undefined, undefined, id, (error, duck) => {
                expect(error).toBeUndefined()

                expect(duck).toBeDefined()
                expect(duck.id).toBe(id)
                expect(duck.title).toBeDefined()
                expect(duck.imageUrl).toBeDefined()
                expect(duck.price).toBeDefined()
                expect(duck.link).toBeDefined()
                expect(duck.favorite).toBeUndefined()

                done()
            })
        })

        it('should fail on non valid duck id', done => {
            const id = '5c3853aebd1bde8520e66ff9'

            logic.retrieveDuck(undefined, undefined, id, (error, duck) => {
                expect(error).toBeDefined()
                expect(duck).toBeUndefined()

                done()
            })
        })

        // TODO test more cases

        describe('when user already has a favorite duck', () => {
            const id = '5c3853aebd1bde8520e66e97'

            let data

            beforeEach(done => {
                user.favorites.push(id)

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

            it('should succeed on valid id', done => {
                logic.retrieveDuck(data.id, data.token, id, (error, duck) => {
                    expect(error).toBeUndefined()

                    expect(duck).toBeDefined()
                    expect(duck.id).toBe(id)
                    expect(duck.title).toBeDefined()
                    expect(duck.imageUrl).toBeDefined()
                    expect(duck.price).toBeDefined()
                    expect(duck.link).toBeDefined()
                    expect(duck.favorite).toBeTruthy()

                    done()
                })
            })

            it('should fail on non valid id', done => {
                const id = '5c3853aebd1bde8520e66ff9'

                logic.retrieveDuck(data.id, data.token, id, (error, duck) => {
                    expect(error).toBeDefined()
                    expect(duck).toBeUndefined()

                    done()
                })
            })

            // TODO test more cases
        })
    })
}