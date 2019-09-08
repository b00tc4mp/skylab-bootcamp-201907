require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe.only('logic - create team', () => {
    
    // before(() =>  database.connect(DB_URL_TEST))
    before(() =>  database.connect('mongodb://localhost/footcamp-test-create-players', { useNewUrlParser: true }))

    
    let name, surname, email, password, nameTeam, nameLeague,  code
    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`
        

        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            await Team.deleteMany()
            
          
            const users = await User.create({name, surname, email, password})
            id = users.id

            const league= new League({id, name: nameLeague, code})
            
            league.participants.push(id)
            await users.save()
            await league.save()
                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.createTeam(id, code, nameTeam)
            expect(result).to.exist
debugger
        const league = await League.findOne({code})
            expect(league).to.exist
            
        const team = await Team.findOne({name: nameTeam})
            expect(team).to.exist
            debugger
            expect(team.players.length).to.equal(18)
            expect(team.owner.toString()).to.equal(id)
            expect(team.name).to.equal(nameTeam)
        
    })

        it('should fail if the league does not exist', async () => {

            await League.create({ id, name: nameLeague, code })
            await League.deleteMany()
            try {
                await logic.createTeam(id, code, nameTeam)
            } catch(error) {
                
                expect(error).to.exist
                expect(error.message).to.equal(`League with code ${code} does not exist`)
            }
        })

         it('should fail on incorrect user id', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.createTeam(id, code, nameTeam)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`User with id ${id} does not exist`)
            }
            
        })
//TODO
        // it('should fail if the team does not join before to the league', async () => {

        //     await League.create({ id, name: nameLeague,code  })

        //     await Team.create({ id, name: nameTeam, code, points  })

        //     try {
        //         await logic.createTeam(id, code, nameTeam, points)
        //         throw Error('should not reach this point') 
        //     }
        //     catch({message}){
        //         expect(message).to.equal(`Team with name ${nameTeam} already exist`)
        //     }
            
        // })

        it('should fail if the team name exist', async () => {

            await League.create({ id, name: nameLeague,code  })

            await Team.create({ id, name: nameTeam, code  })

            try {
                await logic.createTeam(id, code, nameTeam)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`Team with name ${nameTeam} already exist`)
            }
            
        })
         
         
   
        it('should fail on undefined league name', () => 
            expect(() => 
                logic.createTeam(id, code, undefined)
         ).to.throw(`name with value undefined is not a string`)
        )

        it('should fail on undefined user id', () => 
            expect(() => 
                logic.createTeam(undefined, code, nameTeam )
        ).to.throw(`id with value undefined is not a string`)
        )

        it('should fail on undefined code', () => 
            expect(() => 
                logic.createTeam(id, undefined, nameTeam)
        ).to.throw(`code with value undefined is not a string`)
        )
        
     

        it('should fail on non-string team name', () => 
            expect(() => 
                logic.createTeam(id, code, 12345)
        ).to.throw(`name with value 12345 is not a string`)
        )

        it('should fail on non-string user id', () => 
            expect(() => 
                logic.createTeam(12345, code, nameTeam )
        ).to.throw(`id with value 12345 is not a string`)
        )

        it('should fail on non-string code', () => 
            expect(() => 
                logic.createTeam(id, 12345, nameTeam)
        ).to.throw(`code with value 12345 is not a string`)
        )

      
                
         it('should fail on empty id', () => 
            expect(() => 
                    logic.createTeam('', code, nameTeam)
            ).to.throw(`id is empty or blank`)
            )

        it('should fail on empty code', () => 
            expect(() => 
                    logic.createTeam(id, '', nameTeam )
        ).to.throw(`code is empty or blank`)
            )

        it('should fail on empty name team', () => 
             expect(() => 
                    logic.createTeam(id, code, '')
        ).to.throw(`name is empty or blank`)
            )

    after(() => database.disconnect())
})