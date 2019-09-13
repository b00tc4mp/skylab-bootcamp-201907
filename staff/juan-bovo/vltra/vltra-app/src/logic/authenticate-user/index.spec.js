import logic from '..'
import { database, models } from 'vltra-data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe('logic - authenticate user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, nickname, email, password, id

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        nickname = `nickname-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`

        await User.deleteMany()

        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({ name, surname, nickname, email, password: hash })

        id = user.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.authenticateUser(email, password)

        expect(result).toBeUndefined()

        const { __token__ } = logic

        expect(typeof __token__).toBe('string')
        expect(__token__.length).toBeGreaterThan(0)

        const { sub } = jwt.verify(__token__, REACT_APP_JWT_SECRET_TEST)

        expect(sub).toBe(id)
    })

    it('should fail on wrong email', () =>
        logic.authenticateUser('Jhon@email.com', password)
            .then(_id => {
                expect(_id).toBeUndefined()
            })
            .catch(error => {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with email Jhon@email.com does not exist`)
            })
    )
    it('should fail on wrong password', () =>
        logic.authenticateUser(email, 'dajhfkasf')
            .then(data => {
                expect(data).toBeUndefined()
            })
            .catch(error => {
                expect(error).toBeDefined
                expect(error.message).toBe('wrong credentials')
            })
    )

    it('should fail on undefined email', () =>
        expect(() =>
            logic.authenticateUser(undefined, password)
        ).toThrow(`email with value undefined is not a valid e-mail`)
    )

    it('should fail on wrong email data type', () =>
        expect(() =>
            logic.authenticateUser(123, password)
        ).toThrow(`email with value 123 is not a valid e-mail`)
    )

    it('should fail on empty password', () =>
        expect(() =>
            logic.authenticateUser(email, '')
        ).toThrow('password is empty or blank')
    )

    it('should fail on undefined password', () =>
        expect(() =>
            logic.authenticateUser(email, undefined)
        ).toThrow(`password with value undefined is not a string`)
    )

    it('should fail on wrong password data type', () =>
        expect(() =>
            logic.authenticateUser(email, 123)
        ).toThrow(`password with value 123 is not a string`)
    )

    afterAll(() => database.disconnect())
})