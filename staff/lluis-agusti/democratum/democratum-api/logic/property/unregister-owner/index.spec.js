const mongoose = require('mongoose')
const logic = require('../..')
const { expect } = require('chai')
const { User, Property } = require('../../../models')


describe('logic - unregister owner', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    
    let propertyId, ownerId1, ownerId2
    let address, m2, year, cadastre
    let name, surname, email, password
    let name2, surname2, email2, password2
    
    beforeEach(() => {

        address = `proaddr-${Math.random()}`
        m2 = Number((Math.random()*1000).toFixed())
        year = Number((Math.random()*1000).toFixed())
        cadastre = `cadaddr-${Math.random()}`
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email2 = `email-${Math.random()}@email.com`
        password2 = `123-${Math.random()}`
        
        const user1 = new User({ name, surname, email, password })
        ownerId1 = user1.id
        const user2 = new User({ name: name2, surname: surname2, email: email2, password: password2 })
        ownerId2 = user2.id
        
        const newProperty = new Property({ address, m2, year, cadastre })
        propertyId = newProperty.id
        newProperty.owners.push(ownerId1)
        newProperty.owners.push(ownerId2)
        return Promise.all([user1.save(), user2.save(), newProperty.save()])
    })

    it('should succeed on correct data', async () => {
      const response = await logic.property.unregisterOwner(propertyId, ownerId2)
      expect(response).not.to.exist
      const property = await Property.findById(propertyId)
      const match = property.owners.find(owner => owner.id === ownerId2)
      expect(match).not.to.exist

  })
    after(() => mongoose.disconnect())
})


// const mongoose = require('mongoose')
// const logic = require('../../.')
// const { expect } = require('chai')
// const { User, Property } = require('../../../models')


// describe.only('logic - unregister owner', () => {
    
//   before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
//     let propertyId, ownerId, registerdOwner

//     beforeEach(async () => {
//         address = `proaddr-${Math.random()}`
//         m2 = Number((Math.random()*1000).toFixed())
//         year = Number((Math.random()*1000).toFixed())
//         cadastre = `cadaddr-${Math.random()}`

//         await Property.deleteMany()

//         name = `name-${Math.random()}`
//         surname = `surname-${Math.random()}`
//         email = `email-${Math.random()}@email.com`
//         password = `123-${Math.random()}`
//         const user = await User.create({ name, surname, email, password })
//         ownerId = user.id
               
//         const property = await new Property({ address, m2, year, cadastre })
//         propertyId = property.id
//         property.owners.push(ownerId)
//         return  await property.save()
            
//     })
//     it('should succeed on correct data', async () => {

//         const property = await logic.property.unregisterOwner(propertyId, ownerId)
//         registerdOwner = property.owners.find(owner => owner.toString() === ownerId)
//         expect(registerdOwner).not.to.exist
//         await Property.findOne({_id: propertyId})

//         expect(property).to.not.exist
   
            
//     })
//     after(() => mongoose.disconnect())
// })