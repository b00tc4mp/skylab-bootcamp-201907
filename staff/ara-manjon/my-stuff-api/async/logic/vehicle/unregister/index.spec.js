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

describe('logic - unregister vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test', {
        useNewUrlParser: true
    }))

    let id, brand, model, year, type, color, electric, plate
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
            .then(() => Vehicle.create({ brand, model, year, type, color, electric, plate }))
            .then(vehicle => vehicleId = vehicle.id)
    })

    it('should succeed on correct unregister vehicle', () =>
        logic.vehicle.unregister(vehicleId)
        .then(result => {
            expect(result).not.to.exist

            return Vehicle.findById(vehicleId)
        })
        .then(vehicle => {
            expect(vehicle).not.to.exist
        })
    )
    it('should fail on unexisting vehicle', () =>
    logic.vehicle.unregister('5d5d5530531d455f75da9fF9')
        .then(() => { throw Error('should not reach this point') })
        .catch(({ message }) => expect(message).to.equal('Wrong id provided.'))
)
    after(() => mongoose.disconnect())
})