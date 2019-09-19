const { expect } = require('chai')
const logic = require('../../')
const { User } = require('../../../data')
const mongoose = require('mongoose')

describe.only('logic - authenticate user', () => {
    before(() => mongoose.connect('mongodb://localhost/goliath-api-test', { useNewUrlParser: true }))

    let name, surname, instrument, descritpion, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        instrument = `instrument-${Math.random()}`
        description = `description-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        drumkits= [],
        admin=false

        await User.deleteMany()
        const user = await User.create({ name, surname, instrument,description, email, password,drumkits,admin })
        id = user.id
    })

    it('should succeed on correct data', async () => {
        const _id = await logic.authenticateUser(email, password)
        
        expect(_id).to.exist
        expect(_id).to.be.a('string')
        expect(_id).to.equal(id)
    })

    it('should fail on wrong e-mail', async () => {
        email = 'invalid@mail.com'

        try {
            await logic.authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal(`wrong credentials`)
        }
    })

    it('should fail on wrong password', async () => {
        password = 'wrong password'

        try {
            await logic.authenticateUser(email, password)

            throw new Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong credentials')
        }
    })

   it('should fail on undefined email', () => 
        expect(() => 
               logic.authenticateUser(undefined, password)
    ).to.throw(`e-mail with value undefined is not a string`)
    )

     it('should fail on wrong email data type', () => 
        expect(() => 
               logic.authenticateUser(123, password)
    ).to.throw(`e-mail with value 123 is not a string`)
    )

    it('should fail on empty password', () => 
        expect(() => 
               logic.authenticateUser(email, '')
    ).to.throw('password is empty or blank')
    )

     it('should fail on undefined password', () => 
        expect(() => 
               logic.authenticateUser(email, undefined)
    ).to.throw(`password with value undefined is not a string`)
    )

     it('should fail on wrong password data type', () => 
        expect(() => 
               logic.authenticateUser(email, 123)
    ).to.throw(`password with value 123 is not a string`)
    ) 

  
    after(() => mongoose.disconnect())
})