import authenticateUser from '.'
import { database, models } from 'my-stuff-data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

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

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, email, password: hash })

        id = user.id
    })

    it('should succeed on correct data', async () => {
        const token = await authenticateUser(email, password)

        expect(typeof token).toBe('string')
        expect(token.length).toBeGreaterThan(0)

        const { sub } = jwt.verify(token, REACT_APP_JWT_SECRET_TEST)

        expect(sub).toBe(id)
    })

    afterAll(() => database.disconnect())
})