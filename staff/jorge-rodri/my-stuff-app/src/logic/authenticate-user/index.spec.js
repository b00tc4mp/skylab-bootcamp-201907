import authenticateUser from '.'
const REACT_APP_API_URL = process.env.REACT_APP_API_URL


const { random } = Math
debugger
describe('logic - authenticate user', () => {
    let name, surname, email, password
    beforeEach(async () => {
        name = `jorge-${random()}`
        surname = `surname-${random()}`
        email = `carol-${random()}@domain.com`
        password = `password-${random()}`

        await fetch(`${REACT_APP_API_URL}/users`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, surname, email, password })
        })
    })



    it('should suceed on correct data', async () => {

        const data = await authenticateUser(email, password)
        debugger
        expect(data).toBeDefined()
        expect(data.id).toBeDefined()
        expect(data.token).toBeDefined()
    })
})