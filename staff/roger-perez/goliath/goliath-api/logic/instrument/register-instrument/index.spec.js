const { expect } = require('chai')
const logic = require('../../')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - register user', () => {

    before(() => mongoose.connect('mongodb://localhost/goliath-api-test', { useNewUrlParser: true }))

    let name, surname, instrument, description, email, password

    beforeEach(() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        instrument = `instrument-${Math.random()}`
        description = `description-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

       
        return User.deleteMany()
    })

    it('should succeed on correct data', () =>
        logic.registerUser(name, surname, instrument, description, email, password)
            .then(result => {
                expect(result).not.to.exist

                return User.findOne({ email })
            })
            .then(user => {
                expect(user).to.exist
                expect(user.name).to.equal(name)
                expect(user.surname).to.equal(surname)
                expect(user.instrument).to.equal(instrument)
                expect(user.description).to.equal(description)
                expect(user.email).to.equal(email)
                expect(user.password).to.equal(password)
            })
    )

    // name
    it('should fail on empty name', () => 
        expect(() => 
               logic.registerUser('', surname, instrument,description, email, password)
    ).to.throw('name is empty or blank')
    )

     it('should fail on undefined name', () => 
        expect(() => 
               logic.registerUser(undefined, surname, instrument,description, email, password)
    ).to.throw(`name with value undefined is not a string`)
    )

     it('should fail on wrong name data type', () => 
        expect(() => 
               logic.registerUser(123, surname, instrument,description, email, password)
    ).to.throw(`name with value 123 is not a string`)
    )

    // surname
    it('should fail on empty surname', () => 
        expect(() => 
               logic.registerUser(name, '',description, email, password)
    ).to.throw('surname is empty or blank')
    )

     it('should fail on undefined surname', () => 
        expect(() => 
               logic.registerUser(name, undefined,description, email, password)
    ).to.throw(`surname with value undefined is not a string`)
    )

     it('should fail on wrong surname data type', () => 
        expect(() => 
               logic.registerUser(name, 123,description, email, password)
    ).to.throw(`surname with value 123 is not a string`)
    )

   
    // instrument
    it('should fail on empty instrument', () => 
        expect(() => 
            logic.registerUser(name,surname, '',description, email, password)
    ).to.throw('instrument is empty or blank')
    )

     it('should fail on undefined instrument', () => 
        expect(() => 
               logic.registerUser(name,surname, undefined,description, email, password)
    ).to.throw(`instrument with value undefined is not a string`)
    )

     it('should fail on wrong instrument data type', () => 
        expect(() => 
               logic.registerUser(name, surname, 123,description, email, password)
    ).to.throw(`instrument with value 123 is not a string`)
    )

    // description
    it('should fail on empty description', () => 
        expect(() => 
               logic.registerUser(name, surname,instrument,'', email, password)
    ).to.throw('description is empty or blank')
    )

     it('should fail on undefined description', () => 
        expect(() => 
               logic.registerUser(name, surname,instrument,undefined, email, password)
    ).to.throw(`description with value undefined is not a string`)
    )

     it('should fail on wrong description data type', () => 
        expect(() => 
               logic.registerUser(name, surname, instrument,123, email, password)
    ).to.throw(`description with value 123 is not a string`)
    )


    // email
     it('should fail on undefined email', () => 
        expect(() => 
               logic.registerUser(name, surname, instrument,description, undefined, password)
    ).to.throw(`email with value undefined is not a string`)
    )

     it('should fail on wrong email data type', () => 
        expect(() => 
               logic.registerUser(name, surname, instrument,description, 123, password)
    ).to.throw(`email with value 123 is not a string`)
    )

    // password
    it('should fail on empty password', () => 
        expect(() => 
               logic.registerUser(name, surname, instrument,description, email, '')
    ).to.throw('password is empty or blank')
    )

     it('should fail on undefined password', () => 
        expect(() => 
               logic.registerUser(name, surname, instrument,description, email, undefined)
    ).to.throw(`password with value undefined is not a string`)
    )

     it('should fail on wrong password data type', () => 
        expect(() => 
               logic.registerUser(name, surname, instrument,description, email, 123)
    ).to.throw(`password with value 123 is not a string`)
    )

    // after(() => client.close())
    after(() => mongoose.disconnect())
})