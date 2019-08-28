{

    const {
        random
    } = Math

    describe('logic - get recipe by id', () => {

        const id = '52772'
        let user, data

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: []
            }

            user.favorites.push(id)

            return call(
                'https://skylabcoders.herokuapp.com/api/user',
                'post', {
                    'content-type': 'application/json'
                },
                user
            ).then(response => {
                if (response.status === 'KO') throw new Error(response.error)

                return call(
                    'https://skylabcoders.herokuapp.com/api/auth',
                    'post', {
                        'content-type': 'application/json'
                    }, {
                        username: user.username,
                        password: user.password
                    }
                ).then(response => {
                    if (response.status === 'KO') throw new Error(response.error)

                    data = response.data
                })
            })
        })

        it('should succeed on valid id, recipe in favorites', () =>
            logic.retrieveRecipe(data.id, data.token, id).then(recipe => {

                expect(recipe).toBeDefined()
                expect(recipe.idMeal).toBe(id)
                expect(recipe.strMeal).toBeDefined()
                expect(recipe.favorite).toBeTruthy()
            }))

        it('should succeed on valid id, recipe not in favorites', () =>
            logic.retrieveRecipe(data.id, data.token, '52775').then(recipe => {

                expect(recipe).toBeDefined()
                expect(recipe.idMeal).toBe('52775')
                expect(recipe.strMeal).toBeDefined()
                expect(recipe.favorite).toBeFalsy()
            })
        )

        it('should fail on non valid id', () => {
            const id = 'e66ff9'

            return logic
                .retrieveRecipe(data.id, data.token, id)
                .then(recipe => expect(recipe).toBeUndefined())
                .catch(error => expect(error).toBeDefined())
        })

        // TODO test more cases
    })
}