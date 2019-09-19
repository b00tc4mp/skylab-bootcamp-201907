require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('.')
const { database, models: { User } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve user', () => {
    before(() => database.connect(DB_URL_TEST))

    let company, country, email, password, role, id

    beforeEach( async () => {
        company = `company-${random()}`
        country = `country-${random()}`
        email = `email-${random()}@domain.com`
        password = `password-${random()}`
        role = value('admin', 'regular')

        await User.deleteMany()
            const user = await User.create({ company, country, email, password, role })
            id = user.id
    })

    it('should succeed on correct data', async () => {

        const user = await retrieveUser(id)
            
                expect(user).to.exist
                expect(user.id).to.equal(id)
                expect(user._id).not.to.exist
                expect(user.company).to.equal(company)
                expect(user.country).to.equal(country)
                expect(user.email).to.equal(email)
                expect(user.password).not.to.exist
                expect(user.__v).not.to.exist
                expect(user.role).to.equal(role)
            
        })

        it('should fail on not registered email', async () => {

            await User.deleteMany()
            try {
                await retrieveUser(id)
            } catch (error) {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${id} not found`)
            }
        })

        it('should fail on empty userId', () =>
            expect(() => retrieveUser('')).to.throw(Error, 'id is empty or blank'))

        it('should fail when userId is a number', () =>
            expect(() => retrieveUser(1)).to.throw(Error, `1 is not a string`))
        
        it('should fail when userId is an object', () =>
            expect(() => retrieveUser({})).to.throw(Error,`[object Object] is not a string`))

        it('should fail when userId is an array', () =>
            expect(() => retrieveUser([1, 2, 3])).to.throw(Error,`1,2,3 is not a string`))

        it('should fail when userId is a boolean', () =>
            expect(() => retrieveUser(true)).to.throw(Error,`true is not a string`))

    after(() => database.disconnect())
})