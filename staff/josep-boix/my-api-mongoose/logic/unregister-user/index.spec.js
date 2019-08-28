const {User} = require('../../data')
const mongoose = require ('mongoose')
const logic = require('..')
const { expect } = require('chai')

describe ('logic', () => {

    before(() => {
        mongoose.connect('mongodb://localhost/my-api-test', {useNewUrlParser:true})
    })

    beforeEach(() => User.deleteMany())

    describe('unregister user', () => {
        let name, surname, email, password, id

        beforeEach(() => {
            name = `name-${Math.random()}`
            surname = `surname-${Math.random()}`
            email = `email-${Math.random()}@mail.com`
            password = `password-${Math.random()}`

            return User.deleteMany()
                .then(() => User.create({ name, surname, email, password }))
                .then(result => id = result.id)
        })

        it('should succeed on correct data', () =>
            logic.unregisterUser(id, password)
                .then(result => {
                    expect(result).not.to.exist

                    return User.findById(id)
                })
                .then(user => {
                    expect(user).not.to.exist
                })
        )

        it ('should fail on empty or blank id', () => {
            expect (() => {logic.unregisterUser('',password)}).to.throw('id is empty or blank')
        })

        it('should fail on unexisting user', () =>
            logic.unregisterUser('5d625b3c33d621f180994569', password)
                .then(result => {
                    expect (result).to.undefined
                })
                .catch(({ message }) => expect(message).to.equal('wrong credentials'))
        )

        it ('should fail on empty or blank password', () => {
            expect (() => {logic.unregisterUser(email,'')}).to.throw('password is empty or blank')
        })

        it('should fail on existing user, but wrong password', () =>
            logic.unregisterUser(id, 'wrong-password')
                .then(result => { 
                    expect(result).to.undefined
                })
                .catch(({ message }) => expect(message).to.equal('wrong credentials'))
        )
    })
    after (() => mongoose.disconnect())
})