const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('remove user', () => {
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
        logic.removeUser(id)
            .then(res => {
                expect(res).to.be.defined
                .then(expect(users.findOne({ email })).to.be.undefined
                
            })
    )

    after(() => client.close())
})