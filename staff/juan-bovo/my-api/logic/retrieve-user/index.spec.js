const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../retrieve-user')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost', { useUnifiedTopology: true })

        return client.connect()
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('retireve', () =>{
        let name, surname, email, password, id
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
           return users.insertOne({name, surname, email, password})
            .then(result => id = result.insertedId.toString())
        })
        it('should succeed on correct data', () =>
            logic.retrieveUser(id)
            .then(user =>{
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
            })
        )
    })
    after(() => client.close())
})