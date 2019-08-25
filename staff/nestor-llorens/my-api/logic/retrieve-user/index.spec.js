const { expect } = require('chai')
const logic = require('..')
const data = require('../../data')

describe('logic - retrieve user', () => {
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

    it('should succeed on correct id', () =>
        logic.retrieveUser(id)
            .then(user => {
                expect(user).to.exist
                expect(user.id).to.equal(id)
                expect(user._id).not.to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).not.to.exist
            })
    )

    it('should fail on wrong id', () =>
        logic.retrieveUser('123456789012')
            .catch(error => expect(error.message).to.equal(`user with id 123456789012 not found`))
    )

    after(() => client.close())
})