const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('../')

describe('Logic - Update user', () => {
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

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return users.insertOne({ name, surname, email, password })
            .then(result => id = result.insertedId.toString())
    })

    it('should update name with correct succes', () =>
        logic.updateUser(id, {
            name: 'armando'
        })
            .then(response => {
                expect(response).not.to.exist
            })
            .then(() => users.findOne({ email }))
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal('armando')
                expect(user.surname).to.equal(surname)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )

    it('should succed error when id no exist', () =>
        logic.updateUser('5d5d5fcb844eae22d1cbd34b', {
            name: 'armando'
        })
            .then(response => expect(response).not.to.exist)
            .catch(error => expect(error.message).to.equal('user does not exist or is not find'))
    )

   it('should succed error second param empty', () => {
        try {
            logic.updateUser('5d5d5fcb844eae22d1cbd34b')
        } catch (error) {
            expect(error.message).to.equal('second param is empty or is not object');
        }
    })

    it('should succed error update object is empty', () => {
        try {
            logic.updateUser('5d5d5fcb844eae22d1cbd34b', {})
        } catch (error) {
            expect(error.message).to.equal('update object is empty');
        }
    })

    after(() => client.close())
})