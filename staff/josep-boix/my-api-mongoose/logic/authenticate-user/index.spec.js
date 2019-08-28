const logic = require ('..')
const mongoose = require ('mongoose')
const {User} = require ('../../data')
const {expect} = require ('chai')

describe ('logic', () => {

    describe ('authenticate user', () => {
        let name, surname, email, password

        before(() => {
            mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true })
        })


        beforeEach (() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`
            
    
            return User.deleteMany()
                .then(() => User.create({ name, surname, email, password }))
                .then(user => {
                    id = user.id})
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

        it ('should fail on non-valid email data', () =>
            expect(() => {logic.authenticateUser('josepbOixvillar#gmail.com', password)}).to.throw ('email with value josepbOixvillar#gmail.com is not a valid e-mail')
        )

        it ('should fail on non-correct email data', () =>
            logic.authenticateUser('wrongemail@gmail.com', password)
                .then (data => {
                    expect(data).not.to.exist
                })
                .catch(error => {
                    expect (error).to.exist
                    expect (error.message).to.equal('Wrong credentials')
                })
        )

        it ('should fail on empty password data', () =>
            expect (() =>  {logic.authenticateUser(email, '')}).to.throw ('password is empty or blank')
        )

        it ('should fail on non-correct password data', () =>
            logic.authenticateUser(email, 'wrong password')
                .then (data => {
                    expect(data).not.to.exist
                })
                .catch(error => {
                    expect (error).to.exist
                    expect (error.message).to.equal('Wrong credentials')
                })
        )

        after(() => mongoose.disconnect())
    })
})