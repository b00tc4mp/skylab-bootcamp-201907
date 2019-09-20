const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - register property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let id, address, m2, year, cadastre

    beforeEach(async() => {
        address = `address-${Math.random()}`
        m2 = Number((Math.random()*10).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadastre-${Math.random()}`

        await Property.deleteMany()
            
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                const user=await User.create({ name, surname, email, password })
                id = user._id.toString()
            
    })

    it('should succeed on correct data',async () =>{
        const result= await logic.property.register(id, address, m2, year, cadastre)
        
                propertyId = result
                expect(propertyId).to.exist
                const property= await Property.findOne({ cadastre })
           
                expect(property).to.exist
                expect(property.id).to.equal(propertyId)
                expect(property.address).to.equal(address)
                expect(property.m2).to.equal(m2)
                expect(property.year).to.equal(year)
                expect(property.cadastre).to.equal(cadastre)
    })

    it('should fail if the property already exists',async () =>{
        await Property.create({ id, address, m2, year, cadastre })
        try{
            await logic.property.register(id, address, m2, year, cadastre)
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('Property already exists.')
        }
    })

    /* 
       Property.create({ id, address, m2, year, cadastre })
           .then (() => logic.property.register(id, address, m2, year, cadastre)
               .catch( error =>{
                   expect(error).to.exist
                   expect(error.message).to.equal('Property already exists.')
               })
           ) */



    it('should fail on empty address', () => 
        expect(() => 
               logic.property.register(id, '', m2, year, cadastre)
    ).to.throw('address is empty or blank')
    )

     it('should fail on undefined address', () => 
        expect(() => 
               logic.property.register(id, undefined, m2, year, cadastre)
    ).to.throw(`address with value undefined is not a string`)
    )

 

    after(() => mongoose.disconnect())
})