const { MongoClient } = require('mongodb')
const { expect } = require('chai')
const logic = require('.')


describe('update user', () => {
    let name, surname, email, password, id

    before(() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then(() => {
                const db = client.db('skylab')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return users.insertOne({ name, surname, email, password })
            .then(result => id = result.insertedId.toString())
    })

    it('should succed on correct updating user', () => {
        
        let _name, _surname, _password

        _name = `neWname-${Math.random()}`
        _surname = `neWsurname-${Math.random()}`
        _password = `neWpassword-${Math.random()}`

        logic.updateUser(email, _name, _surname, _password)
            .then(() => {
                users.findOne({ email }, { projection: { _id: 0 }})
                    .then(user =>{
                        expect(user).to.exist
                        expect(user.name).to.equal(_name)
                        expect(user.surname).to.equal(_surname)
                        expect(user.password).to.equal(_password)
                    })


            })


    })


})