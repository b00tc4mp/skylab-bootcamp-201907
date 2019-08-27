const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../data')


describe.only('logic - update vehicle', () => {
    before(() => mongoose.connect('mongodb://localhost/my-api-test',  { useNewUrlParser: true }))

    let id, brand, model, year, type, color, electric, plate, extra

    beforeEach(() => {
        const typeArray = ['car', 'motorcycle', 'truck', 'caravan', 'camper van', 'delivery van', 'bicycle']

        brand = `vehbrand-${Math.random()}`
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
        
        return Vehicle.deleteMany()
        .then(()=>{
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        return User.create({ name, surname, email, password })

    })
    .then(() => Vehicle.create({ brand, model, year, type, color, electric, plate, extra }))

    .then(vehicle => id = vehicle.id)

    })
    it('should succeed on correct data', () =>
        logic.vehicle.update(id, body)
            .then(result => {
                expect(result).not.to.exist

                return Vehicle.findById(id)
            })
            .then(vehicle => {
                expect(vehicle).to.exist
                expect(vehicle.color).to.equal(body.color)
                expect(vehicle.extra).to.equal(body.extra) 
            })
    )

     it('should fail on non-existing vehicle', () => {
        id = '5d5d5530531d455f75da9fF9'

        return logic.vehicle.update(id, body )
            .then(() => { throw new Error('should not reach this point') })
            .catch(({ message }) => expect(message).to.equal(`Vehicle with id ${id} does not exist.`))
    }) 

    after(() => mongoose.disconnect())
})