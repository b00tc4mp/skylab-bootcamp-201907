const { expect } = require('chai')
const logic = require('../../')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve user', () => {

    before(() => mongoose.connect('mongodb://localhost/goliath-api-test', { useNewUrlParser: true }))

    let name, surname,instrument,descrption, email, password, id

    beforeEach(async() => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        instrument = `instrument-${Math.random()}`
        description = `description-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()
        const user = await User.create({ name, surname,instrument,description, email, password })
        id = user.id
    })



    it('should succeed on correct data', async () =>{
        const user = await logic.retrieveUser(id)
        expect(user).to.exist
        expect(user.id).to.equal(id)
        expect(user._id).not.to.exist
        expect(user.name).to.equal(name)
        expect(user.instrument).to.equal(instrument)
        expect(user.descrption).to.equal(descrption)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).not.to.exist
    })

    it('should fail on empty id', () => 
        expect(() => 
               logic.retrieveUser('')
    ).to.throw('id is empty or blank')
    )

     it('should fail on undefined id', () => 
        expect(() => 
               logic.retrieveUser(undefined)
    ).to.throw(`id with value undefined is not a string`)
    )

     it('should fail on wrong id data type', () => 
        expect(() => 
               logic.retrieveUser(123)
    ).to.throw(`id with value 123 is not a string`)
    )

    // after(() => client.close())
    after(() => mongoose.disconnect())
})