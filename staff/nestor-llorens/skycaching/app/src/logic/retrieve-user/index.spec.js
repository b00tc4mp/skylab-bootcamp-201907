import logic from '..'
import { database, models } from 'data'
import jwt from 'jsonwebtoken'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let username, email, password, id

    beforeEach(async () => {
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        
        await User.deleteMany()

        const user = await User.create({ username, password, email })

        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>
        await logic.retrieveUser()
            .then(user => {
                expect(user).toBeDefined()
                expect(user.id).toBe(id)
                expect(user._id).toBeUndefined()
                expect(user.username).toBe(username)
                expect(user.email).toBe(email)
                expect(user.password).toBeUndefined()
            })
    )

    afterAll(() => database.disconnect())
})