const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../delete-user')

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

    describe('delete', () => {
        let name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            users.insertOne({name, surname, email, password})
        })

        it('should succeed on delete data', () => {
        debugger
            logic.deleteUser(email, password)
             .then(() => users.findOne({ email }))
             .then(user =>{
                expect(user).to.null
             
            })}
        )
    })
    after(() => client.close())
})