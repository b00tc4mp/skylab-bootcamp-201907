const { validate, call } = require('../../utils')
const toggleFavDuck = require('.')

const { random } = Math

describe('logic - toggle favorite duck', () => {
    const duckId = '5c3853aebd1bde8520e66e97'

    let user, credentials

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

                return call('https://skylabcoders.herokuapp.com/api/auth', 'post', { 'content-type': 'application/json' }, { username: user.username, password: user.password })
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)

                        credentials = response.data
                    })
            })
    })

    it('should succeed on correct duck id', () => {
        return toggleFavDuck(credentials.id, credentials.token, duckId)
            .then(() =>
                call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}`, 'get', { 'authorization': `bearer ${credentials.token}` }, undefined)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)

                        const user = response.data

                        expect(user.id).toBe(credentials.id)

                        const { favorites } = user
                        expect(favorites).toBeDefined()
                        expect(favorites.length).toBe(1)

                        const [favorite] = favorites
                        expect(favorite).toBe(duckId)
                    })
            )
    })

    // TODO test more cases

    describe('when duck already in favorites', () => {
        const id = '5c3853aebd1bde8520e66e97'

        let credentials

        beforeEach(() => {
            user = {
                name: 'John-' + random(),
                surname: 'Doe-' + random(),
                username: 'johndoe-' + random() + '@mail.com',
                password: '123-' + random(),
                favorites: [id]
            }

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

        it('should succeed on correct duck id', () => {
            return toggleFavDuck(credentials.id, credentials.token, id)
                .then(() =>
                    call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}`, 'get', { 'authorization': `bearer ${credentials.token}` }, undefined)
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)

                            const user = response.data

                            expect(user.id).toBe(credentials.id)

                            const { favorites } = user
                            expect(favorites).toBeDefined()
                            expect(favorites.length).toBe(0)
                        })
                )
        })

        // TODO test more cases
    })
})
