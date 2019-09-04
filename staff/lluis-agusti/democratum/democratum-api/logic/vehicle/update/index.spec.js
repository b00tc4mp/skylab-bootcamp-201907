const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')


describe('logic - update vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let id, make, model, year, type, color, electric, plate, extra

    const typeArray = ['sedan', 'cabrio', 'truck']

    beforeEach(async () => {

        make = `vehbrand-${Math.random()}`
        model = `vehmodel-${Math.random()}`
        year = Number((Math.random()*1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `vehcolor-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `vehplate-${Math.random()}`

        body = {
            color : `vehcolor-${Math.random()}`,
            extra: `vehextra-${Math.random()}`
        }
        
        await Vehicle.deleteMany()
       
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.create({ name, surname, email, password })

        const vehicle = await Vehicle.create({ make, model, year, type, color, electric, plate, extra })

        id = vehicle.id
    })

    it('should succeed on correct data', async () => {
        const result = await logic.vehicle.update(id, body)
        expect(result).not.to.exist

        const vehicle = await Vehicle.findById(id)
        
        expect(vehicle).to.exist
        expect(vehicle.color).to.equal(body.color)
        expect(vehicle.extra).to.equal(body.extra) 
            
    })

     it('should fail on non-existing vehicle', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await logic.vehicle.update(id, body )
        }catch({ message }){
            expect(message).to.equal(`vehicle with id ${id} does not exist`)
        }
    }) 

    after(() => mongoose.disconnect())
})