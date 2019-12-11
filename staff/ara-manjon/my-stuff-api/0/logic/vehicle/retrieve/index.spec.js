const {
    expect
} = require('chai')
const logic = require('../../.')
const {
    Vehicle
} = require('../../../data')
const {
    User
} = require('../../../data')
const mongoose = require('mongoose')

describe('logic - retrieve vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', {
        useNewUrlParser: true
    }))

    let brand, model, year, type, color, electric, plate, vehicleId
    beforeEach(() => {
        const typeArray = ['car', 'motorcycle', 'truck', 'caravan', 'camper van', 'delivery van', 'bicycle']
        brand = `brand-${Math.random()}`
        model = `model-${Math.random()}`
        year = Number((Math.random() * 1000).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `color-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `plate-${Math.floor(Math.random()*(899-100))}`

        
        return Vehicle.deleteMany()
            .then(() => {

                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@domain.com`
                password = `password-${Math.random()}`

                return User.create({
                    name,
                    surname,
                    email,
                    password
                })

            })
            .then(() => {
                
                return Vehicle.create({ brand, model, year, type, color, electric, plate})
            })
            
            .then(vehicle => {
                vehicleId = vehicle.id
            })
    })


    it('should succeed on correct retrieve vehicle', () =>
        logic.vehicle.retrieve(vehicleId)
        .then(vehicle => {
            expect(vehicle).to.exist
            expect(vehicle.id).to.equal(vehicleId)
            expect(vehicle.brand).to.equal(brand)
            expect(vehicle.model).to.equal(model)
            expect(vehicle.year).to.equal(year)
            expect(vehicle.type).to.equal(type)
            expect(vehicle.color).to.equal(color)
            expect(vehicle.electric).to.equal(electric)
        })
    )
    it('should fail if the id is not a string', () =>
        expect(()=>logic.vehicle.retrieve(12334455).to.throw(`id with value '12334455' is not a string`))            
        )
    it('should fail if the id is empty or blank', () =>
        expect(()=>logic.vehicle.retrieve().to.throw(`id is empty or blank`))            
        )

    after(() => mongoose.disconnect())
})
