
require('dotenv').config()

const { expect } = require('chai')
const authenticateUser = require('.')
const { database, models: { User } } = require('generisad-data')

const { env: { DB_URL_TEST }} = process

describe('logic - authenticate user', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
            const user = await User.create({ name, surname, email, password })
            id = user.id
    })

    it('should succeed on correct data', async () => {
        const id = await authenticateUser(email, password)
                expect(id).to.exist
                expect(id).to.be.a('string')
                expect(id).to.equal(id)
    })
    it('should fail on incorrect mail', async () =>{
        email = "pepito@mail.com"
        try{
            await authenticateUser(email, password)
            throw new Error('should not reach this point')
        } catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials.')
        }
    })
    it('should fail on wrong password', async () => {
        password = '123'
        try {
            await authenticateUser(email, password)
            throw new Error('should not reach this point')
        }catch(error) {
            expect(error).to.exist
            expect(error.message).to.equal('Wrong credentials.')
            }
        })

    it('should fail on empty email', () =>
        expect(() => authenticateUser("", password)).to.throw('email is empty or blank')
    )

    it('should fail on wrong email type', () =>
        expect(() => authenticateUser("123", password)).to.throw('email with value 123 is not a valid e-mail')
    )

    it('should fail on wrong password type', () =>
        expect(() => authenticateUser(123, password)).to.throw('email with value 123 is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => authenticateUser(email, "")).to.throw('password is empty or blank')
    )

    it('should fail on wrong password type', () =>
        expect(() => authenticateUser(email, 123)).to.throw('password with value 123 is not a string')
    )

    after(() => database.disconnect())
})