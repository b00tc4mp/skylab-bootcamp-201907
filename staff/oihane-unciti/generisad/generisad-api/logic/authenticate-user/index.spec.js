
require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('.')
const bcrypt = require('bcryptjs')
const { database, models: { User, Merchant } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe('logic - authenticate user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id, domain, name_domain, merchant

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        await User.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        const user = await User.create({ name, surname, email, password : await bcrypt.hash(password,10), merchant_owner: merchant })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const id = await authenticateUser(email, password, domain)
                expect(id).to.exist
                expect(id).to.be.a('string')
                expect(id).to.equal(id)
    })


    it('should fail on incorrect mail', async () =>{
        email = "pepito@mail.com"
        try{
            await authenticateUser(email, password, domain)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with email ${email} does not exist`)
        }
    })

    it('should fail on wrong password', async () => {
        password = '123'
        try {
            await authenticateUser(email, password, domain)
            throw new Error('should not reach this point')
        }catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('wrong credentials')
            }
        })

    
    it('should fail on empty email', () =>
        expect(() => authenticateUser("", password, domain)).to.throw('email is empty or blank')
    )

    it('should fail on wrong email type', () =>
        expect(() => authenticateUser("123", password, domain)).to.throw('email with value 123 is not a valid e-mail')
    )

    it('should fail on wrong password type', () =>
        expect(() => authenticateUser(123, password, domain)).to.throw('email with value 123 is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => authenticateUser(email, "", domain)).to.throw('password is empty or blank')
    )

    it('should fail on wrong password type', () =>
        expect(() => authenticateUser(email, 123, domain)).to.throw('password with value 123 is not a string')
    )

    after(() => database.disconnect())
})