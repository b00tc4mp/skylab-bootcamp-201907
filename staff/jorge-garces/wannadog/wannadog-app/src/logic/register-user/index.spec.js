import logic from '..'

const { random } = Math

const { database, models: { User } } = require('wannadog-data')
import bcrypt from 'bcryptjs'

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - register user', () => {
    let name, surname, email, password

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const response = await logic.registerUser(name, surname, email, password)

        expect(response).toBeUndefined()

        const user = await User.findOne({ email })

        expect(user).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)

        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()
    })

    afterAll(() => database.disconnect())
})