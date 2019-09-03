import retrieveUser from '.'

const { random } = Math

const REACT_APP_API_URL = process.env.REACT_APP_API_URL

describe('logic - retrieve user', () => {
    let name, surname, email, password, id, token

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password })
        })

        const response = await fetch(`${REACT_APP_API_URL}/auth`, {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const result = await response.json()

        debugger

        id = result.id
        token = result.token
    })

    it('should succeed on correct data', async () => {
        const user = await retrieveUser(id, token)

        expect(user).toBeDefined()

        expect(user.id).toBe(id)
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        expect(user.password).toBeUndefined()
    })
})