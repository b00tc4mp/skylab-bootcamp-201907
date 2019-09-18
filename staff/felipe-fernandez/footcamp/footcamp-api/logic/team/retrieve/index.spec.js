require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve team', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code
    let namePlayer, namePlayer2,  surnamePlayer, surnamePlayer2, playerId, playerId2, realTeam, realTeam2, position, position2, pointsPerGame, pointsPerGame2
    let totalPoints, totalPoints2, yellowCards, yellowCards2, redCards, redCards2, goals, goals2, minutes, minutes2, photo, cost, cost2

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`
        points= 0
        //create player 1
        namePlayer = `name-${Math.random()}`
        surnamePlayer = `surname-${Math.random()}`
        playerId = number(1111,2241111)
        realTeam = `realTeam-${Math.random()}`
        position = number(1111,2241111)
        pointsPerGame = number(1111,2241111)
        totalPoints = number(1111,2241111)
        yellowCards = number(1111,2241111)
        redCards = number(1111,2241111)
        goals = number(1111,2241111)
        minutes = number(1111,2241111)
        cost = number(1111,2241111)
        //create player 2
        namePlayer2 = `name-${Math.random()}`
        surnamePlayer2 = `surname-${Math.random()}`
        playerId2 = number(1111,2241111)
        realTeam2 = `realTeam-${Math.random()}`
        position2 = number(1111,2241111)
        pointsPerGame2 = number(1111,2241111)
        totalPoints2 = number(1111,2241111)
        yellowCards2 = number(1111,2241111)
        redCards2 = number(1111,2241111)
        goals2 = number(1111,2241111)
        minutes2 = number(1111,2241111)
        cost2 = number(1111,2241111)



        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            await Team.deleteMany()
            
          
            const users = await User.create({name, surname, email, password})
            id = users.id

            const league= new League({id, name: nameLeague, code})
            leagueId = league.id

            const player = new Player({name: namePlayer, surname: surnamePlayer, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, cost  })
            const player2 = new Player({name: namePlayer2, surname: surnamePlayer2, playerId: playerId2, realTeam: realTeam2 , position: position2,   pointsPerGame:  pointsPerGame2, totalPoints: totalPoints2, yellowCards: yellowCards2, redCards: redCards2,  goals: goals2, minutes: minutes2, cost: cost2  })
            idPlayer = player.id
            idPlayer2 = player2.id

            const team = new Team({id, name: nameTeam, points})
            team.owner = id
            teamId= team.id
            
            team.players.push(idPlayer)
            team.players.push(idPlayer2)
            
            await users.save()
            await league.save()
            await player.save()
            await player2.save()
            await team.save()
                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.retrieveTeam(id, leagueId, teamId)
        
            expect(result).to.exist
            expect(result.name_team).to.equal(nameTeam)
            expect(result.owner.toString()).to.equal(id)
            expect(result.points).to.equal(0)

        const team = await Team.findOne({name: nameTeam})  
        
            expect(team.players).to.exist
            expect(team.players.length).to.equal(2) 
            expect(team.name).to.equal(nameTeam)
            expect(team.owner.toString()).to.equal(id)
            expect(team.points).to.equal(0)
           
        
    })

         it('should fail if the league does not exist', async () => {

            await League.create({ id, name: nameLeague, code })
            await League.deleteMany()
            try {
                 await logic.retrieveTeam(id, leagueId, teamId)
            } catch(error) {
                
                 expect(error).to.exist
                 expect(error.message).to.equal(`League with id ${leagueId} does not exist`)
            }
         })

        it('should fail on incorrect user id', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.retrieveTeam(id, leagueId, nameTeam)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`User with id ${id} does not exist`)
            }
            
        })

        it('should fail if the team name does not exist', async () => {
            teamId = '5d772fb62bb54120d08d7a7b'
            await League.create({ id, name: nameLeague,code  })

           
            try {
                await logic.retrieveTeam(id, leagueId, teamId)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`Team with id 5d772fb62bb54120d08d7a7b does not exist`)
            }
            
        })
         
         
   
        it('should fail on undefined league team id', () => 
            expect(() => 
                logic.retrieveTeam(id, leagueId, undefined)
         ).to.throw(`team id with value undefined is not a string`)
        )

        it('should fail on undefined user id', () => 
            expect(() => 
                logic.retrieveTeam(undefined, leagueId, teamId)
        ).to.throw(`id with value undefined is not a string`)
        )

        it('should fail on undefined code', () => 
            expect(() => 
                logic.retrieveTeam(id, undefined, teamId)
        ).to.throw(`league Id with value undefined is not a string`)
        )
        
     

        it('should fail on non-string team teamId', () => 
            expect(() => 
                logic.retrieveTeam(id, leagueId, 12345)
        ).to.throw(`team id with value 12345 is not a string`)
        )

        it('should fail on non-string user id', () => 
            expect(() => 
                logic.retrieveTeam(12345, leagueId, teamId )
        ).to.throw(`id with value 12345 is not a string`)
        )

        it('should fail on non-string code', () => 
            expect(() => 
                logic.retrieveTeam(id, 12345, teamId)
        ).to.throw(`league Id with value 12345 is not a string`)
        )

       

                
         it('should fail on empty id', () => 
            expect(() => 
                    logic.retrieveTeam('', leagueId, teamId)
            ).to.throw(`id is empty or blank`)
            )

        it('should fail on empty code', () => 
            expect(() => 
                    logic.retrieveTeam(id, '', teamId )
        ).to.throw(`league Id is empty or blank`)
            )

        it('should fail on empty team id ', () => 
             expect(() => 
                    logic.retrieveTeam(id, leagueId, '')
        ).to.throw(`team id is empty or blank`)
            )



    after(() => database.disconnect())
})