{

    const { random } = Math

    describe('logic - search ducks', () => {
        let user

        user = {
            name: 'John-' + random(),
            surname: 'Doe-' + random(),
            username: 'johndoe-' + random() + '@mail.com',
            password: '123-' + random(),
            favorites: []
        }

        it('should succeed on matching criteria', done => {
            const query = 'white' // 12 results

            logic.searchDucks(undefined, undefined, query)
                .then(ducks =>  {
                    expect(ducks).toBeDefined()
                    expect(ducks instanceof Array).toBeTruthy()
                    expect(ducks.length).toBe(12)

                    ducks.forEach(duck => {
                        expect(duck.id).toBeDefined()
                        expect(duck.title).toBeDefined()
                        expect(duck.imageUrl).toBeDefined()
                        expect(duck.price).toBeDefined()
                })
                done()
            }).catch(error => {
                    expect(error).toBeDefined()
                    done()
                })
            })

        
        it('should get empty array on no matching criteria', done => {
            logic.searchDucks(undefined, undefined, 'patata')
                .then(ducks => {
                    expect(ducks).toBeDefined()
                    expect(ducks.length).toBe(0)
                    done()
                })

        })

        it('should fail on undefined query', () => {
            expect(() => logic.searchDucks()).toThrowError(TypeError, `query with value undefined is not a string`)
        })

    describe('when user already has favorite ducks', () => {
        let data

        beforeEach(done => {
            user.favorites.push('5c3853aebd1bde8520e66e99', '5c3853aebd1bde8520e66e8a', '5c3853aebd1bde8520e66e70')

            return call('https://skylabcoders.herokuapp.com/api/user', 'post',
                { 'content-type': 'application/json' },
                user)
                    .then(() => call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                        { 'content-type': 'application/json' },
                        { username: user.username, password: user.password }))
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                        else {
                            data = response.data
                            done()
                        }
                    })
                    .catch(error => done(error))
        })
                    
        it('should succeed on matching criteria', done => {
            const query = 'white' // 12 results

            debugger
            logic.searchDucks(data.id, data.token, query)
                .then(ducks => {
                    expect(ducks).toBeDefined()
                    expect(ducks instanceof Array).toBeTruthy()
                    expect(ducks.length).toBe(12)

                    let favorites = 0

                    ducks.forEach(duck => {
                        expect(duck.id).toBeDefined()
                        expect(duck.title).toBeDefined()
                        expect(duck.imageUrl).toBeDefined()
                        expect(duck.price).toBeDefined()

                        duck.favorite && favorites++
                    })

                    expect(favorites).toBe(user.favorites.length)
                    done()
                })
                .catch(error => {
                    expect(error).toBeDefined()
                    done()
                })
            })
        })
    })
}
