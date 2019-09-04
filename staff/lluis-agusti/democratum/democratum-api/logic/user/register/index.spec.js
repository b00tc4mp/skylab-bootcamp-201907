const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { Citizen } = require('../../../models')

describe.only('logic - register citizen', () => {

    before(() =>  mongoose.connect('mongodb://localhost/democratum-test', { useNewUrlParser: true }))
        
    let fullname, address, documentId, email, imgDocId, password, participatedPolls

    beforeEach(async () => {
        fullname = `fullname-${Math.random()}`
        address = `address-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        password = `password-${Math.random()}`
        password = `password-${Math.random()}`
        password = `password-${Math.random()}`
        password = `password-${Math.random()}`
        password = `password-${Math.random()}`
        password = `password-${Math.random()}`

        await Citizen.deleteMany()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.user.register(name, surname, email, password, password)
            
        expect(result).not.to.exist
        const user = await User.findOne({ email })
    
        expect(user).to.exist
        expect(user.name).to.equal(name)
        expect(user.surname).to.equal(surname)
        expect(user.email).to.equal(email)
        expect(user.password).to.eq(password)
    })

    after(() => mongoose.disconnect())
})