require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - create league', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameLeague
    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`

        return (async () => {
            await User.deleteMany()
          
            const users = await User.create({name, surname, email, password})
            id = users.id
           
        })()
    
   })

    it('should succeed on correct data', async () => {
        debugger
        const result = await logic.createLeague(id, nameLeague)
            expect(result).not.to.exist
        const league = await League.findOne({name: nameLeague})
            expect(league).to.exist
            expect(league.team).to.exist
            expect(league.admin.toString()).to.equal(id)
            expect(league.name).to.equal(nameLeague)
           
        
    })

        it('should fail if the league already exists', async () => {

            await League.create({ id, name })
     
            try {
                 await logic.createLeague(id, 'hola')
            } catch(error) {
                
                 expect(error).to.exist
                 expect(error.message).to.equal(`league with name hola does not exists`)
            }
         })
        
            
   
        it('should fail on undefined league name', () => 
            expect(() => 
                logic.createLeague(id, undefined)
         ).to.throw(`name with value undefined is not a string`)
        )

        it('should fail on undefined user id', () => 
            expect(() => 
                logic.createLeague(undefined, name)
        ).to.throw(`id with value undefined is not a string`)
        )

       
   
        it('should fail on non-string league name', () => 
            expect(() => 
                logic.createLeague(id, 12345)
         ).to.throw(`name with value 12345 is not a string`)
        )

        it('should fail on non-string user id', () => 
            expect(() => 
                logic.createLeague(12345, name)
        ).to.throw(`id with value 12345 is not a string`)
        )

       it('should fail on empty id', () => 
        expect(() => 
        logic.createLeague('', name)
        ).to.throw(`id is empty or blank`)
        )
    
        it('should fail on empty name', () => 
        expect(() => 
        logic.createLeague(id, '')
        ).to.throw(`name is empty or blank`)
        )



    after(() => database.disconnect())
})