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

    describe('delete user', () => {
        let name, surname, email, password, id


        beforeEach(() => {
            name = `D_name-${Math.random()}`
            surname = `D_surname-${Math.random()}`
            email = `D_email-${Math.random()}@domain.com`
            password = `D_password-${Math.random()}`

            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

        it('should delete user', () =>
            logic.deleteUser(id)
                .then(user => {
                    user.message
                    user.result
                    debugger
                    expect(user.deletedCount).to.equal(1)
                })
        )
    })


    after(() => client.close())
})
