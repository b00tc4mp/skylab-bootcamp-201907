const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../')

describe('Logic - Unregister user', () => {
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

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return users.insertOne({ name, surname, email, password })
            .then(result => id = result.insertedId.toString())
    })

    it('should succeed on correct data', () =>
        logic.unregisterUser(id, password)
            .then(response => expect(response).not.to.exist)
    )

    it('should succed on incorrect data', () =>
        logic.unregisterUser('5d5d5fcb844eae22d1cbd34b', password)
            .then(response => expect(response).not.to.exist)
            .catch(error => expect(error.message).to.equal('User does not exist or is not find'))
    )

    after(() => client.close())
})