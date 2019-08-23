const data = require ('../../data')
const {expect} = require ('chai')
const logic = require ('.')

describe ('authenticate user', () => {
    let client, users

    beforeEach(() => {
        return data ('mongo://localhost', 'my-api-test')
            .then (({ client: _client, db }) => {
                client = _client

                users = db.collection ('users')

                logic.__users__ = users
            })
    })

    let name, surname, email, password

    beforeEach (() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        return users.insertOne({ name, surname, email, password })
            .then (result => id = result.insertedId.toString()) 
        // it will be necessary to equalize _id (from mongo) and id (get it in insertOne from ObjectId generated)
    })

    it ('should succed on correct data', () => 
        logic.authenticateUser (email, password)
            .then (_id => {
                expect (_id).to.exist
                expect (_id).to.be.a('string')
                expect (_id).to.equal(id)
            })
    )

    it ('should fail on wrong email', () =>
        logic.authenticateUser ('wrong@mail.com', password)
            .then (data => {
                expect (data).to.be.undefined
            }).catch (error => {
                expect (error).to.exist
                expect (error.message).to.equal ('Wrong credentials')
            })
    )

    it ('should fail on wrong password', () =>
        logic.authenticateUser (email, 'wrong-password')
            .then (data => {
                expect (data).to.be.undefined
            }).catch (error => {
                expect (error).to.exist
                expect (error.message).to.equal ('Wrong credentials')
            })
    )
    
    it ('should fail on empty email data', () =>
        expect (() =>  {logic.authenticateUser('', password)}).to.throw ('email is empty or blank')
    )

    it ('should fail on empty password data', () =>
        expect (() =>  {logic.authenticateUser(email, '')}).to.throw ('password is empty or blank')
    )

    after(() => client.close())
})
