const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('logic', () => {
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

    describe('authenticate', () => {
        let name, surname, email, password, repassword

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            repassword = password
        return users.insertOne({ name, surname, email, password, repassword })
        })

        it('should succeed on correct data', () => {
            return logic.authenticateUser(email, password)
                .then(userId => {
                    expect(userId).to.exist
                    expect(userId).to.be.a("string")
                })
        })
    })

    describe('authenticate', () => {
        // TODO
    })

    after(() => client.close())
})