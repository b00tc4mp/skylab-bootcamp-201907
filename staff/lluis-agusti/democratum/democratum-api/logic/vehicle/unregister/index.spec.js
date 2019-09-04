const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - unregister vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let make, model, year, type, color, electric, plate, id, vehicleId
    
    const typeArray = ['sedan', 'cabrio', 'truck']

    beforeEach(async () => {

        make = `vehbrand-${Math.random()}`
        model = `vehmodel-${Math.random()}`
        year = Number((Math.random()*1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `vehcolor-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `vehplate-${Math.random()}`

        await Vehicle.deleteMany()
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

        await User.create({ name, surname, email, password })
        const vehicle = await Vehicle.create({ make, model, year, type, color, electric, plate })

        vehicleId = vehicle.id
    })

    it('should succeed on correct data', async () =>{

    const result = await logic.vehicle.unregister(vehicleId)
    
    expect(result).not.to.exist
    
    const vehicle = await Vehicle.findById(vehicleId)
    
    expect(vehicle).not.to.exist
    })

    it('should fail on unexisting vehicle', async () => {
        try{
            await logic.vehicle.unregister('5d5d5530531d455f75da9fF9')

        }catch({ message }){
            expect(message).to.equal('wrong credentials')
        }
    })
       

    after(() => mongoose.disconnect())
})