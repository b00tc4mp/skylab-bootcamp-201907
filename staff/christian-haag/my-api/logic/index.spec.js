const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const { logic } = require()
describe('logic', () => {
    before(() => {
        //crear cliente
        const client = new MongoClient('mongodb://localhost')
        //conectar
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
            surname = `name-${Math.random()}`
            email = `mail`
        })
        it('should succed on correct data', () => {
            logic.registerUser(name, surname, email, password, repassword)
                .then(() => users.findOne({ name }))
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        })
    })
})