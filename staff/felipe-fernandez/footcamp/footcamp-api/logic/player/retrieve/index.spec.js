require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe.only('logic - retrieve player', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code
    let namePlayer,  surnamePlayer,  playerIid,  realTeam,  position,  pointsPerGame
    let totalPoints,  yellowCards,  redCards,  goals,  minutes,   cost

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`
        points = 0
        //create player 
        namePlayer = `webName-${Math.random()}`
        surnamePlayer = `webName-${Math.random()}`
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
        


        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            await Team.deleteMany()
            await Player.deleteMany()
          
            const users = await User.create({name, surname, email, password})
            id = users.id

            const league= new League({id, name: nameLeague, code})

            const player = new Player({name: namePlayer, surname: surnamePlayer, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, cost  }) 
            idPlayer = player.id
            
            const team = new Team({id, name: nameTeam, points})
            team.owner = id
            

            team.players.push(player)
           

            await users.save()
            await league.save()
            await player.save()
            await team.save()
                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.retrievePlayer(id, idPlayer)
        
            expect(result).to.exist
            expect(result.name).to.equal(namePlayer)
            expect(result.surname).to.equal(surnamePlayer)
            expect(result.position).to.equal(position)
            expect(result.realTeam).to.equal(realTeam)
            expect(result.totalPoints).to.equal(totalPoints)
            expect(result.pointsPerGame).to.equal(pointsPerGame)
            expect(result.yellowCards).to.equal(yellowCards)
            expect(result.redCards).to.equal(redCards)
            expect(result.goals).to.equal(goals)
            expect(result.minutes).to.equal(minutes)
            expect(result.cost).to.equal(cost)
        

    })

        it('should fail on incorrect user id', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.retrievePlayer(id, idPlayer)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`User with id ${id} does not exist`)
            }
            
        })

        it('should fail if the player does not exist', async () => {

                await League.create({ id, name: nameLeague,code  })
                await Team.create({id, name: nameTeam, points})
                await Player.create({name: namePlayer, surname: surnamePlayer, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, cost})
                await Player.deleteMany()
        
                try {
                     await logic.retrievePlayer(id, idPlayer)
                } catch(error) {
                    
                     expect(error).to.exist
                     expect(error.message).to.equal(`Player with id ${idPlayer} does not exist`)
                }

         })

        it('should fail on undefined id user', () => 
            expect(() => 
                logic.retrievePlayer(undefined,  idPlayer)
     
             ).to.throw(`id with value undefined is not a string`)
            )

       
        it('should fail on undefined player id', () => 
            expect(() => 
                logic.retrievePlayer(id,  undefined)
        ).to.throw(`player id with value undefined is not a string`)
        )

      
        it('should fail on empty code league id user', () => 
             expect(() => 
            logic.retrievePlayer('', idPlayer)
 
         ).to.throw(`id is empty or blank`)
        )

        

        it('should fail on non-string user id', () => 
             expect(() => 
                 logic.retrievePlayer(12345,  idPlayer)

         ).to.throw(`id with value 12345 is not a string`)
        )

      
        
        it('should fail on non-string player id', () => 
             expect(() => 
                 logic.retrievePlayer(id,  12345)

         ).to.throw(`player id with value 12345 is not a string`)
        )






    after(() => database.disconnect())
})