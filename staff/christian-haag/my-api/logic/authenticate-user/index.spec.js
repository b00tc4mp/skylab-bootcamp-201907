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


    describe('authenticate', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password })
                .then(res => id = res.insertedId.toString())
        })

        it('should suceed on correct data', () =>
            logic.authenticateUser(email, password)
                .then(_id => {
                    expect(_id).to.exist
                    expect(_id).to.be.a('string')
                    expect(_id).to.equal(id)
                })
        )

        it('schould fail on wrong email', () =>
            logic.authenticateUser('fake@mail.com', password)
                .then(user => {
                    expect(user).to.be.defined
                })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal('wrong credentials')
                })

        )

        it('schould fail on wrong credentials', () =>
            logic.authenticateUser(email, 'kldjbnfkjabfkb')
                .then(user => {
                    expect(user).to.be.undefined
                })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal('wrong credentials')
                })
        )

    })

    after(() => client.close())
})