const { expect } = require('chai')
const logic = require('..')
const data = require('../../data')
const { ObjectId } = require('mongodb')

describe('logic - unregister user', () => {
    let client, users

    let name, surname, email, password

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`

    before(() =>
        data('mongodb://localhost', 'my-api-test')
            .then(({ client: _client, db }) => {
                client = _client

                users = db.collection('users')

                logic.__users__ = users
            })
            .then(() => users.deleteMany())
            .then(() => users.insertOne({ name, surname, email, password }))
            .then(result => id = result.insertedId.toString())
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
            .then(() => users.findOne({ _id: ObjectId(id) }))
            .then(user => expect(user).not.to.exist)
    )

    after(() => client.close())
})