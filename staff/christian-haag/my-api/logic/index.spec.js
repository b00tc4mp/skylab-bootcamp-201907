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

    describe('register', () => {
        let name, surname, email, password, repassword

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
        })

        it('should succeed on correct data', () =>
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => users.findOne({ email }))
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )
    })

    describe('authenticate', () => {


        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            users.insertOne({ name, surname, email, password })

        })

        it('should suceed on correct data', () =>
            logic.registerUser(name, surname, email, password)
                .then(() => {
                    logic.authenticateUser(email, password)
                        .then(data => {
                            expect(data).to.exist
                            expect(data.id).to.equal(email)
                            expect(data.token).to.equal(password)
                        })
                        .catch(error => { error })
                })
        )
    })

    after(() => client.close())
})