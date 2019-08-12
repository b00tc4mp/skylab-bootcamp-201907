{
    const { random } = Math

    describe('logic - toggle favorite duck', () => {
        const duckId = '5c3853aebd1bde8520e66e97'

        let user, data

        beforeEach(done => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }

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

        it('should succeed on correct duck id', done => {
            logic.toggleFavDuck(data.id, data.token, duckId, error => {
                expect(error).toBeUndefined()

                call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                    { 'authorization': `bearer ${data.token}` },
                    undefined,
                    (error, response) => {
                        if (error) done(error)
                        else if (response.status === 'KO') done(new Error(response.error))
                        else {
                            const user = response.data

                            expect(user.id).toBe(data.id)

                            const { favorites } = user
                            expect(favorites).toBeDefined()
                            expect(favorites.length).toBe(1)

                            const [favorite] = favorites
                            expect(favorite).toBe(duckId)

                            done()
                        }
                    }
                )
            })
        })

        // TODO refactor
        // it('should fail on non existing id', () => {
        //     expect(() => logic.toggleFavDuck('invalid-id', data.token, id, () => {}))
        //         .toThrowError(Error, `user with username ${username} not found`)
        // })

        // TODO refactor
        // it('should fail non existing duck id', done => {
        //     const id = '5c3853aebd1bde8520e66ff9'

        //     logic.toggleFavDuck(username, id, error => {
        //         expect(error).toBeDefined()

        //         const { message } = error
        //         expect(message).toBe(`cannot retrieve duck with id ${id}`)

        //         done()
        //     })
        // })

        // TODO test more cases

        describe('when duck already in favorites', () => {
            const id = '5c3853aebd1bde8520e66e97'

            let data

            beforeEach(done => {
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: [id]
                }

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

            it('should succeed on correct duck id', done => {
                logic.toggleFavDuck(data.id, data.token, id, error => {
                    expect(error).toBeUndefined()

                    call(`https://skylabcoders.herokuapp.com/api/user/${data.id}`, 'get',
                        { 'authorization': `bearer ${data.token}` },
                        undefined,
                        (error, response) => {
                            if (error) done(error)
                            else if (response.status === 'KO') done(new Error(response.error))
                            else {
                                const user = response.data

                                expect(user.id).toBe(data.id)

                                const { favorites } = user
                                expect(favorites).toBeDefined()
                                expect(favorites.length).toBe(0)

                                done()
                            }
                        }
                    )
                })
            })

            // TODO test more cases
        })
    })
}