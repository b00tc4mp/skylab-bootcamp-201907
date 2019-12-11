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

describe('logic - register vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', {
        useNewUrlParser: true
    }))

    let id, brand, model, year, type, color, electric, plate, vehicleId
    
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
            .then(user => id = user._id.toString())
            
    })

    it('should succeed on correct registered vehicle', () =>
        logic.vehicle.register(id, brand, model, year, type, color, electric, plate)
        .then(result => {
            vehicleId = result
            expect(result).to.exist
            return Vehicle.findOne({
                plate
            })
        })

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
    it('should fail if the vehicle alredy', () =>
        Vehicle.create({
            id,
            brand,
            model,
            year,
            type,
            color,
            electric,
            plate
        })
        .then(() => logic.vehicle.register(id, brand, model, year, type, color, electric, plate)
            .catch(error => {
                expect(error).to.exist
                expect(error.message).to.equal(`Vehicle already exists.`)
            })
        ))
    it('should fail on empty brand', () =>
        expect(() =>
            logic.vehicle.register(id, '', model, year, type, color, electric, plate)
        ).to.throw('brand is empty or blank')
    )

    it('should fail on undefined make', () =>
        expect(() =>
            logic.vehicle.register(id, undefined, model, year, type, color, electric, plate)
        ).to.throw(`brand with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.vehicle.register(id, 123, model, year, type, color, electric, plate)
        ).to.throw(`brand with value 123 is not a string`)
    )
    after(() => mongoose.disconnect())
})