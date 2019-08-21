const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('retrieve user', () => {
    let client, users

    let name, surname, email, password

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`

    before(() => {

        client = new MongoClient('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true })

        return client.connect()
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users

            })
            .then(() => users.deleteMany()
                .then(() => users.insertOne({ name: `${name}`, surname: `${surname}`, email: `${email}`, password: `${password}` })
                .then(result => id = result.insertedId.toString())))
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