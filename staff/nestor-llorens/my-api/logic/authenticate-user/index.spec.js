const { expect } = require('chai')
const logic = require('..')
const data = require('../../data')

describe('logic - authenticate user', () => {
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

    it('should succeed on correct data', () =>
        logic.authenticateUser(email, password)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )

    it('should fail on wrong email', () =>
        logic.authenticateUser('wrongEmail@ddd.com', password)
            .catch(error => expect(error.message).to.equal('user with e-mail wrongEmail@ddd.com does not exist'))
    )

    it('should fail on wrong password', () =>
        logic.authenticateUser(email, 'wrongPassword')
            .catch(error => expect(error.message).to.equal('wrong credentials'))
    )

    after(() => client.close())
})