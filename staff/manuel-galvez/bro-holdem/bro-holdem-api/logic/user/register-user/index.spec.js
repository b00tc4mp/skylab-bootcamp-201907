const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User } = require('../../../models')

describe.only('logic - register user', () => {

    before(() => mongoose.connect('mongodb://localhost/my-stuff-api-test', { useNewUrlParser: true }))

    let name, surname, email, password

    beforeEach(() => {

        username = `username-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
    })

    it('should succeed on correct data', async () => {
        const result = await logic.user.register(username, email, password)
        expect(result).not.to.exist
        const user = await User.findOne({ email, password })
        expect(user).to.exist
        expect(user.username).to.equal(username)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
    })

    it('should fail if the user already exists', async () => {

        await User.create({ username, email, password })

        try {
            await logic.user.register(username, email, password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`User with e-mail ${email} already exists.`)
        }
    })


    it('should fail if the username is already taken', async () => {

        await User.create({ username, email, password })

        try {
            await logic.user.register(username, 'another-email@mail.com', password)
        } catch (error) {
            expect(error).to.exist
            expect(error.message).to.equal(`Username is already taken.`)
        }
    })

    /* Name */
    it('should fail on empty name', () =>
        expect(() =>
            logic.user.register('', email, password)
        ).to.throw('username is empty or blank')
    )

    it('should fail on undefined name', () =>
        expect(() =>
            logic.user.register(undefined, email, password)
        ).to.throw(`username with value undefined is not a string`)
    )

    it('should fail on wrong data type for name', () =>
        expect(() =>
            logic.user.register(123, surname, email, password)
        ).to.throw(`username with value 123 is not a string`)
    )

    /* Email */
    it('should fail on empty email', () =>
        expect(() =>
            logic.user.register(username, '', password)
        ).to.throw('email is empty or blank')
    )

    it('should fail on undefined surname', () =>
        expect(() =>
            logic.user.register(username, undefined, password)
        ).to.throw(`email with value undefined is not a string`)
    )

    it('should fail on wrong data type for email', () =>
        expect(() =>
            logic.user.register(username, 123, password)
        ).to.throw(`email with value 123 is not a string`)
    )

    it('should fail on wrong email format', () =>
        expect(() =>
            logic.user.register(username, 'a@a', password)
        ).to.throw(`email with value a@a is not a valid e-mail`)
    )

    /* Password */
    it('should fail on empty password', () =>
        expect(() =>
            logic.user.register(username, email, '')
        ).to.throw('password is empty or blank')
    )

    it('should fail on undefined password', () =>
        expect(() =>
            logic.user.register(username, email, undefined)
        ).to.throw(`password with value undefined is not a string`)
    )

    it('should fail on wrong data type for password', () =>
        expect(() =>
            logic.user.register(username, email, 123)
        ).to.throw(`password with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})