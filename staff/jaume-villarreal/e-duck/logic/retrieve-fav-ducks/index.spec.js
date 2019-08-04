{
    const { random } = Math

    fdescribe('logic - retrieve favorite ducks', () => {
        let user, data

        beforeEach(done => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }

            user.favorites.push('5c3853aebd1bde8520e66e97', '5c3853aebd1bde8520e66ee8', '5c3853aebd1bde8520e66ec4')

            return call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' } , user)
                .then(response => {
                    if (response.status === "KO") throw new Error (response.error)
                    else return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                })
                .then(response => {
                    if (response.status === "KO") throw new Error(response.error)
                
                    data = response.data
                    done()
            })
        })

        fit('should succeed on previously added fav ducks', done => 
            logic.retrieveFavDucks(data.id, data.token)
                .then(ducks => {
                    console.log(ducks)

                    expect(ducks).toBeDefined()
                    expect(ducks.length).toBe(3)

                    ducks.forEach(({ id, title, imageUrl, price, description, link, favorite }) => {
                        expect(id).toBeDefined()
                        expect(title).toBeDefined()
                        expect(imageUrl).toBeDefined()
                        expect(price).toBeDefined()
                        expect(description).toBeDefined()
                        expect(link).toBeDefined()
                        expect(favorite).toBeTruthy()

                        const { favorites } = user
                        expect(favorites.includes(id)).toBeTruthy()
                        done()
                    })
                })
                .catch(error => {
                    console.log('error' , error)
                    expect(error).toBeDefined()
                    done()
                })
        
        )

        it('should fail on empty id' , () =>
                expect( () => 
                    logic.retrieveFavDucks('' , 'a-token')
                ).toThrowError(Error , 'id is empty or blank')
            )

        
        it('should fail on empty token' , () => 
            expect( () => 
                logic.retrieveFavDucks('a-id' , '')
            ).toThrowError (Error , 'token is empty or blank')
        )
    })
}

// TODO test more cases