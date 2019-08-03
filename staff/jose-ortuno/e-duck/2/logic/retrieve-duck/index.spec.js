{
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000
    const { random } = Math

    fdescribe('logic - retrieve duck', () => {
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

        it('should succeed on valid duck id', done => {
            const id = '5c3853aebd1bde8520e66ee8'

            logic.retrieveDuck(undefined, undefined, id)
                .then(duck => {
                    expect(duck).toBeDefined()
                    expect(duck.id).toBe(id)
                    expect(duck.title).toBeDefined()
                    expect(duck.imageUrl).toBeDefined()
                    expect(duck.price).toBeDefined()
                    expect(duck.link).toBeDefined()
                    expect(duck.favorite).toBeUndefined()
                    done()
                })
            .catch(error => expect(error).toBeUndefined())
        })

        it('should fail on non valid duck id', done => {
            const id = '5c3853aebd1bde8520e66ff9'

            logic.retrieveDuck(undefined, undefined, id)
            .catch(error => {
                expect(error).toBeDefined()
                done()
            })

        })

        describe('when user already has a favorite duck', () => {
            const id = '5c3853aebd1bde8520e66e97'

            let data

            beforeEach(done => {
                user.favorites.push(id)

                return call('https://skylabcoders.herokuapp.com/api/user', 'post',
                    { 'content-type': 'application/json' },
                    user)
                    .then(()=> call('https://skylabcoders.herokuapp.com/api/auth', 'post',
                                        { 'content-type': 'application/json' },
                                        { username: user.username, password: user.password 
                    }))
                    .then(response => {
                        // if (response.error) throw new Error(response.error)
                        if (response.status === 'KO') throw new Error(response.error)
                        else {
                            data = response.data
                            done()
                        }
                    })
                })

            it('should succeed on valid id', done => {
                logic.retrieveDuck(data.id, data.token, id) 
                    .then(duck => {
                        expect(duck).toBeDefined()
                        expect(duck.id).toBe(id)
                        expect(duck.title).toBeDefined()
                        expect(duck.imageUrl).toBeDefined()
                        expect(duck.price).toBeDefined()
                        expect(duck.link).toBeDefined()
                        expect(duck.favorite).toBeTruthy()
    
                        done()
                    })
                    .catch(error => expect(error).toBeDefined())
                })
            
            it('should fail on non valid id', done => {
                const id = '5c3853aebd1bde8520e66ff9'
                
                logic.retrieveDuck(data.id, data.token, id)
                .then(duck => expect(duck).toBeUndefined())
                    .catch(error => {
                        expect(error).toBeDefined()

                        done()
                    })
                })
            })
    })
}
