
require('dotenv').config()

const { expect } = require('chai')
const registerUser = require('.')
const { database, models: { User } } = require('my-project-data')

const { env: { DB_URL_TEST }} = process

describe.only('logic - register user', () => {
    before(() => database.connect(DB_URL_TEST))
    //before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, favorites

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        favorites= []

        await User.deleteMany()
    })

    it('should succeed on correct data', async () =>{debugger
        const result = await registerUser(name, surname, email, password, favorites)
            expect(result).not.to.exist

            const user = await User.findOne({ email })
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
                expect(user.favorites.length).to.equal(0)
    })
    it('should fail if the mail already exists', async () => {
        await User.create({ name, surname, email, password, favorites })
            try{
                await registerUser(name, surname, email, password, favorites)
                throw new Error('should not reach this point')
            }catch(error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`user with e-mail ${email} already exists`)
                }
    })

    it('should fail on empty name', () =>
        expect(() => registerUser("", surname, email, password, favorites)).to.throw('name is empty or blank')
    )

    it('should fail on wrong name type', () =>
        expect(() => registerUser(123, surname, email, password, favorites)).to.throw('name with value 123 is not a string')
    )

    it('should fail on empty surname', () =>
        expect(() => registerUser(name, "", email, password, favorites)).to.throw('surname is empty or blank')
    )

    it('should fail on wrong surname type', () =>
        expect(() => registerUser(name, 123, email, password, favorites)).to.throw('surname with value 123 is not a string')
    )

    it('should fail on empty email', () =>
        expect(() => registerUser(name, surname, "123@mailcom", password, favorites)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )

    it('should fail on wrong email format', () =>
        expect(() => registerUser(name, surname, "123@mailcom", password, favorites)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )

    it('should fail on wrong email type', () =>
        expect(() => registerUser(name, surname, 123, password, favorites)).to.throw('email with value 123 is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => registerUser(name, surname, email, "", favorites)).to.throw('password is empty or blank')
    )

    it('should fail on wrong password type', () =>
        expect(() => registerUser(name, surname, email, 123, favorites)).to.throw('password with value 123 is not a string')
    )
    after(() => database.disconnect())
})