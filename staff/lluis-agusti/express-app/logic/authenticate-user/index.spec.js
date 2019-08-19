
const authenticateUser = require('.')
const { call } = require('../../utils')

const { random } = Math

describe('logic - authenticate user', () => {
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
    })

    it('should succeed on correct data', () =>
        authenticateUser(user.username, user.password)
            .then(credentials => {
                expect(credentials).toBeDefined()

                const { id, token } = credentials
                expect(id).toBeDefined()
                expect(token).toBeDefined()
            })
    )

    it('should fail on empty username', () =>
        expect(() =>
            authenticateUser('', user.password)
        ).toThrowError(Error, 'username is empty or blank')
    )

    it('should fail on non-valid username', () =>
        expect(() =>
            authenticateUser('manuelbarzi#gmail.com', '123')
        ).toThrowError(Error, 'username with value manuelbarzi#gmail.com is not a valid e-mail')
    )

    // TODO test more cases
})