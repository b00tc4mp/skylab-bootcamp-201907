const { expect } = require('chai')
const logic = require('..')
// const data = require('../../data')
// Add:
const { User } = require('../../data')
const mongoose = require('mongoose')

describe('logic - authenticate user', () => {
    /* let client, users
    before(() => {
        return data('mongodb://localhost', 'my-api-test')
            .then(({ client: _client, db }) => {
                client = _client

                users = db.collection('users')

                logic.__users__ = users
            })
    }) */

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        // users --> User
        return User.deleteMany()
            // replace users.insertOne() MongoDB method with User.create() Mongoose method.
            .then(() => User.create({ name, surname, email, password })
                // .then(result => id = result.insertedId.toString()))
                .then(user => id = user.id))
    })

    it('should succeed on correct data', () =>
        logic.authenticateUser(email, password)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )

    it('should fail on wrong email', () => 
    logic.authenticateUser('Jhon@email.com', password)
    .then(_id => {
        expect(_id).to.be.undefined
    })
    .catch(error =>{
        expect(error).to.exist
        expect(error.message).to.equal('wrong credentials')
    })
    )
    it('should fail on wrong password', ()=>
    logic.authenticateUser(email, 'dajhfkasf')
    .then(data => {
        expect(data).to.be.undefined
    })
    .catch(error=>{
        expect(error).to.exist
        expect(error.message).to.equal('wrong credentials')
    })
    )

    // after(() => client.close())
    after(() => mongoose.disconnect())
})