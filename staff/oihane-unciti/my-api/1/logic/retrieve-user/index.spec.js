const { expect } = require('chai')
const logic = require('..')
const data = require('../../data/schemas')

describe('logic - retrieve user', () => {
    let client, users

    before(() => {
        return data('mongodb://localhost', 'my-api-test')
            .then(({ client: _client, db }) => {
                client = _client

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return users.deleteMany()
            .then(() => users.insertOne({ name, surname, email, password }))
            .then(result => id = result.insertedId.toString())
    })

    it('should succeed on correct data', () =>
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

    after(() => client.close())
})