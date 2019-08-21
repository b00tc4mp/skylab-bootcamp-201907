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

     describe('remove', () => {
        let name, surname, email, password , userId

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name , surname , email , password })
                .then( result => userId = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.removeUser(userId)
                .then( response => {
                    expect(response).to.exist
                    expect(response.deletedCount).to.equal(1)
                })
        )
    })

    after(() => client.close())
})