import logic from '../../'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - authenticate user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let username, name, surname, email, password, id

    beforeEach(async () => {
        username = `name-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

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
        expect(typeof __userCredentials__.id).toBe('string')
        expect(__userCredentials__.id.length).toBeGreaterThan(0)
        expect(typeof __userCredentials__.token).toBe('string')
        expect(__userCredentials__.token.length).toBeGreaterThan(0)

        const { sub } = jwt.verify(__userCredentials__.token, REACT_APP_JWT_SECRET_TEST)
        expect(sub).toBe(id)
    })


    it('should fail on wrong e-mail', async () => {
        email = 'invalid@mail.com'

        try {
            await logic.authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).toBe(`wrong credentials`)
        }
    })

    it('should fail on wrong password', async () => {
        password = 'wrong password'

        try {
            await logic.authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).toBe('wrong credentials')
        }
    })

    // email
    it('should fail on empty email', async () => {
        email = ''

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('e-mail is empty or blank')
        }
    })

    it('should fail on undefined email', async () => {
        email = undefined

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('e-mail with value undefined is not a string')
        }
    })

    it('should fail on wrong email data type', async () => {
        email = 123

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('e-mail with value 123 is not a string')
        }
    })

    // password
    it('should fail on empty password', async () => {
        password = ''

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('password is empty or blank')
        }
    })

    it('should fail on undefined password', async () => {
        password = undefined

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('password with value undefined is not a string')
        }
    })

    it('should fail on wrong password data type', async () => {
        password = 123

        try {
            await logic.authenticateUser(email, password)
        } catch({message}) {
            expect(message).toBe('password with value 123 is not a string')
        }
    })

    afterAll(() => database.disconnect())
})