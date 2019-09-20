const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - update vehicle', () => {
    
    let name,surname,email,password
    let make, model, year, type, color, electric, plate, id, vehicleId
    let model2, year2, type2, color2, electric2, plate2
    const typeArray = ['sedan', 'cabrio', 'truck']
    let x="5d5d5530531d455f75da9fF9"
    let body={}


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
                
                
                model2 = `vehmodel-${Math.random()}`
                year2 = Number((Math.random()*1000).toFixed())
                type2 = `${typeArray[Math.floor(Math.random() * typeArray.length)]}`
                color2 = `vehcolor-${Math.random()}`
                electric2 = Boolean(Math.round(Math.random()))
                plate2 = `vehplate-${Math.random()}`
                   
                
                body={
                    'model' : model2,
                    'year' : year2,
                    'type' : type2,
                    'color' : color2,
                    'electric' : electric2,
                    'plate' : plate2
                    }
                    

        await User.deleteMany()
                     // Register user first to make sure it exists
            const user=await User.create({ name, surname, email, password })
            
                id = user.id // es el mateix que user._id.toString())
                
                const vehicle= await new Vehicle({id, make, model, year, type, color, electric, plate})
                return await vehicle.save() //retornes l'usuari guardat
                       
    })

    it('should succeed on correct data', () =>{        
        logic.vehicle.update(id,body)   
            .then(vehicle => { 
                
                expect(vehicle).to.exist
                expect(vehicle.id).to.equal(body.id)
                expect(vehicle.make).to.equal(body.make)
                expect(vehicle.model).to.equal(body.model)
                expect(vehicle.year).to.equal(body.year)
                expect(vehicle.type).to.equal(body.type)
                expect(vehicle.color).to.equal(body.color)
                expect(vehicle.electric).to.equal(body.electric)
            })}    
    )

    it('should fail if id is not correct', async () =>
    {
        try{
            await logic.vehicle.update(x,body)
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