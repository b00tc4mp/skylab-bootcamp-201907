const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../data')

describe('logic - register owner', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let propertyId, ownerId, registerdOwner, property

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
            ownerId= user.id
            
            
            const property = await new Property({ address, m2, year, cadastre })
            propertyId = property.id
            property.owners.push(ownerId)
            return  await property.save()
            
    })

    it('should succeed on correct data', async () =>{
        const property = await logic.property.registerOwner(propertyId, ownerId)
             
        registerdOwner = property.owners.find(owner => owner.toString() === ownerId)
        expect(registerdOwner).to.exist
        await Property.findOne({_id: propertyId})            
        expect(property).to.exist
        expect(property.id).to.equal(propertyId)
        expect(property.address).to.equal(address)
        expect(property.m2).to.equal(m2)
        expect(property.year).to.equal(year)
        expect(property.cadastre).to.equal(cadastre)
        }
    )

     it('should fail if the user already exists', async () =>{
        
        try{
            const property= await logic.property.registerOwner(propertyId, ownerId)
            property.owners.push(ownerId)
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`Owner already registered in property with id ${propertyId}`)
               }
            })

    after(() => mongoose.disconnect())
})
