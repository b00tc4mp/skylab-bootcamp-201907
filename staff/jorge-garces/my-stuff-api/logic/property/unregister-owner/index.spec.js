const { MongoClient, ObjectId } = require('mongodb')
const { expect } = require('chai')
const logic = require('../.')

describe('logic', () => {

    let client, users

    before(() => {

        client = new MongoClient('mongodb://172.17.0.2', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return client.connect()
            .then(() => {
                const db = client.db('skylab')
                users = db.collection('users')
                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('unregister', () => {
        let name, surname, email, password, repassword
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

        it('should remove user on correct data', () => {
            logic.unregisterUser(id, email, password)
                .then(response => {
                    expect(response).to.exist
                    expect(response.deletedCount).to.equal(1)
                    return users.findOne({ _id: ObjectId(id) })
                }).then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
                .catch(error => expect(error).not.to.exist)
            })
    })

    after(() => client.close())

})