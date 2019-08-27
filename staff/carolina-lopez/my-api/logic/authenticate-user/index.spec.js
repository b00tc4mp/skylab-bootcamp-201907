const { expect } = require('chai')
const logic = require('..')
const data = require('../../data')

describe('logic', () => {
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
    


