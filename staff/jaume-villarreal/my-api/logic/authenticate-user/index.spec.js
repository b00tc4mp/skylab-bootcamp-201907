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
        let email, password , userId

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            repassword = password
            return users.insertOne({ name , surname , email , password})
            .then(data => {
                    debugger
                    userId = data._id
                })
        })

        it('should succeed on correct data', () => {
            
            logic.authenticateUser(email,password)
            .then(data => {
                expect(data).to.equal(userId)
            })
        })  

        it('should fail on wrong mail', () =>
            logic.authenticateUser('a@mail.com' , password)
                .then(data => {
                    expect(data).to.be.undefined()
                })
                .catch(error => {
                    expect(error.message).to.equal('Wrong credentials')
                })
        )
        
        it('should fail on wrong password', () =>
            logic.authenticateUser(email , '123')
                .then(data => {
                    expect(data).to.be.undefined()
                })
                .catch(error => {
                    expect(error.message).to.equal('Wrong credentials')
                })
        )

        after(() => client.close())
    })
})
