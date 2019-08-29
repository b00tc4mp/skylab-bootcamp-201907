const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - retrieve all vehicle', () => {

    before(() => mongoose.connect('mongodb://localhost/my-stuff-api-test', { useNewUrlParser: true }))

    let make, make2, model, model2, year, year2, type, type2, color, color2, electric, electric2, plate, plate2
    let userId, name, surname, email, password, vehIdOne, vehIdTwo

    beforeEach(() => {
        const typeArray = ['sedan', 'cabrio', 'truck']

        make = `vehbrand-${Math.random()}`
        model = `vehmodel-${Math.random()}`
        year = Number((Math.random()* (2019-1980) + 1980).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `vehcolor-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `vehplate-${Math.random()}`
        
        make2 = `vehbrand-${Math.random()}`
        model2 = `vehmodel-${Math.random()}`
        year2 = Number((Math.random()* (2019-1980) + 1980).toFixed())
        type2 = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color2 = `vehcolor-${Math.random()}`
        electric2 = Boolean(Math.round(Math.random()))
        plate2 = `vehplate-${Math.random()}`

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        return ( async() => {
          await Vehicle.deleteMany()
                const newUser = new User({ name, surname, email, password })
                userId = newUser.id
                const vehicleOne = new Vehicle({ make, model, year, type, color, electric, plate})
                const vehicleTwo = new Vehicle({ make: make2, model: model2, year: year2, type: type2, color: color2, electric: electric2, plate: plate2})
                vehIdOne = vehicleOne.id
                vehIdTwo = vehicleTwo.id
                vehicleOne.owner.push(userId)
                vehicleTwo.owner.push(userId)
                return await Promise.all([newUser.save(), vehicleOne.save(), vehicleTwo.save()])
        })()
    })

    it('should succeed on correct data', async () =>{
        const vehicles = await logic.vehicle.retrieveAll(userId)
           
                expect(vehicles).to.exist
                expect(vehicles.length).to.equal(2)
                const vehOne = vehicles.find(vehicle => vehicle.id.toString() === vehIdOne)
                const vehTwo = vehicles.find(vehicle => vehicle.id.toString() === vehIdTwo)
                expect(vehOne.make).to.equal(make)
                expect(vehOne.model).to.equal(model)
                expect(vehOne.year).to.equal(year)
                expect(vehOne.type).to.equal(type)
                expect(vehOne.color).to.equal(color)
                expect(vehOne.electric).to.equal(electric)
                expect(vehOne.plate).to.equal(plate)
                expect(vehTwo.make).to.equal(make2)
                expect(vehTwo.model).to.equal(model2)
                expect(vehTwo.year).to.equal(year2)
                expect(vehTwo.type).to.equal(type2)
                expect(vehTwo.color).to.equal(color2)
                expect(vehTwo.electric).to.equal(electric2)
                expect(vehTwo.plate).to.equal(plate2)
            
    })

    it('should fail if the user owns no vehicles', async () => {
        try {
            await Vehicle.deleteMany()
            const vehicle = await logic.vehicle.retrieveAll(userId)
        }catch ({message}){
            expect(message).to.exist
            expect(message).to.equal(`User with id ${userId} does not own any vehicle.`)
        }
                   
    })

    /* Make */
    it('should fail on empty User ID', () => 
        expect(() => 
               logic.vehicle.retrieveAll('')
    ).to.throw('User ID is empty or blank')
    )

     it('should fail on undefined User ID', () => 
        expect(() => 
               logic.vehicle.retrieveAll(undefined)
    ).to.throw(`User ID with value undefined is not a string`)
    )

     it('should fail on wrong data type for User ID', () => 
        expect(() => 
               logic.vehicle.retrieveAll(123)
    ).to.throw(`User ID with value 123 is not a string`)
    )

})