const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

describe('register', () => {
    let client, users

    let name, surname, email, password, repassword

    name = `name-${Math.random()}`
    surname = `surname-${Math.random()}`
    email = `email-${Math.random()}@domain.com`
    password = `password-${Math.random()}`
    repassword = password
   
    before(() => {

        client = new MongoClient('mongodb://localhost', { useNewUrlParser: true, useUnifiedTopology: true })

        return client.connect()
            .then(() => {
                const db = client.db('my-api-test')

                users = db.collection('users')

                logic.__users__ = users

            })
            .then(() => users.deleteMany())
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

    it('should fail on email already registered', () =>
        logic.registerUser(name, surname, email, password, repassword)
            .catch(error => expect(error.message).to.equal('Email is already registered'))
    )
    after(() => client.close())
})