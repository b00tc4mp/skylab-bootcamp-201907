require('dotenv').config()

const { expect } = require('chai')
const unregisterUser = require('.')
const { database, models: { User } } = require('ktbo-data')
const { random: { number, boolean, value } } = require('ktbo-utils')
const { random } = Math
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - unregister user', () => {
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
        debugger
        const result = await unregisterUser(id, password)
            
                expect(result).not.to.exist

                const user = await User.findById(id)
            
            
                expect(user).not.to.exist
            
    })

    it('should fail on unexisting user', async () => {
        try {
            await unregisterUser('5d5d5530531d455f75da9fF9', password)
        } catch (error) {
            expect(error.message).to.equal(`User with id 5d5d5530531d455f75da9fF9 doesn't exist`)    
        }
    })

    it('should fail on existing user, but wrong password', async () => {
        try {
            unregisterUser(id, 'wrong-password')         
        } catch (error) {
            expect(error.message).to.equal('wrong credentials')
        }
    })

    after(() => database.disconnect())
})