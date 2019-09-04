require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve league', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameLeague, leagueId

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`

        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            
            const users = await User.create({name, surname, email, password})
            id = users.id
            const league = await League.create({id, name: nameLeague})
            leagueId = league.id
        })()


    })

     it('should succeed on correct data', async () => {
            
        const result = await logic.retrieveLeague(id, nameLeague)
        
            expect(result).to.exist
            expect(result.team).to.exist 
            expect(result.id).to.equal(leagueId)
            expect(result.name).to.equal(nameLeague)  
        })
        
        it('should fail if the league already exists', async () => {

            try {
             const newVehicle = new Vehicle({ make, model, year, type, color, electric, plate })
             newVehicle.owner = _userId 
             await newVehicle.save()
             await logic.vehicle.retrieve(vehicleId)
            }
            catch({message}){
                 expect(message).to.exist
                 expect(message).to.equal(`Vehicle already exists.`)
            }
         })

        it('should fail if the league do not exist', async () => {
           
            await League.create({ id, name })

            name = 'fakename'

            try {
                 await logic.retrieveLeague(id, name)
            } catch(error) {
                
                 expect(error).to.exist
                 expect(error.message).to.equal(`league with name fakename does not exists`)
            }
         })
    
      
        it('should fail on undefined league name', () => 
            expect(() => 
                logic.retrieveLeague(id, undefined)
         ).to.throw(`name with value undefined is not a string`)
        )
    
        it('should fail on undefined user id', () => 
            expect(() => 
                logic.retrieveLeague(undefined, nameLeague)
        ).to.throw(`id with value undefined is not a string`)
        )
    
        
        it('should fail on non-string league name', () => 
            expect(() => 
                logic.retrieveLeague(id, 12345)
         ).to.throw(`name with value 12345 is not a string`)
        )
    
        it('should fail on non-string user id', () => 
            expect(() => 
                logic.retrieveLeague(12345, nameLeague)
        ).to.throw(`id with value 12345 is not a string`)
        )
    

        it('should fail on empty id', () => 
            expect(() => 
                logic.retrieveLeague('', nameLeague)
        ).to.throw(`id is empty or blank`)
        )
    
        it('should fail on empty name', () => 
            expect(() => 
                logic.retrieveLeague(id, '')
        ).to.throw(`name is empty or blank`)
        )
   
        

   after(() => database.disconnect())
})