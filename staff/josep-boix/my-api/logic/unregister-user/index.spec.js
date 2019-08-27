const {MongoClient} = require('mongodb')
const logic = require('..')
const { expect } = require('chai')
const { ObjectId } = require('mongodb')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost',{ useNewUrlParser: true, useUnifiedTopology:true})
        return client.connect()
        .then (() => {
            const db = client.db ('my-api-test')
            
            users = db.collection ('users')
            
            logic.__users__ = users
        })
    })

    beforeEach(() => users.deleteMany())

    describe('unregister user', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`

            return users.deleteMany()
                .then(() => users.insertOne({ name, surname, email, password }))
                .then(result => id = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.unregisterUser(id, password)
                .then(result => {
                    expect(result).not.to.exist

                    return users.findOne({ _id: ObjectId(id) })
                })
                .then(user => {
                    expect(user).not.to.exist
                })
        )

        it ('should fail on empty or blank id', () => {
            expect (() => {logic.unregisterUser('',password)}).to.throw('id is empty or blank')
        })

        it('should fail on unexisting user', () =>
            logic.unregisterUser('5d625b3c33d621f180994569', password)
                .then(result => {
                    expect (result).to.undefined
                })
                .catch(({ message }) => expect(message).to.equal('wrong credentials'))
        )

        it ('should fail on empty or blank password', () => {
            expect (() => {logic.unregisterUser(email,'')}).to.throw('password is empty or blank')
        })

        it('should fail on existing user, but wrong password', () =>
            logic.unregisterUser(id, 'wrong-password')
                .then(result => { 
                    expect(result).to.undefined
                })
                .catch(({ message }) => expect(message).to.equal('wrong credentials'))
        )
    })
    after (() => client.close())
})