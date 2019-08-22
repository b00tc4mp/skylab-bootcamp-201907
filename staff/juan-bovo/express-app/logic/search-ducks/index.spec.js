const searchDucks = require('.')
const { call } = require('../../utils')

const { random } = Math

describe('logic - search ducks', () => {
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

    it('should succeed on matching criteria', () => {
        const query = 'white' // 12 results

        return searchDucks(undefined, undefined, query)
            .then(ducks => {
                expect(ducks).toBeDefined()
                expect(ducks instanceof Array).toBeTruthy()
                expect(ducks.length).toBe(12)

                ducks.forEach(duck => {
                    expect(duck.id).toBeDefined()
                    expect(duck.title).toBeDefined()
                    expect(duck.imageUrl).toBeDefined()
                    expect(duck.price).toBeDefined()
                })
            })
    })

    it('should get empy array on no matching criteria', () =>
        searchDucks(undefined, undefined, 'patata')
            .then(ducks => expect(ducks.length).toBe(0))
    )

    it('should fail on undefined query', () =>
        expect(() => searchDucks()).toThrowError(TypeError, `query with value undefined is not a string`)
    )

    // TODO test more cases

    describe('when user already has favorite ducks', () => {
        let credentials

        beforeEach(() => {
            user.favorites.push('5c3853aebd1bde8520e66e99', '5c3853aebd1bde8520e66e8a', '5c3853aebd1bde8520e66e70')

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

        it('should succeed on matching criteria', () => {
            const query = 'white' // 12 results

            return searchDucks(credentials.id, credentials.token, query)
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
                })
        })
    })
})
