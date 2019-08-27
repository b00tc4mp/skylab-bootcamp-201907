const { MongoClient } = require ('mongodb')
const { expect } = require ('chai')
const logic = require ('..')

describe ('logic', () => {
    let client, users

    before (() => {
        client = new MongoClient ('mongodb://localhost',{ useNewUrlParser: true, useUnifiedTopology:true} )
        return client.connect()
            .then (() => {
                const db = client.db ('my-api-test')

                users = db.collection ('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())
    
    describe ('retrieve user', () => {
        let name, surname, email, password, id

        beforeEach (() => {
            name = `name-${Math.random()}` 
            surname = `surname-${Math.random()}` 
            email = `email-${Math.random()}@mail.com` 
            password = `password-${Math.random()}` 

            return users.deleteMany() 
                .then (() => users.insertOne ({name, surname, email, password}))
                .then (result => id = result.insertedId.toString())
        })

        it ('should succed on correct data', () => {
            logic.retrieveUser(id)
                .then (user => {
                    expect (user).to.exist
                    expect(user.message).to.undefined
                    expect(user.id).to.equal(id)
                    expect(user._id).not.to.exist                
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).not.to.exist

                })
        })

        it ('should fail on incorrect id', () => {
            logic.retrieveUser ('5d625b3c33d621f180994569')
                .then (user => {
                    expect(user).not.to.exist
                })
                .catch (error => {
                    expect (error).to.exist
                    expect (error.message).to.equal('user with id 5d625b3c33d621f180994569 not found')
                })
        })

        it ('should fail on non-id', () => {
            expect(() => {logic.retrieveUser('')}).to.throw ('id is empty or blank')
        })
    })
    after(() => client.close())
})