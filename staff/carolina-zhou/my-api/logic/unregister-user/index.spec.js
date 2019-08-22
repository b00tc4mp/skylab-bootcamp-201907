const { expect } = require('chai')
const logic = require('..')
const data = require('../../data')
const { ObjectId } = require('mongodb')

describe('logic - unregister user', () => {
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
        logic.unregisterUser(id, password)
            .then(result => {
                expect(result).not.to.exist

                return users.findOne({ _id: ObjectId(id) })
            })
            .then(user => {
                expect(user).not.to.exist
            })
    )

    it('should fail on unexisting user', () =>
        logic.unregisterUser('5d5d5530531d455f75da9fF9', password)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    it('should fail on existing user, but wrong password', () =>
        logic.unregisterUser(id, 'wrong-password')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    after(() => client.close())
})