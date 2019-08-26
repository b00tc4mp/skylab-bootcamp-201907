const logic = require ('..')
const { MongoClient } = require ('mongodb')
const { expect } = require ('chai')

describe ('logic', () => {
    let client, users

    before(() => {
        client = new MongoClient ( 'mongodb://localhost',{ useNewUrlParser: true, useUnifiedTopology:true} )
        return client.connect()
            .then (() => {
                const db = client.db ('my-api-test')

                users = db.collection('users')

                logic.__users__ = users
            })
    })

    beforeEach(() => users.deleteMany())

    describe ('register user', () => {

        let name, surname, email, password

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
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

        it ('should fail if user have been already registered', () =>
            logic.registerUser (name, surname, 'josepboixvillar@gmail.com', password, password)
                .then (user => {
                    expect (user).to.undefined
                })
                .catch (error => {
                    expect (error).to.exist
                    expect (error.message).to.equal (`User with email josepboixvillar@gmail.com already exists.`)
                })
        )

        it ('should fail on empty name data', () =>
            expect (() =>  {logic.registerUser('', surname, email, password, password)}).to.throw ('name is empty or blank')
        )

        it ('should fail on empty surname data', () =>
            expect (() =>  {logic.registerUser(name, '', email, password, password)}).to.throw ('surname is empty or blank')
        )

        it ('should fail on empty email data', () =>
            expect (() =>  {logic.registerUser(name, surname, '', password, password)}).to.throw ('email is empty or blank')
        )

        it ('should fail on non email data', () =>
        expect (() =>  {logic.registerUser(name, surname, 'josepboixvillar#gmail.com', password, password)}).to.throw ('email with value josepboixvillar#gmail.com is not a valid e-mail')
        )
        
        it ('should fail on empty password data', () =>
            expect (() =>  {logic.registerUser(name, surname, email, '', '')}).to.throw ('password is empty or blank')
        )

        it ('should fail on non passwords coincedences', () =>
            expect (() =>  {logic.registerUser(name, surname, email, '123', '456')}).to.throw ('passwords do not match.')
        )

    after(() => client.close())
    })
})