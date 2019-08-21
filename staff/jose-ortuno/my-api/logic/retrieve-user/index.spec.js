const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')

xdescribe('logic', () => {
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
    
    describe('register', () => {
        let name, surname, email, password, repassword
    
        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`
            repassword = password
        })
       
        describe('registered', () => {
            it('should succeed on correct data', () => 
                logic.registerUser(name, surname, email, password, repassword)
                    .then(() => users.findOne({ name }))
                    .then(user => {
                        expect(user).to.exist
                        expect(user.name).to.equal(name)
                        expect(user.surname).to.equal(surname)
                        expect(user.email).to.equal(email)
                        expect(user.password).to.equal(password)
                    })
            )

            it('existing user', () => 
                logic.registerUser(name, surname, email, password, repassword)
                    .then(() => users.findOne({ name }))
                    .catch(error => {
                        expect(error).to.exist
                        expect(error.message).to.equal('Email already registered') 
                    })
            )
        })

    })

    after(() => client.close())
})