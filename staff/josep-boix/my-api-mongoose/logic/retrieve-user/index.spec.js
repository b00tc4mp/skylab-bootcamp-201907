const { User } = require ('../../data')
const { expect } = require ('chai')
const logic = require ('..')
const mongoose = require ('mongoose')

describe ('logic', () => {

    before (() => {
        mongoose.connect('mongodb://localhost/my-api-test', {useNewUrlParser: true})
    })

    beforeEach(() => User.deleteMany())
    
    describe ('retrieve user', () => {
        let name, surname, email, password, id

        beforeEach (() => {
            name = `name-${Math.random()}` 
            surname = `surname-${Math.random()}` 
            email = `email-${Math.random()}@mail.com` 
            password = `password-${Math.random()}` 

            return User.deleteMany() 
                .then (() => User.create ({name, surname, email, password, password}))
                .then (result => id = result.id)
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

    after(() => mongoose.disconnect())
})