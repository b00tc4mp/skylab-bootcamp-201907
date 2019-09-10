const { expect } = require('chai')
const logic = require('..')
const { User } = require('../../data')
const mongoose = require('mongoose')

describe('logic - unregister user', () => {

    let name, surname, email, password

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`

    before(() =>
        mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true })
            .then(() => User.deleteMany())
                .then(() => User.create({ name, surname, email, password }))
                .then(user => id = user.id )
    )

    it('should fail on unexisting user', () =>
        logic.unregisterUser('123456789012', password)
            .catch(error => expect(error.message).to.equal(`user with id 123456789012 not found`))

    )

    it('should fail on existing user, but wrong password', () =>
        logic.unregisterUser(id, 'wrongPassword')
            .catch(error => expect(error.message).to.equal('wrong credentials'))
    )

    it('should succeed on correct data', () =>
        logic.unregisterUser(id, password)
            .then(result =>
                expect(result).not.to.exist)
            .then(() => User.findOne({ _id: id }))
            .then(user => expect(user).not.to.exist)
    )

    after(() => mongoose.disconnect())
})