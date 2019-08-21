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

            users.insertOne({ name, surname, email, password })
                .then(res => id = res.insertedId.toString())

        })

        it('should suceed on correct data', () =>
            logic.authenticateUser(email, password)
                .then(res => {
                    expect(res).to.exist
                    expect(res).to.be.a('string')
                    expect(res).to.not.equal(id)
                })
                .catch(error => { error })

        )

        it('schould suceed on wrong email', () => {
            const _email = 'fake@mail.com'
            logic.authenticateUser(_email, password)
                .then(data => {
                    expect(data).to.exist
                    expect(_email).to.not.equal(email)
                    expect(password).to.equal(password)
                })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal('wrong credentials')
                })
        })

        it('schould suceed on wrong credentials', () => {
            const _password = 'kldjbnfkjabfkb'
            debugger
            logic.authenticateUser(email, _password)
                .then(data => {
                    expect(data).to.exist
                    expect(_email).to.not.equal(email)
                    expect(password).to.equal(password)
                })
                .catch(error => {
                    expect(error).to.exist
                    expect(error.message).to.equal('wrong credentials')
                })
        })

    })

    after(() => client.close())
})