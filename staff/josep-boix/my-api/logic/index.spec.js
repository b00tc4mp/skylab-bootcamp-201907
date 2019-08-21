const {MongoClient} = require ('mongodb')
const {expect} = require ('chai')
const logic = require ('.')

describe ('logic', () => {
    let client, users

    before (() => {
        client = new MongoClient('mongodb://localhost')

        return client.connect()
            .then (() => {
                const db = client.db ('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach (() => users.deleteMany())

    describe ('register', () => {
        let name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `name-${Math.random()}`
        })

        it ('should success on correct data', () =>
            logic.registerUser(name, surname, email, password, password)
                .then (result => {
                    expect (result).not.to.exist

                    return users.findOne({email})
                })
                .then (user => {
                    expect(user).to.exist
                    expect(user.name).to.equal(name)
                    expect(user.surname).to.equal(surname)
                    expect(user.email).to.equal(email)
                    expect(user.password).to.equal(password)
                })
        )

        // it ('should fail on empty data', () =>
        //     logic.registerUser('', surname, email, password, password)
        //         .then (response => {
        //             expect(response).not.to.exist
        //             expect(response.name).to.equal('')
        //             expect(response.surname).to.equal(surname)
        //             expect(response.email).to.equal(email)
        //             expect(response.password).to.equal(password)
        //         })
        // )
    })

    describe ('authenticate', () => {
        beforeEach (() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
            
            return users.insertOne({ name, surname, email, password })
                .then (result => id = result.insertedId.toString()) // it will be necessary to equal _id (from mongo) with id (obtained from insertOne from it's ObjectId generate)
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

    })
    
    after(() => client.close())
})