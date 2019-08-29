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
        let name, surname, email, password, repassword, userId

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            repassword = password
        return users.insertOne({ name, surname, email, password, repassword })
            .then(data => userId = data.insertedId.toString())
        })

        it('should DELETE user', () => 
            logic.unregister(userId, password)
                .then( response => {
                    expect(response).to.exist
                    expect(response.deletedCount).to.equal(1)
                })
                // return users.findOne({ userId })
                //     .then(response => {
                //         expect(response).not.to.exist
                //     })
                  
            )
    })

    after(() => client.close())
})