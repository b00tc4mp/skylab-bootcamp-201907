require('dotenv').config()

const { expect } = require('chai')
const logic = require('../.')
const { models: { User }, database } = require('data')

const { env: { DB_URL_TEST } } = process

describe('logic - register user', () => {
    before(async () => await database.connect(DB_URL_TEST))

    let username, password, email, avatar, id

    beforeEach(async () => {
        username = `username-${Math.random()}`
        password = `password-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        avatar = `path-to-avatar-${Math.random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.registerUser(username, password, email, avatar)
        expect(result).to.exist
        expect(result).to.be.a('string')
        const user = await User.findById(result)
        expect(user).to.exist
        expect(user.username).to.equal(username)
        expect(user.password).to.equal(password)
        expect(user.email).to.equal(email)
        expect(user.avatar).to.equal(avatar)
        expect(user.favorites).to.exist
        expect(user.found).to.exist
        expect(user.owned).to.exist
        expect(user.favorites.length).to.equal(0)
        expect(user.found.length).to.equal(0)
        expect(user.owned.length).to.equal(0)
        
    })
    it('should fail if the mail already exists', async () => {
        await User.create({ username, password, email, avatar })
        try {
            await logic.registerUser(username, password, email, avatar)

        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with e-mail ${email} already exists`)
        }
    })

    it('should fail if the username already exists', async () => {
        await User.create({ username, password, email: 'newemail@email.com', avatar })
        try {
            await logic.registerUser(username, password, email, avatar)

        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`user with username ${username} already exists`)
        }
    })                                         

    it('should fail on empty username', () =>
        expect(() => logic.registerUser("", email, password, avatar)).to.throw('username is empty or blank')
    )

    it('should fail on wrong username type', () =>
        expect(() => logic.registerUser(123, email, password, avatar)).to.throw('username with value 123 is not a string')
    )

    it('should fail on empty password', () =>
        expect(() => logic.registerUser(username, "", email, avatar)).to.throw('password is empty or blank')
    )

    it('should fail on wrong password type', () =>
        expect(() => logic.registerUser(username, 123, email, avatar)).to.throw('password with value 123 is not a string')
    )

    it('should fail on wrong email format', () =>
        expect(() => logic.registerUser(username, password, "wrong-email", avatar)).to.throw('email with value wrong-email is not a valid e-mail')
    )

    it('should fail on empty email', () =>
        expect(() => logic.registerUser(username, password, "", password)).to.throw('email is empty or blank')
    )

    it('should fail on wrong email type', () =>
        expect(() => logic.registerUser(username, password, 12345, avatar)).to.throw('email with value 12345 is not a string')
    )

    it('should fail on empty avatar', () =>
        expect(() => logic.registerUser(username, password, email, "")).to.throw('avatar is empty or blank')
    )

    it('should fail on wrong avatar type', () =>
        expect(() => logic.registerUser(username, password, email, 12345)).to.throw('avatar with value 12345 is not a string')
    )

    after(() => database.disconnect())
})