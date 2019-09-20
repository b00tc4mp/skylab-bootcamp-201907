const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - retrieve vehicle', () => {
    
    let name,surname,email,password
    let make, model, year, type, color, electric, plate, id, vehicleId
    const typeArray = ['sedan', 'cabrio', 'truck']
    let x="5d5d5530531d455f75da9fF9"


    before(() => mongoose.connect('mongodb://localhost/my-api-test', { useNewUrlParser: true }))

    beforeEach(async() => {

                name = `name-${Math.random()}`
                surname = `surname-${Math.random()}`
                email = `email-${Math.random()}@email.com`
                password = `123-${Math.random()}`
                make = `vehbrand-${Math.random()}`

                model = `vehmodel-${Math.random()}`
                year = Number((Math.random()*1000).toFixed())
                type = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
                color = `vehcolor-${Math.random()}`
                electric = Boolean(Math.round(Math.random()))
                plate = `vehplate-${Math.random()}`

        await User.deleteMany()
                     // Register user first to make sure it exists
                const user=await User.create({ name, surname, email, password })
                id = user.id // es el mateix que user._id.toString())
                const vehicle=await new Vehicle({id, make, model, year, type, color, electric, plate})
                return await vehicle.save() //retornes l'usuari guardat
                      
    })

    it('should succeed on correct data',  () =>{        
        logic.vehicle.retrieve(id)   
            .then(vehicle => { 
                expect(vehicle).to.exist
                expect(vehicle.id).to.equal(vehicleId)
                expect(vehicle.make).to.equal(make)
                expect(vehicle.model).to.equal(model)
                expect(vehicle.year).to.equal(year)
                expect(vehicle.type).to.equal(type)
                expect(vehicle.color).to.equal(color)
                expect(vehicle.electric).to.equal(electric)
            })}    
    )

    it('should fail if id is not correct', async () =>{
        try{
            await logic.vehicle.retrieve(x)

        }catch(error){
            expect(error).to.exist
                   expect(error.message).to.equal(`Vehicle with id ${x} does not exist.`)

        }
    }         
    ) 

    after(() => mongoose.disconnect())
})


/* number = `1-${Math.random()}`
            expiry = `"0"+${Math.floor(Math.random() * 9)}/"0"+${Math.floor(Math.random() * 9)}`
             */