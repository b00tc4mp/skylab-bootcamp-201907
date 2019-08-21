const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('authenticate', () => {
    let client, users

    let name, surname, email, password

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`

    before(() => {

        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users

            })
            .then(() => users.deleteMany()
                .then(() => users.insertOne({ name: `${name}`, surname: `${surname}`, email: `${email}`, password: `${password}` })))
    })

    it('should succeed on correct credentials', () =>
        logic.authenticateUser(email, password)
            .then((data) => {
                expect(data).to.be.undefined
            })
    )

    it('should fail on wrong credentials', () =>
        logic.authenticateUser(email, password)
            .catch(error => expect(error.message).to.equal('Wrong credentials'))
            
                )

    after(() => client.close())
})

