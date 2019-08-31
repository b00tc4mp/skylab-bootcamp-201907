const mongoose = require('mongoose')
const logic = require('../../.')
const { expect } = require('chai')
const { User, Vehicle } = require('../../../models')

describe('logic - remove  vehicle', () => {
    
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
            .then(() => User.create({ name, surname, email, password }))
            .then(user =>{
                id = user.id // es el mateix que user._id.toString())
                
                const vehicle=new Vehicle({id, make, model, year, type, color, electric, plate})
                return vehicle.save() //retornes l'usuari guardat
            })  
            .then(vehicle=>vehcileId=vehicle.id)          
    })

    it('should succeed on correct data',async () =>{        
        const vehicle= await logic.vehicle.unregister(vehcileId)   
          
                expect(vehicle).not.to.exist
         }    
    )

    it('should fail if id is not correct',async () =>{
        try{
            await logic.vehicle.unregister(x)

        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`Wrong id provided.`)

        }
    }
           
    ) 

    after(() => mongoose.disconnect())
})


/* number = `1-${Math.random()}`
            expiry = `"0"+${Math.floor(Math.random() * 9)}/"0"+${Math.floor(Math.random() * 9)}`
             */