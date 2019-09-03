const { expect } = require('chai')
const logic = require('../../')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register user', () => {
    before(() => mongoose.connect('mongodb://localhost/e-cohabitat-api-test', { useNewUrlParser: true }))

    let username, name, surname, email, password

    beforeEach(async() => {
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.registerUser(username, name, surname, email, password)
        expect(result).to.exist

        const user = await User.findOne({ email })
        expect(user).to.exist
        expect(user.username).to.equal(username)
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.equal(password)
        
    })

    // name
    it('should fail on empty name', async () => {
        name = ''

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('name is empty or blank')
        }
    })

    it('should fail on undefined name', async () => {
        name = undefined

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('name with value undefined is not a string')
        }
    })

    it('should fail on wrong name data type', async () => {
        name = 123

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('name with value 123 is not a string')
        }
    })

    // surname
    it('should fail on empty surname', async () => {
        surname = ''

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('surname is empty or blank')
        }
    })

    it('should fail on undefined surname', async () => {
        surname = undefined

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('surname with value undefined is not a string')
        }
    })

    it('should fail on wrong surname data type', async () => {
        surname = 123

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('surname with value 123 is not a string')
        }
    })

    // email
    it('should fail on empty email', async () => {
        email = ''

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('e-mail is empty or blank')
        }
    })

    it('should fail on undefined email', async () => {
        email = undefined

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('e-mail with value undefined is not a string')
        }
    })

    it('should fail on wrong email data type', async () => {
        email = 123

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('e-mail with value 123 is not a string')
        }
    })

    // password
    it('should fail on empty password', async () => {
        password = ''

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('password is empty or blank')
        }
    })

    it('should fail on undefined password', async () => {
        password = undefined

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('password with value undefined is not a string')
        }
    })

    it('should fail on wrong password data type', async () => {
        password = 123

        try {
            await logic.registerUser(username, name, surname, email, password)
        } catch({message}) {
            expect(message).to.equal('password with value 123 is not a string')
        }
    })

    after(() => mongoose.disconnect())
})