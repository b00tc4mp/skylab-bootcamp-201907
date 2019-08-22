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

    describe('unregister', () => {
        let id, name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

        it('should unregister user', () =>
            logic.unregisterUser(id, name, surname, email, password)
                .then(user => {
                    // expect(user).to.not.exist
                    expect(user.name).to.not.equal(name)
                    expect(user.surname).to.not.equal(surname)
                    expect(user.email).to.not.equal(email)
                    expect(user.password).not.to.equal(password)
                })
        )
    })

    after(() => client.close())
})