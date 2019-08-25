const { expect } = require('chai')
const logic = require('..')
const data = require('../../data')
const { ObjectId } = require('mongodb')

describe('logic - update user', () => {
    let client, users

    let name, surname, email, password

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`

    body = {
        name: `name-${Math.random()}`,
        surname: `surname-${Math.random()}`,
        email: `email-${Math.random()}@domain.com`,
        password: `password-${Math.random()}`,
        extra: `extra-${Math.random()}`
    }

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

    it('should succeed on correct data', () =>
        logic.updateUser(id, body)
            .then(result => expect(result).not.to.exist)
            .then(() => users.findOne({ _id: ObjectId(id) }))
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(body.name)
                expect(user.surname).to.equal(body.surname)
                expect(user.email).to.equal(body.email)
                expect(user.password).to.equal(body.password)
                expect(user.extra).to.equal(body.extra)
            })
    )

    it('should fail on non-existing user', () =>
        logic.updateUser('123456789012', body)
            .catch(error => expect(error.message).to.equal(`user with id 123456789012 not found`))
    )

    after(() => client.close())
})