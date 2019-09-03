const mongoose = require('mongoose')
const { User } = require('../../data')
const { expect } = require('chai')
const logic = require('../')

describe('Logic - Authenticate', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.deleteMany()
            .then(() => User.create({ name, surname, email, password })
                .then(user => id = user.id))
    })

    it('should succeed on correct data', () =>
        logic.authenticateUser(email, password)
            .then(data => {
                expect(data).to.exist
                expect(data.id).to.exist
            })
    )

    it('should fail on wrong email', () =>
        logic.authenticateUser('fake@email.com', password)
            .then(data => {
                expect(data).not.to.exist
            })
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal('Wrong credentials')
            })
    )

    it('should fail on wrong password.', () =>
        logic.authenticateUser(email, 'fjañlkfjsadñfk')
            .then(data => {
                expect(data).not.to.exist
            })
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal('Wrong credentials')
            })
    )

    after(() => mongoose.disconnect())

})
