import registerUser from '.'
const logic
const { random } = Math
const { database, models: { User } } = require('my-stuff-data')
const bcrypt = require('bcryptjs')

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
        const response = await registerUser(name, surname, email, password)

        expect(response).toBeUndefined()

        const user = await User.findOne({ email })

        expect(user).toBeDefined()
        expect(user.name).toBe(name)
        expect(user.surname).toBe(surname)
        expect(user.email).toBe(email)
        // expect(user.password).toBe(password)

        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()
    })

    afterAll(() => database.disconnect())
})