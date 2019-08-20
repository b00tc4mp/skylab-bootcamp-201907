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
        let email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            repassword = password
            users.insertOne({ name , surname , email , password})
        })

        it('should succeed on correct data', () =>
            logic.authenticateUser(email, password)
                .then( data => {
                    expect(data).to.exist
                    expect(data.email).to.equal(email)
                    expect(data.password).to.equal(password)
                })
            )
        
        it('should fail on wrong password', () =>
            expect(() => {
                    logic.authenticateUser(email , 'aaa') 
                }).to.throw('Wrong credentials')
            )
    })

    after(() => client.close())
})