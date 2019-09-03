const mongoose = require('mongoose')
const { User } = require('../../data')
const { expect } = require('chai')
const logic = require('../')

describe('Logic - Register user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { userNewUrlParser: true }))

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return Users.deleteMany()
            .then(() => User.create({ name, surname, email, password })
                .then(user => id = user.id))

    })

    it('should succeed on correct data', () =>
        logic.registerUser(name, surname, email, password, password)
            .then(result => {
                expect(result).not.to.exist

                return users.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )

    it('should succeed on exist user', () =>
        logic.registerUser(name, surname, email, password, password)
            .then(data => {
                expect(data).to.be.undefined
            })
            .catch(error => {
                expect(error.message).to.equal('Email already registered')
            })
    )

    after(() => mongoose.disconnect())
})