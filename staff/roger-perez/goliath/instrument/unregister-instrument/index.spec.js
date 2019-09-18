const { expect } = require('chai')
const logic = require('../../')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - unregister user', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let name, surname,instrument,description, email, password, id

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        instrument = `instrument-${Math.random()}`
        description = `description-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        // users --> User
        return User.deleteMany()
            .then(() => User.create({ name, surname,instrument,description, email, password }))
            .then(user => id = user.id)
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

    it('should fail on unexisting user', () =>
        logic.unregisterUser('5d5d5530531d455f75da9fF9', password)
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    it('should fail on existing user, but wrong password', () =>
        logic.unregisterUser(id, 'wrong-password')
            .then(() => { throw Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal('wrong credentials'))
    )

    it('should fail on empty id', () => 
        expect(() => 
               logic.unregisterUser('', password)
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.unregisterUser(undefined, password)
    ).to.throw(`id with value undefined is not a string`)
    )

     it('should fail on wrong id data type', () => 
        expect(() => 
               logic.unregisterUser(123, password)
    ).to.throw(`id with value 123 is not a string`)
    )

    it('should fail on empty password', () => 
        expect(() => 
               logic.unregisterUser(id, '')
    ).to.throw('password is empty or blank')
    )

     it('should fail on undefined password', () => 
        expect(() => 
               logic.unregisterUser(id, undefined)
    ).to.throw(`password with value undefined is not a string`)
    )

     it('should fail on wrong password data type', () => 
        expect(() => 
               logic.unregisterUser(id, 123)
    ).to.throw(`password with value 123 is not a string`)
    )


    
    after(() => mongoose.disconnect())
})