require('dotenv').config()

const { expect } = require('chai')
const updateUser = require('.')
const { database, models: { User } } = require('ktbo-data')
const { random: { value } } = require('ktbo-utils')
const { random } = Math
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - update user', () => {
    before(() => database.connect(DB_URL_TEST))

    let company, country, email, password1, id, body, role

    beforeEach( async () => {
        company = `company-${random()}`
        country = `country-${random()}`
        email = `email-${random()}@domain.com`
        password1 = `password-${random()}`
        role = value('admin', 'regular')

        body = {
            company: `company-${random()}`,
            country: `country-${random()}`,
            email: `email-${random()}@domain.com`,
            password: `password-${random()}`,
            extra: `extra-${random()}`,
            oldPassword: password1
        }
        const hash = await bcrypt.hash(password1, 10)

        await User.deleteMany()
            const user = await User.create({ company, country, email, password: hash, role })
            id = user.id
    })

    it('should succeed on correct data', async () => {
        
        const result = await updateUser(id, body)
                expect(result).not.to.exist

                const user = await User.findById(id)
            
                expect(user).to.exist
                expect(user.company).to.equal(body.company)
                expect(user.country).to.equal(body.country)
                expect(user.email).to.equal(body.email)
                expect(user.password).to.equal(body.password)
                expect(user.extra).not.to.exist
    })

    it('should fail on non-existing user', async () => {
        debugger
        id = '5d5d5530531d455f75da9fF9'
        try {
            await updateUser(id, body)
        } catch (error) {
            expect(error.message).to.equal(`user with id ${id} does not exist`)
        }          
    })

    it('should fail on empty userId', () =>
            expect(() => updateUser('', body)).to.throw(Error, 'id is empty'))

    it('should fail when userId is a number', () =>
        expect(() => updateUser(1, body)).to.throw(Error,`1 is not a string`))

    it('should fail when userId is an object', () =>
        expect(() => updateUser({}, body)).to.throw(Error,`[object Object] is not a string`))

    it('should fail when userId is an array', () =>
        expect(() => updateUser([1, 2, 3], body)).to.throw(Error,`1,2,3 is not a string`))

    it('should fail when userId is a boolean', () =>
        expect(() => updateUser(true, body)).to.throw(Error,`true is not a string`))

    after(() => database.disconnect())
})