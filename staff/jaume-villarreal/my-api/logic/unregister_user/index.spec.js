const data = require('../../data')
const { expect } = require('chai')
const logic = require('.'
const { ObjectId } = require('mongodb') 

describe('logic', () => {
    let client, users

    before(() => {
        data('mongodb://loclahost' , 'my-api-test')
            .then( ({ client:_client , database }) => {
                client = _client
                users = database.collection('users')
                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

     describe('remove', () => {
        let name, surname, email, password , userId

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name , surname , email , password })
                .then( result => userId = result.insertedId.toString())
        })

        it('should succeed on correct data', () =>
            logic.removeUser(userId , password)
                .then( response => {
                    expect(response).to.exist
                    expect(response.deletedCount).to.equal(1)
                })
        )
    })

    after(() => client.close())
})