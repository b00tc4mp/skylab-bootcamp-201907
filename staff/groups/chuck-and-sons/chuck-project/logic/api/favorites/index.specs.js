{

    const { random } = Math

    describe('Get favorite ducks', () => {
        let user, credentials

        beforeEach(() => {
            user = {
                name: 'Chuck-' + random(),
                surname: 'Norris-' + random(),
                username: 'Chuck' + random() + '@gmail.com',
                password: '123',
                favorites: []
            }

            user.favorites.push("Y3XtQY1nQAWbZK9LCffH0A", "v04aFGwkRvyDfL65MsYSaQ", "dwxnerd8qamdgrzsl9aakq", "kh2dFDFJRh22lt0PXUFlRQ")

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

        it('should suceed on matching criteria', () => {
            const query = 'all'
            const { id, token } = credentials
            return logic.getFavoriteJokes(id, token, query)
                .then(jokes => {
                    expect(jokes).toBeDefined()
                    expect(jokes instanceof Array).toBeTruthy()
                    expect(jokes.length).toBe(4)

                    jokes.forEach(joke => {

                        expect(joke.categories).toBeDefined()
                        expect(joke.categories instanceof Array).toBeTruthy()
                        expect(joke.created_at).toBeDefined()
                        expect(joke.icon_url).toBeDefined()
                        expect(joke.id).toBeDefined()
                        expect(joke.updated_at).toBeDefined()
                        expect(joke.url).toBeDefined()
                        expect(joke.value).toBeDefined()
                        expect(typeof joke.value).toBe('string')

                        expect(user.favorites.includes(joke.id)).toBeTruthy()
                    })


                })

        })



    })

    describe('ERROR case', () => {
        let user, credentials

        beforeEach(() => {
            user = {
                name: 'Chuck-' + random(),
                surname: 'Norris-' + random(),
                username: 'Chuck' + random() + '@gmail.com',
                password: '123',
                favorites: []
            }

            user.favorites.push('12345-' + random())

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

        it('should fail onn non existing id', () => {
            const { id, token } = credentials
            const query = 'all'

            return logic.getFavoriteJokes(id, token, query)
                .then(res => {
                    expect(res).toBeUndefined()
                })
                .catch(error => { expect(error.message).toBe('Not Found') })
        })

    })


}