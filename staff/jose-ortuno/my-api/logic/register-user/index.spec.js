const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../')

describe('Logic - Register user', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())
    let name, surname, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
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

    after(() => client.close())
})