import logic from '..'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe('logic - authenticate user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let username, name, surname, email, password, id

    beforeEach(async () => {
        username = `name-${random()}`
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        await User.deleteMany()

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({ username, name, surname, email, password: hash })

        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.authenticateUser(email, password)
        expect(result).toBeUndefined()

        const { __userCredentials__ } = logic
        expect(typeof __userCredentials__).toBe('object')
        expect(__userCredentials__.length).toBeGreaterThan(0)
        expect(typeof __userCredentials__.id).toBe('string')
        expect(__userCredentials__.id.length).toBeGreaterThan(0)
        expect(typeof __userCredentials__.token).toBe('string')
        expect(__userCredentials__.token.length).toBeGreaterThan(0)

        const { sub } = jwt.verify(__userCredentials__.token, REACT_APP_JWT_SECRET_TEST)
        expect(sub).toBe(id)
    })

    afterAll(() => database.disconnect())
})