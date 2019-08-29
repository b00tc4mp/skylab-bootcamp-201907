const { MongoClient, ObjectId } = require('mongodb')
const { expect } = require('chai')
const logic = require('../.')

describe('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('my-api')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe('update user', () => {
        let userId, name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name, surname, email, password })
                .then(result => userId = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.updateUser(userId, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
                .then(user => {
                    expect(user).not.to.exist
                    return users.findOne({ _id: ObjectId(userId) })
                })
                .then(user => {
                    expect(user).to.exist
                    expect(user.name).to.equal('newName')
                    expect(user.surname).to.equal('newSurname')
                    expect(user.email).to.equal('new@email.com')
                    expect(user.password).to.equal('newPassword')
                })
        )

        it('should fail on empty id', () =>
            expect(() =>
                logic.updateUser('', { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
            ).to.throw('id is empty or blank')
        )

        it('should fail on undefined id', () =>
            expect(() =>
                logic.updateUser(undefined, { name: 'newName', surname: 'newSurname', email: 'new@email.com', password: 'newPassword' })
            ).to.throw('id with value undefined is not a string')
        )

    })

    after(() => client.close())
})