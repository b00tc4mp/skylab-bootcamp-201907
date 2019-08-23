const data = require ('../../data')
const { expect } = require ('chai')
const logic = require ('.')

describe ('retrieve user', () => {
    let client, users

    beforeEach (() => {
        return data ('mongodb://localhost', 'my-api-test')
            .then (({ client: _client, db }) => {
                client = _client

                users = db.collection ('users')

                logic.__users__ = users
            })
    })

    let name, surname, email, password, id

    beforeEach (() => {
        name = `name-${Math.random()}` 
        surname = `surname-${Math.random()}` 
        email = `email-${Math.random()}@mail.com` 
        password = `password-${Math.random()}` 

        return users.insertOne ({name, surname, email, password})
            .then (result => id = result.insertedId.toString())
    })

    it ('should succed on correct data', () => {
        logic.retrieveUser(id)
            .then (user => {
                expect (user).to.exist
            })
    })

    after(() => client.close())

})