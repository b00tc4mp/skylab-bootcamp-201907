const { expect } = require('chai')
const logic = require('..')
const {User} = require('../../data')
const mongoose = require('mongoose')

describe('logic - register user', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', {userNewUrlParse: true}))

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
    })

    it('should succeed on correct data', () =>
        logic.registerUser(name, surname, email, password)
            .then(result => {
                expect(result).not.to.exist

                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )
    it('should fail on email', () => {
        logic.registerUser(name, surname, email, password, password)
            .then(() => users.findOne({
                email
            }))
            .catch(error => expect(error.message).to.equal('Email already exists'))
    })

    after(() => mongoose.disconnect())
})