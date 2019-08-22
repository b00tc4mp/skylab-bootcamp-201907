const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../.')


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

    describe('update user', () => {
        let name, surname, email, password, id

        const newEmail = 'new-email@gmail.com'

        beforeEach(() => {
            name = `U_name-${Math.random()}`
            surname = `U_surname-${Math.random()}`
            email = `U_email-${Math.random()}@domain.com`
            password = `U_password-${Math.random()}`

            return users.insertOne({ name, surname, email, password, id })
                .then(result => id = result.insertedId.toString())
        })

        it('should update email', () => {
            return logic.updateUser(id, 'email', newEmail)
                .then(() => {
                    users.findOne({ id })
                        .then(user => {
                            expect(user.id).to.equal(id)
                            expect(user.mail).to.equal(newMail)
                            expect(mail).to.not.equal(newMail)
                            expect(user.name).to.equal(name)
                        })
                })

        })

    })
})