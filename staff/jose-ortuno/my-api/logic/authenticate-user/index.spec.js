const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../')

describe('Logic - Authenticate', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('skylab')

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

        return users.insertOne({ name, surname, email, password })
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

    after(() => client.close())

})
