require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')


const { env: { DB_URL_TEST }} = process

describe('logic - create team', () => {
    
    // before(() =>  database.connect(DB_URL_TEST))
    before(() =>  database.connect('mongodb://localhost/footcamp-test-create-players', { useNewUrlParser: true }))


    let name, surname, email, password, nameTeam, nameLeague, points, code, leagueId
    let namePlayer, namePlayer2,  surnamePlayer, surnamePlayer2, playerId, playerId2, realTeam, realTeam2, position, position2, pointsPerGame, pointsPerGame2
    let totalPoints, totalPoints2, yellowCards, yellowCards2, redCards, redCards2, goals, goals2, minutes, minutes2, photo, cost, cost2

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam5-${Math.random()}`
        code = `code-${Math.random()}`

     

        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            await Team.deleteMany()
            
          
            const users = await User.create({name, surname, email, password})
            id = users.id

            const league= new League({id, name: nameLeague, code})
            leagueId= league.id
            
            league.participants.push(id)

            await users.save()
            await league.save()
           
                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        debugger
        const result = await logic.createTeam(id, leagueId, nameTeam)
            expect(result).to.exist

        const league = await League.findOne({_id: leagueId})
            expect(league).to.exist
            
        const team = await Team.findOne({name: nameTeam})
            expect(team).to.exist
            
            expect(team.players.length).to.equal(18)
            expect(team.owner.toString()).to.equal(id)
            expect(team.name).to.equal(nameTeam)
        
    })

        it('should fail if the league does not exist', async () => {

            await League.create({ id, name: leagueId, code })
            await League.deleteMany()
            try {
                await logic.createTeam(id, leagueId, nameTeam)
            } catch(error) {
                
                expect(error).to.exist
                expect(error.message).to.equal(`League with leagueId ${leagueId} does not exist`)
            }
        })

         it('should fail on incorrect user id', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.createTeam(id, leagueId, nameTeam)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`User with id ${id} does not exist`)
            }
            
        })

        // it('should fail if the user does not join before to the league', async () => {

        //     const user = await User.create({ name, surname, email, password })

        //     const league = await League.create({ id, name: nameLeague,code  })
        //     leagueId = league.id

        //     league.participants.includes(user.id)
           
        //     await Team.create({ id, leagueId, name: nameTeam})

        //     try {
        //         await logic.createTeam(id, code, nameTeam)
        //         throw Error('should not reach this point') 
        //     }
        //     catch({message}){
        //         expect(message).to.equal(`Team with name ${nameTeam} already exist`)
        //     }
            
        // })

        it('should fail if the team name exist', async () => {

            await League.create({ id, name: nameLeague,code  })

            await Team.create({ id, name: nameTeam  })

            try {
                await logic.createTeam(id, leagueId, nameTeam)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`Team with name ${nameTeam} already exist`)
            }
            
        })
         
         
   
        it('should fail on undefined league name', () => 
            expect(() => 
                logic.createTeam(id, leagueId, undefined)
         ).to.throw(`name with value undefined is not a string`)
        )

        it('should fail on undefined user id', () => 
            expect(() => 
                logic.createTeam(undefined, leagueId, nameTeam )
        ).to.throw(`id with value undefined is not a string`)
        )

        it('should fail on undefined leagueId', () => 
            expect(() => 
                logic.createTeam(id, undefined, nameTeam)
        ).to.throw(`leagueId with value undefined is not a string`)
        )
        
     

        it('should fail on non-string team name', () => 
            expect(() => 
                logic.createTeam(id, leagueId, 12345)
        ).to.throw(`name with value 12345 is not a string`)
        )

        it('should fail on non-string user id', () => 
            expect(() => 
                logic.createTeam(12345, leagueId, nameTeam )
        ).to.throw(`id with value 12345 is not a string`)
        )

        it('should fail on non-string leagueId', () => 
            expect(() => 
                logic.createTeam(id, 12345, nameTeam)
        ).to.throw(`leagueId with value 12345 is not a string`)
        )

      
                
         it('should fail on empty id', () => 
            expect(() => 
                    logic.createTeam('', leagueId, nameTeam)
            ).to.throw(`id is empty or blank`)
            )

        it('should fail on empty leagueId', () => 
            expect(() => 
                    logic.createTeam(id, '', nameTeam )
        ).to.throw(`leagueId is empty or blank`)
            )

        it('should fail on empty name team', () => 
             expect(() => 
                    logic.createTeam(id, leagueId, '')
        ).to.throw(`name is empty or blank`)
            )

    after(() => database.disconnect())
})