import registerUser from '.'

const { random } = Math
const { database, models: { User } } = require('data')
const bcrypt = require('bcryptjs')

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - register user', () => {
    let username, email, password

    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    beforeEach(async () => {
        username = `username-${random()}`
        password = `password-${random()}`
        email = `email-${random()}@mail.com`
        
        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const response = await registerUser(username, password, email)

        expect(response).toBeUndefined()

        const user = await User.findOne({ email })
    
        expect(user).toBeDefined()
        
        expect(user.username).toBe(username)

        const match = await bcrypt.compare(password, user.password)
        expect(match).toBeTruthy()

        expect(user.email).toBe(email)

        
    })

    afterAll(() => database.disconnect())
})