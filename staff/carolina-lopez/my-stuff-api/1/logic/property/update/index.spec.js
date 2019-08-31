const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')


describe('logic - update property', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let id, address, m2, year, cadastre

    beforeEach(async () => {

        address = `address-${Math.random()}`
        m2 = Number((Math.random()*500).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadastre-${Math.random()}`

        body = {
            address : `newAddress-${Math.random()}`,
            m2: Number((Math.random()*1000).toFixed())
        }
        
        await Property.deleteMany()
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.create({ name, surname, email, password })

        const property = await Property.create({ address, m2, year, cadastre })

        id = property.id
    })

    it('should succeed on correct data', async () => {

        const result = await logic.property.update(id, body)
        expect(result).not.to.exist

        const property = await Property.findById(id)
        
        expect(property).to.exist
        expect(property.color).to.equal(body.color)
        expect(property.extra).to.equal(body.extra) 
    })

     it('should fail on non-existing property', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await logic.property.update(id, body)
        } catch ({ message }){
             expect(message).to.equal(`property with id ${id} does not exist`)
        }
    }) 

    after(() => mongoose.disconnect())
})