require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('.')
const { database, models: { User } } = require('ktbo-data')
const { random: {  value } } = require('ktbo-utils')
const { random } = Math
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - authenticate user', () => {
    before(() => database.connect(DB_URL_TEST))

    let company, country, email, password, id, role

    beforeEach(async () => {
        company = `company-${random()}`
        country = `country-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        role = value('admin', 'regular')

        await User.deleteMany()
        const user = await User.create({ company, country, email, password: await bcrypt.hash(password, 10), role })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await authenticateUser(email, password)
        
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)

        const user = await User.findOne({ email })

        expect(user.company).to.equal(company)
        expect(user.country).to.equal(country)
        expect(user.email).to.equal(email)
    })

    it('should fail on wrong e-mail', async () => {

        try {
            await authenticateUser('invalid@mail.com', password)

        } catch({message}) {
            expect(message).to.equal(`user with e-mail invalid@mail.com does not exist`)
        }
    })

    it('should fail on missing e-mail', async () => {
        try {
            await authenticateUser('', password)
        } catch ({message}) {
            expect(message).to.equal(`e-mail is empty or blank`)
        }
    })

    it('should fail when e-mail is a number', async () => {
        try {
            await authenticateUser(123, password)
        } catch ({message}) {
            expect(message).to.equal('e-mail with value 123 is not a string')
        }
    })

    it('should fail when e-mail is a object', async () => {
        try {
            await authenticateUser({}, password)
        } catch ({message}) {
            expect(message).to.equal('e-mail with value [object Object] is not a string')
        }
    })

    it('should fail when e-mail is an array', async () => {
        try {
            await authenticateUser([1,2,3], password)
        } catch ({message}) {
            expect(message).to.equal('e-mail with value 1,2,3 is not a string')
        }
    })

    it('should fail when e-mail is a boolean', async () => {
        try {
            await authenticateUser(true, password)
        } catch ({message}) {
            expect(message).to.equal('e-mail with value true is not a string')
        }
    })

    it('should fail on wrong password', async () => {

        try {
            await authenticateUser(email, 'wrong password')
        } catch({message}) {
            expect(message).to.equal('wrong credentials')
        }
    })

    it('should fail on missing password', async () => {

        try {
            await authenticateUser(email, '')
        } catch({message}) {
            expect(message).to.equal('password is empty or blank')
        }
    })

    it('should fail when password is a number', async () => {
        try {
            await authenticateUser(email, 123)
        } catch ({message}) {
            expect(message).to.equal('password with value 123 is not a string')
        }
    })

    it('should fail when password is a object', async () => {
        try {
            await authenticateUser(email, {})
        } catch ({message}) {
            expect(message).to.equal('password with value [object Object] is not a string')
        }
    })

    it('should fail when password is an array', async () => {
        try {
            await authenticateUser(email, [1,2,3])
        } catch ({message}) {
            expect(message).to.equal('password with value 1,2,3 is not a string')
        }
    })

    it('should fail when password is a boolean', async () => {
        try {
            await authenticateUser(email, true)
        } catch ({message}) {
            expect(message).to.equal('password with value true is not a string')
        }
    })

    after(() => database.disconnect())
})