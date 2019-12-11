const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../data')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let address, m2, year, cadastre, id, propertyId

    beforeEach(async () => {

        address = `proaddr-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadaddr-${Math.random()}`

        await Property.deleteMany()
            
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        const user = await User.create({ name, surname, email, password })
            
        id = user._id.toString()
    })

    it('should succeed on correct data', async () => {
        debugger
        const _id = await logic.property.register(id, address, m2, year, cadastre)
           
        propertyId = _id
        expect(propertyId).to.exist
        const property = await Property.findOne({ cadastre })
                        
        expect(property).to.exist
        expect(property.id).to.equal(propertyId)
        expect(property.address).to.equal(address)
        expect(property.m2).to.equal(m2)
        expect(property.year).to.equal(year)
        expect(property.cadastre).to.equal(cadastre)

        })

    it('should fail if the property already exists', async () =>{
        try{
            await Property.create({ address, m2, year, cadastre })
            await logic.property.register(id, address, m2, year, cadastre)
       }catch(error){
           expect(error).to.exist
           expect(error.message).to.equal(`Property already exists.`)
       }
    })

    it('should fail on empty address', async () => {
        try{
            await logic.property.register(id, ' ', m2, year, cadastre)

        }catch({message}){
            expect(message).to.equal('address is empty or blank')

        }
    })

    it('should fail on undefined address', async () =>{
        try{
            await logic.property.register(id, undefined, m2, year, cadastre)
        }catch({message}){
            expect(message).to.equal('address with value undefined is not a string')
        }
    })

    it('should fail on wrong data type', async () => {
        try{
            await logic.property.register(id, 123, m2, year, cadastre)

        }catch({message}){
            expect(message).to.equal('address with value 123 is not a string')
        }
    })
    after(() => mongoose.disconnect())
})