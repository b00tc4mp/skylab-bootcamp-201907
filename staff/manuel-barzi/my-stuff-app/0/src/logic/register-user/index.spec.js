import registerUser from '.'

const { random } = Math

describe('logic - register user', () => {
    let name, surname, email, password

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`
    })

    it('should succeed on correct data', async () => {
        const response = await registerUser(name, surname, email, password)

        expect(response).toBeUndefined()
    })
})