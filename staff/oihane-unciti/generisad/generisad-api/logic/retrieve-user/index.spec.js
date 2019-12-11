require('dotenv').config()

const { expect } = require('chai')
const retrieveUser = require('.')
const { database, models: { User, Merchant } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process


describe('logic - retrieve user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id
    let domain, name_domain, merchant

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        
        name_domain = `name_domain-${Math.random()}`
        domain = `domain-${Math.random()}`

        await Merchant.deleteMany()
        const _merchant = await Merchant.create({ name: name_domain, domain })
        merchant = _merchant.id

        await User.deleteMany()
        const user = await User.create({ name, surname, email, password, merchant_owner: merchant  })
        id = user.id
    })

    it('should succeed on correct data', async () =>{
        const user = await retrieveUser(id)
                expect(user).to.exist
                expect(user.id).to.equal(id)
                expect(user._id).not.to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).not.to.exist
                expect(user.merchant_owner.toString()).to.equal(merchant)
    })
    it('should throw an error with a wrong id', async () =>{
        try{
            await retrieveUser("5d5fe532b4f3f827e6fc64f8")
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`user with id 5d5fe532b4f3f827e6fc64f8 not found`)
        }
    })

    it('should fail on empty user id', () =>
        expect(() => retrieveUser("")).to.throw('user id is empty or blank')
    )

    it('should fail on undefined user id', () =>
    expect(() => retrieveUser(undefined)).to.throw('id with value undefined is not a string')
)

    it('should fail on wrong user id type', () =>
        expect(() => retrieveUser(123)).to.throw('user id with value 123 is not a string')
    )
    after(() => database.disconnect())
})