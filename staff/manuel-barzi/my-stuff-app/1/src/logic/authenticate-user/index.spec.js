import authenticateUser from '.'
import { database, models } from 'my-stuff-data'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

const { random } = Math

describe('logic - authenticate user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        await User.deleteMany()

        const user = await User.create({ name, surname, email, password })

        id = user.id
    })

    it('should succeed on correct data', async () => {
        const { token, id } = await authenticateUser(email, password)

        expect(typeof token).toBe('string')
        expect(token.length).toBeGreaterThan(0)

        expect(typeof id).toBe('string')
        expect(id.length).toBeGreaterThan(0)
    })

    afterAll(() => database.disconnect())
})