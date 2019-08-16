const toggleFavDuck = require('.')
const { call } = require('../../utils')

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

    it('should succeed on correct duck id', () =>
        toggleFavDuck(credentials.id, credentials.token, duckId)
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
    )

    // TODO refactor
    // it('should fail on non existing id', () => {
    //     expect(() => toggleFavDuck('invalid-id', data.token, id, () => {}))
    //         .toThrowError(Error, `user with username ${username} not found`)
    // })

    // TODO refactor
    // it('should fail non existing duck id', () => {
    //     const id = '5c3853aebd1bde8520e66ff9'

    //     toggleFavDuck(username, id, error => {
    //         expect(error).toBeDefined()

    //         const { message } = error
    //         expect(message).toBe(`cannot retrieve duck with id ${id}`)

    //         done()
    //     })
    // })

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

        it('should succeed on correct duck id', () =>
            toggleFavDuck(credentials.id, credentials.token, id)
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
        )

        // TODO test more cases
    })
})