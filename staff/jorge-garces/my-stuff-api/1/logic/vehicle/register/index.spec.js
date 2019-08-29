const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - register vehicle', () => {

    before(() => mongoose.connect('mongodb://172.17.0.2/my-stuff-api-test', { useNewUrlParser: true }))

    let make, model, year, type, color, electric, plate, id, vehicleId

    beforeEach(() => {
        const typeArray = ['sedan', 'cabrio', 'truck']

        make = `vehbrand-${Math.random()}`
        model = `vehmodel-${Math.random()}`
        year = Number((Math.random()* (2019-1980) + 1980).toFixed())
        type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
        color = `vehcolor-${Math.random()}`
        electric = Boolean(Math.round(Math.random()))
        plate = `vehplate-${Math.random()}`

        return ( async() => {
            await Vehicle.deleteMany()
            
                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`

                const user =  await User.create({ name, surname, email, password })
                id = user._id.toString()
        })()
    })

    it('should succeed on correct data', async () =>{
        debugger
       const vehicle = await logic.vehicle.register(id, make, model, year, type, color, electric, plate)
                expect(vehicle).to.exist
                const vehicleFound = await Vehicle.findOne({ plate })
                expect(vehicleFound).to.exist
                expect(vehicleFound.id).to.equal(vehicle)
                expect(vehicleFound.make).to.equal(make)
                expect(vehicleFound.model).to.equal(model)
                expect(vehicleFound.year).to.equal(year)
                expect(vehicleFound.type).to.equal(type)
                expect(vehicleFound.color).to.equal(color)
                expect(vehicleFound.electric).to.equal(electric)
    })


   

    it('should fail if the vehicle already exists', async () =>{
        try {
            await Vehicle.create({ make, model, year, type, color, electric, plate })
            const vehicle = await logic.vehicle.register(id, make, model, year, type, color, electric, plate)
        }
        catch({message}){
            expect(message).to.exist
            expect(message).to.equal(`Vehicle already exists.`) 
        }
               
           })
        
    

    /* Make */
    it('should fail on empty make', () => 
        expect(() => 
               logic.vehicle.register(id, '', model, year, type, color, electric, plate)
    ).to.throw('make is empty or blank')
    )

     it('should fail on undefined make', () => 
        expect(() => 
               logic.vehicle.register(id, undefined, model, year, type, color, electric, plate)
    ).to.throw(`make with value undefined is not a string`)
    )

     it('should fail on wrong data type', () => 
        expect(() => 
               logic.vehicle.register(id, 123, model, year, type, color, electric, plate)
    ).to.throw(`make with value 123 is not a string`)
    )

    /* Model */
    it('should fail on empty model', () => 
        expect(() => 
               logic.vehicle.register(id, make, '', year, type, color, electric, plate)
    ).to.throw('model is empty or blank')
    )

     it('should fail on undefined model', () => 
        expect(() => 
               logic.vehicle.register(id, make, undefined, year, type, color, electric, plate)
    ).to.throw(`model with value undefined is not a string`)
    )

     it('should fail on wrong data type for model', () => 
        expect(() => 
               logic.vehicle.register(id, make, 123, year, type, color, electric, plate)
    ).to.throw(`model with value 123 is not a string`)
    )

    /* Year */
    it('should fail on empty year', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, '', type, color, electric, plate)
    ).to.throw('year is empty or blank')
    )

     it('should fail on undefined year', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, undefined, type, color, electric, plate)
    ).to.throw(`year with value undefined is not a number`)
    )

     it('should fail on wrong data type for year', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, 'aaa', type, color, electric, plate)
    ).to.throw(`year with value aaa is not a number`)
    )

    /* Type */
    it('should fail on empty type', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, '', color, electric, plate)
    ).to.throw('type is empty or blank')
    )

     it('should fail on undefined make', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, undefined, color, electric, plate)
    ).to.throw(`type with value undefined is not a string`)
    )

     it('should fail on wrong data type', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, 123, color, electric, plate)
    ).to.throw(`type with value 123 is not a string`)
    )

    /* Color */
    it('should fail on empty color', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, type, '', electric, plate)
    ).to.throw('color is empty or blank')
    )

     it('should fail on undefined color', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, type, undefined, electric, plate)
    ).to.throw(`color with value undefined is not a string`)
    )

     it('should fail on wrong data type for color', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, type, 123, electric, plate)
    ).to.throw(`color with value 123 is not a string`)
    )

     /* Electric */
    it('should fail on empty electric', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, type, color, '', plate)
    ).to.throw('electric is empty or blank')
    )

     it('should fail on undefined electric', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, type, color, undefined, plate)
    ).to.throw(`electric with value undefined is not a boolean`)
    )

     it('should fail on wrong data type for electric', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, type, color, 123, plate)
    ).to.throw(`electric with value 123 is not a boolean`)
    )

     /* Plate */
    it('should fail on empty plate', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, type, color, electric, '')
    ).to.throw('plate is empty or blank')
    )

     it('should fail on undefined make', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, type, color, electric, undefined)
    ).to.throw(`plate with value undefined is not a string`)
    )

     it('should fail on wrong data type for plate', () => 
        expect(() => 
               logic.vehicle.register(id, make, model, year, type, color, electric, 123)
    ).to.throw(`plate with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})