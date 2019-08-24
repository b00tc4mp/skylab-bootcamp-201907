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
        logic.authenticateVehicle(email, password)
            .then(_id => {
                expect(_id).to.exist
                expect(_id).to.be.a('string')
                expect(_id).to.equal(id)
            })
    )

    after(() => mongoose.disconnect())
})