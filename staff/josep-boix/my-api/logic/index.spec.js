const {MongoClient} = require ('mongodb')
const {expect} = require ('chai')
const logic = require ('.')

describe ('logic', () => {
    let client, users

    before (() => {
        client = new MongoClient('mongodb://localhost', {useNewUrlParser: true, useUnifiedTopology: true})

        return client.connect()
            .then (() => {
                const db = client.db ('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach (() => users.deleteMany())

    describe ('register user', () => {
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

        it ('should fail on empty name data', () =>
            expect (() =>  {logic.registerUser('', surname, email, password)}).to.throw ('name is empty or blank')
        )

        it ('should fail on empty surname data', () =>
            expect (() =>  {logic.registerUser(name, '', email, password)}).to.throw ('surname is empty or blank')
        )

        it ('should fail on empty email data', () =>
            expect (() =>  {logic.registerUser(name, surname, '', password)}).to.throw ('email is empty or blank')
        )

        it ('should fail on empty password data', () =>
            expect (() =>  {logic.registerUser(name, surname, email, '')}).to.throw ('password is empty or blank')
        )

    })

    describe ('authenticate user', () => {
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
        
        it ('should fail on empty email data', () =>
            expect (() =>  {logic.authenticateUser('', password)}).to.throw ('email is empty or blank')
        )

        it ('should fail on empty password data', () =>
            expect (() =>  {logic.authenticateUser(email, '')}).to.throw ('password is empty or blank')
        )

    })

    describe ('retrieve user', () => {
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
    })
    
    after(() => client.close())
})