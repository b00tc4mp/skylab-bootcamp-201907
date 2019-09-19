
require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('.')
const { database, models: { User, Merchant} } = require('generisad-data')
const bcrypt = require('bcryptjs')

const { env: { DB_URL_TEST }} = process

describe('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let name, surname, email, password, favorites, domain, name_domain, merchant

    beforeEach(async () => {

        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        favorites= []

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        await User.deleteMany()
    })

    it('should succeed on correct data', async () =>{
        const result = await registerUser(name, surname, email, password, domain)
            expect(result).to.exist

            const user = await User.findOne({ email })
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                const match = await bcrypt.compare(password,user.password)
                expect(match).to.be.true
                expect(user.favorites.length).to.equal(0)
                expect(user.merchant_owner.toString()).to.equal(merchant)
               
    })
    it('should fail if the mail already exists', async () => {
        await User.create({ name, surname, email, password, domain })
            try{
                await registerUser(name, surname, email, password, domain)
                throw new Error('should not reach this point')
            }catch(error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with e-mail ${email} already exists`)
                }
    })

    it('should fail on empty name', () =>
        expect(() => registerUser("", surname, email, password, domain)).to.throw('name is empty or blank')
    )

    it('should fail on wrong name type', () =>
        expect(() => registerUser(123, surname, email, password, domain)).to.throw('name with value 123 is not a string')
    )

    it('should fail on empty surname', () =>
        expect(() => registerUser(name, "", email, password, domain)).to.throw('surname is empty or blank')
    )

    it('should fail on wrong surname type', () =>
        expect(() => registerUser(name, 123, email, password, domain)).to.throw('surname with value 123 is not a string')
    )

    it('should fail on empty email', () =>
        expect(() => registerUser(name, surname, "123@mailcom", password, domain)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )

    it('should fail on wrong email format', () =>
        expect(() => registerUser(name, surname, "123@mailcom", password, domain)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )

    it('should fail on wrong email type', () =>
        expect(() => registerUser(name, surname, 123, password, domain)).to.throw('email with value 123 is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => registerUser(name, surname, email, "", domain)).to.throw('password is empty or blank')
    )

    it('should fail on wrong password type', () =>
        expect(() => registerUser(name, surname, email, 123, domain)).to.throw('password with value 123 is not a string')
    )
    after(() => database.disconnect())
})