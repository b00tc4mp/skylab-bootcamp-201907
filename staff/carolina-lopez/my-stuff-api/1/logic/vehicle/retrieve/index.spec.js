const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - retrieve vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    let vehicleId, make, model, year, type, color, electric, plate

    beforeEach(async () => {
        const typeArray = ['sedan', 'cabrio', 'truck']

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

        const user = await User.create({ name, surname, email, password })
        
        const vehicle = await Vehicle.create({ make, model, year, type, color, electric, plate })

        vehicleId = vehicle.id
    })

    it('should succeed on correct data', async () => {
        const vehicle = await logic.vehicle.retrieve(vehicleId)
                expect(vehicle).to.exist
                expect(vehicle.id).to.equal(vehicleId)
                expect(vehicle.make).to.equal(make)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.electric).to.equal(electric)
    }) 

    it('should fail if the id is not a string', () => 
        expect(() => logic.vehicle.retrieve(1234).to.throw(`vehicle with id ${1234} does not exist`))
    )

    after(() => mongoose.disconnect())
})