const { expect } = require('chai')
const logic = require('..')
const { Vehicle } = require('../../data')
const mongoose = require('mongoose')

describe('logic - register vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api', { useNewUrlParser: true }))

    let brand, model, year, type, color, electric

    beforeEach(() => {
        brand = `vehbrand-${Math.random()}`
        model = `vehmodel-${Math.random()}`
        year = `${Math.random()}`
        type = `vehtype-${Math.random()}`
        color = `vehcolor-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        // al loro con el Boolean!!!!!
        //https://stackoverflow.com/questions/36756331/js-generate-random-boolean


        return Vehicle.deleteMany()
    })

    it('should succeed on correct data', () =>
        logic.registerVehicle(brand, model, year, type, color, electric)
            .then(result => {
                expect(result).not.to.exist // shure?????

                return Vehicle.findOne({ ObjectId }) // no lo veo claro que sea ObjectId!
            })
            .then(user => {
                expect(vehicle).to.exist
                expect(vehicle.brand).to.equal(brand)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.electric).to.equal(electric)
            })
    )

    after(() => mongoose.disconnect())
})