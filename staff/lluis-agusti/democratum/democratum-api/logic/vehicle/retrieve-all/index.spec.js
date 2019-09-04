const mongoose = require('mongoose')
const logic = require('../..')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic retrieve all vehicles', () => {
    
    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))
    let make1, model1, year1, type1, color1, electric1, plate1, vehicleId1
    let make2, model2, year2, type2, color2, electric2, plate2, vehicleId2
    let name, surname, email, password, userId

    beforeEach(async () => {
        const typeArray = ['sedan', 'suv', 'van', 'coupe', 'cabrio', 'roadster', 'truck']
        make1 = `vehbrand-${Math.random()}`
        model1 = `vehmodel-${Math.random()}`
        year1 = Number((Math.random()*1000).toFixed())
        type1 = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color1 = `vehcolor-${Math.random()}`
        electric1 = Boolean(Math.round(Math.random()))
        plate1 = `vehplate-${Math.random()}`

        make2 = `vehbrand-${Math.random()}`
        model2 = `vehmodel-${Math.random()}`
        year2 = Number((Math.random()*1000).toFixed())
        type2 = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color2 = `vehcolor-${Math.random()}`
        electric2 = Boolean(Math.round(Math.random()))
        plate2 = `vehplate-${Math.random()}`

        await Vehicle.deleteMany()
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

        await User.deleteMany() //delete old users

            const user = await User.create({ name, surname,email, password })
            userId = user.id
            
                 
            const vehicle1 = await Vehicle.create({ make: make1, model: model1, year: year1, type: type1, color: color1, electric: electric1, plate: plate1, 'owner': userId }) 
            vehicleId1 = vehicle1.id
            
            const vehicle2 = await Vehicle.create({ make: make2, model: model2, year: year2, type: type2, color: color2, electric: electric2, plate: plate2, 'owner': userId }) 
            vehicleId2 = vehicle2.id      
    })
    
    //////////////////
        it('should succeed on correct retrieve vehicle', async () => {

            const vehicle = await logic.vehicle.retrieveAll(userId)
                    expect(vehicle[0]).to.exist
                    expect(vehicle[1]).to.exist
        })

        it('should fail if the id is not a string', () =>
        expect(() => logic.vehicle.retrieveAll(12345678).to.throw("id with value '12345678' is not a string")))
        
        it('should fail if the id is empty or blank', () =>
        expect(() => logic.vehicle.retrieveAll().to.throw("id is empty or blank")))

    after(() => mongoose.disconnect())
})

