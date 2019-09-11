require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('.')
const { database, models: { User } } = require('my-stuff-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST } } = process

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const result = await registerUser(name, surname, email, password)

        expect(result).not.to.exist

        const user = await User.findOne({ email })

        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        //expect(user.password).to.equal(password)

        const match = await bcrypt.compare(password, user.password)

        expect(match).to.be.true
    })

    after(() => database.disconnect())
})