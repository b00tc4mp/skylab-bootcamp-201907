const retrieveDuck = require('.')
const { call } = require('../../utils')

const { random } = Math

describe('logic - retrieve duck', () => {
    let user

    beforeEach(() =>
        user = {
            name: 'John-' + random(),
            surname: 'Doe-' + random(),
            username: 'johndoe-' + random() + '@mail.com',
            password: '123-' + random(),
            favorites: []
        }
    )

    it('should succeed on valid duck id', () => {
        const id = '5c3853aebd1bde8520e66ee8'

        return retrieveDuck(undefined, undefined, id)
            .then(duck => {
                expect(duck).toBeDefined()
                expect(duck.id).toBe(id)
                expect(duck.title).toBeDefined()
                expect(duck.imageUrl).toBeDefined()
                expect(duck.price).toBeDefined()
                expect(duck.link).toBeDefined()
                expect(duck.favorite).toBeUndefined()
            })
    })

    it('should fail on non valid duck id', () => {
        const id = '5c3853aebd1bde8520e66ff9'

        return retrieveDuck(undefined, undefined, id)
            .then(duck => expect(duck).toBeUndefined())
            .catch(error => expect(error).toBeDefined())
    })

    // TODO test more cases

    describe('when user already has a favorite duck', () => {
        const id = '5c3853aebd1bde8520e66e97'

        let credentials

        beforeEach(() => {
            user.favorites.push(id)

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

        it('should succeed on valid id', () =>
            retrieveDuck(credentials.id, credentials.token, id)
                .then(duck => {
                    expect(duck).toBeDefined()
                    expect(duck.id).toBe(id)
                    expect(duck.title).toBeDefined()
                    expect(duck.imageUrl).toBeDefined()
                    expect(duck.price).toBeDefined()
                    expect(duck.link).toBeDefined()
                    expect(duck.favorite).toBeTruthy()
                })
        )

        it('should fail on non valid id', () => {
            const id = '5c3853aebd1bde8520e66ff9'

            return retrieveDuck(credentials.id, credentials.token, id)
                .then(duck => expect(duck).toBeUndefined())
                .catch(error => expect(error).toBeDefined())
        })

        // TODO test more cases
    })
})