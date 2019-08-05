{

    const {
        random
    } = Math



    describe('search by name', () => {
        let user, credentials

        beforeEach(() => {

            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }


            user.favorites.push('52771', '52937', '52962')

            return call('https://skylabcoders.herokuapp.com/api/user', 'post', {
                    'content-type': 'application/json'
                }, user)
                .then(response => {

                    if (response.status === 'KO') throw new Error(response.error)

                    return call('https://skylabcoders.herokuapp.com/api/auth', 'post', {
                            'content-type': 'application/json'
                        }, {
                            username: user.username,
                            password: user.password
                        })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)

                            credentials = response.data
                        })
                })

        })

        it('should return recipe data on correct query', () => {
            let query = 'Arrabiata'

            return logic.searchByName(credentials.id, credentials.token, query)
                .then(meals => {

                    expect(meals[0].idMeal).toBeDefined()
                    expect(meals[0].strMeal).toBeDefined()
                    expect(user.favorites[0]).toBe('52771')
                })
        })

        it('should add a favorite key with a value of true if search recipe was in users favorites list', () => {
            let query = 'Arrabiata'

            return logic.searchByName(credentials.id, credentials.token, query)
                .then(meals => {

                    expect(meals[0].favorite).toBeDefined()
                    expect(meals[0].favorite).toBe(true)

                })
        })

        it('should add a favorite key with a value of true if search recipe was in users favorites list', () => {
            let query = 'Orange'

            return logic.searchByName(credentials.id, credentials.token, query)
                .then(meals => {

                    expect(meals[0].favorite).toBeDefined()
                    expect(meals[0].favorite).toBe(false)

                })
        })

        it('should return null on unknown query', () => {
            let query = '3421re'
            return logic.searchByName(credentials.id, credentials.token, query)
                .catch(error =>
                    expect(error.message).toBe('No meals found'))
        })

    })


}