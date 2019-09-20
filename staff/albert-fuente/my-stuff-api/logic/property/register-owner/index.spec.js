const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Property } = require('../../../models')

describe('logic - registerOwner property', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let id1, address, m2, year, cadastre
    let propertyId, id2
    let name2, surname2, email2, password2
    let name, surname, email, password

    beforeEach(async() => {
        address = `address-${Math.random()}`
        m2 = 123 //Number((Math.random()*10).toFixed())
        year = Number((Math.random() * 1000).toFixed())
        cadastre = `cadastre-${Math.random()}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email2 = `email-${Math.random()}@email.com`
        password2 = `123-${Math.random()}`

        await Property.deleteMany()
           
               let user= await User.create({ name, surname, email, password })
           
                id1 = user.id
                let _user= await  User.create({ name: name2, surname: surname2, email: email2, password: password2 })
          
                id2 = _user.id
                let property= await  Property.create({ address, m2, year, cadastre })
               
                propertyId = property._id.toString()
        
    })

    it('should succeed on correct data',async () =>{
        const _propertyId=await logic.property.registerOwner(propertyId, id2)

                expect(_propertyId).to.exist
                const property=await Property.findOne({ _id: _propertyId })
                
                const match = property.owners.find(owner => owner._id.toString() === id2)
                expect(match).to.exist
    })

   
    
        it('should fail on empty propertyId', () => 
            expect(() => 
                   logic.property.registerOwner('',id2)
        ).to.throw('Property id is empty or blank')
        )
    
         it('should fail on empty id2', () => 
            expect(() => 
                   logic.property.registerOwner(propertyId,"")
        ).to.throw('Owner id is empty or blank')
        ) 



    after(() => mongoose.disconnect())
})