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
         let name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            // Mongo DB driver. Return of promise needed.
            return users.insertOne({ name, surname, email, password })
                .then(result => id = result.insertedId.toString())
        })

/*             it('should succed on correct data', () => {
                logic.authenticateUser(email, password)
                .then(credentials => {
                    expect(credentials).to.exist
                    expect(credentials.id).to.exist
                    expect(data.token).to.exist
                })
            }) */

            it('should succed on correct data', () => {
                logic.authenticateUser(email, password)
                .then(_id => {
                    expect(_id).to.exist
                    expect(_id).to.be.a('string')
                    expect(_id).to.equal(id)
                })
            })
            
            it('should fail on wrong email', () => 
            logic.authenticateUser('Jhon@email.com', password)
            .then(_id => {
                expect(_id).to.be.undefined
            })
            .catch(error =>{
                expect(error).to.exist
                expect(error.message).to.equal('Wrong credentials.')
            })
            )
            it('should fail on wrong password', ()=>
            logic.authenticateUser(email, 'dajhfkasf')
            .then(data => {
                expect(data).to.be.undefined
            })
            .catch(error=>{
                expect(error).to.exist
                expect(error.message).to.equal('Wrong credentials.')
            })
            )
    })

    after(() => client.close())
})