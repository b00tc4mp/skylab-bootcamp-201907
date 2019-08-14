{
    
    const { random } = Math
    
    describe('retrieve favorite ducks', () => {
        let data, user
        
        beforeEach(done => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }

            user.favorites.push('5c3853aebd1bde8520e66e97', '5c3853aebd1bde8520e66ee8', '5c3853aebd1bde8520e66ec4')

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

        it('should succeed on previously added fav ducks', done => {
            logic.retrieveFavoriteDucks(data.id, data.token, (error, ducks) => {
                expect(error).toBeUndefined()

                expect(ducks).toBeDefined()
                expect(ducks.length).toBe(3)

                ducks.forEach(({ id, title, imageUrl, price, description, link }) => {
                    expect(id).toBeDefined()
                    expect(title).toBeDefined()
                    expect(imageUrl).toBeDefined()
                    expect(price).toBeDefined()
                    expect(description).toBeDefined()
                    expect(link).toBeDefined()

                    const { favorites } = user
                    expect(favorites.includes(id)).toBeTruthy()
                })

                done()
            })
        })

        // TODO test more cases
    })
}