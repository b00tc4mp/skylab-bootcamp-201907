const { expect } = require('chai')
const logic = require('..')
const { models : {User} } = require('../../data')
const mongoose = require('mongoose')

describe('logic - authenticate user', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))


    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return users.deleteMany()
            .then(() => users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString()))
    })

    it('should succeed on correct data', () =>
        logic.authenticateUser(email, password)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )

    after(() => client.close())
})