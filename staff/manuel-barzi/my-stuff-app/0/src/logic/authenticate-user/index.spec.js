import registerUser from '../register-user'
import authenticateUser from '.'

const { random } = Math

describe('logic - authenticate user', () => {
    let name, surname, email, password

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        await registerUser(name, surname, email, password)
    })

    it('should succeed on correct data', async () => {
        const { token, id } = await authenticateUser(email, password)

        expect(typeof token).toBe('string')
        expect(token.length).toBeGreaterThan(0)

        expect(typeof id).toBe('string')
        expect(id.length).toBeGreaterThan(0)
    })
})