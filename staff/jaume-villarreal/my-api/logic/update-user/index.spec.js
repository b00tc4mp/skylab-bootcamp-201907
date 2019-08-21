const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const { ObjectId } = require('mongodb')
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

     describe('update', () => {
        let name, surname, email, password , userId

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@domain.com`
            password = `password-${Math.random()}`

            return users.insertOne({ name , surname , email , password })
                .then( result => userId = result.insertedId.toString())
        })

        it("should update new name" , () =>
            logic.updateUser(userId , "John" , surname , email , password)
                .then( response => {
                    expect(response.modifiedCount).to.equal(1)
                    return users.findOne({ _id : ObjectId(userId) })
                })
                .then(user => {
                    debugger
                    expect(user.name).to.equal('John')
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )
        
        it("should update new surname" , () =>
            logic.updateUser(userId , name , "Doe" , email , password)
                .then( response => {
                    expect(response.modifiedCount).to.equal(1)
                    return users.findOne({ _id : ObjectId(userId) })
                })
                .then(user => {
                    debugger
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal("Doe")
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )
        
        it("should update new email" , () =>
            logic.updateUser(userId , name , surname , "b@mail.com" , password)
                .then( response => {
                    expect(response.modifiedCount).to.equal(1)
                    return users.findOne({ _id : ObjectId(userId) })
                })
                .then(user => {
                    debugger
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal('b@mail.com')
                    expect(user.password).to.equal(password)
                })
        )
        
        it("should update new password" , () =>
            logic.updateUser(userId , name , surname , email , 'abc')
                .then( response => {
                    expect(response.modifiedCount).to.equal(1)
                    return users.findOne({ _id : ObjectId(userId) })
                })
                .then(user => {
                    debugger
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal('abc')
                })
        )
    })

    after(() => client.close())
})