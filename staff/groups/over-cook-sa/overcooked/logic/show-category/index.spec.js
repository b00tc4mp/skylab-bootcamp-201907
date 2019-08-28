{
    const { random } = Math

    describe('Show meals by categories', () => {
        let user

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }


            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)
                })
                .then(() => {
                    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)

                            return data = response.data
                        })
                })
        })

        it('should succeed on matching criteria', () => {
            const query = 'Seafood' // 19 results

            return logic.showCategory(data.id, data.token, query)
                .then(items => {
                    expect(items).toBeDefined()
                    expect(items instanceof Array).toBeTruthy()
                    expect(items.length).toBe(19)
                })
        })

        it('should get empy array on no matching criteria', () =>
            logic.showCategory(data.id, data.token, 'pepiemonte')
                .then(items => expect(items.length).toBe(0))
        )

        it('should fail on undefined query', () =>
            expect(() => logic.showCategory(data.id, data.token)).toThrowError(TypeError, `query with value undefined is not a string`)
        )

    })

    describe('when user already has favorite plates', () => {
        let credentials
        let user

    beforeEach(() => {
        user = {
            name: 'John-' + random(),
            surname: 'Doe-' + random(),
            username: 'johndoe-' + random() + '@mail.com',
            password: '123-' + random(),
            favorites: []
        }
            user.favorites.push('52887', '52823')

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, user)
                .then(response => {
                    if (response.status === 'KO') throw new Error(response.error)

                    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)
                            return credentials = response.data
                        })
                })
    })
                
        it('should succeed on matching criteria', () => {
            const query = "Seafood" // 19 results // 2 favorites
                    
            return logic.showCategory(credentials.id, credentials.token, query)
                .then(items => {
                    expect(items).toBeDefined()
                    expect(items instanceof Array).toBeTruthy()
                    expect(items.length).toBe(19)
        
                    let favorites = 0

                    items.forEach(meal => {
                    
                        expect(meal.idMeal).toBeDefined()
                        if(meal.favorite){
                            favorites++
                        }
                    })
                    expect(favorites).toBe(user.favorites.length)
                })
        })
    })
}