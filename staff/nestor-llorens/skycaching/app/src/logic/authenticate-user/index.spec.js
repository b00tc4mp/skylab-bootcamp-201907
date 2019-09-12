import logic from '..'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

fdescribe('logic - authenticate user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let username, email, password, id

    beforeEach(async () => {
        username = `username-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        await User.deleteMany()

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({ username, password: hash, email })

        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.authenticateUser(username, password)

        expect(result).toBeUndefined()

        const { __token__ } = logic

        expect(typeof __token__).toBe('string')
        expect(__token__.length).toBeGreaterThan(0)

        const { sub } = jwt.verify(__token__, REACT_APP_JWT_SECRET_TEST)

        expect(sub).toBe(id)
    })

    afterAll(() => database.disconnect())
})