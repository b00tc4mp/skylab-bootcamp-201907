require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve player', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code
    let namePlayer,  surnamePlayer,  player_id,  real_team,  position,  points_per_game
    let total_points,  yellow_cards,  red_cards,  goals,  minutes,   cost

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
        real_team = `realTeam-${Math.random()}`
        position = number(1111,2241111)
        points_per_game = number(1111,2241111)
        total_points = number(1111,2241111)
        yellow_cards = number(1111,2241111)
        red_cards = number(1111,2241111)
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

            const player = new Player({name: namePlayer, surname: surnamePlayer, playerId, real_team, position, points_per_game, total_points, yellow_cards, red_cards,  goals, minutes, cost  }) 
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
        debugger
        const result = await logic.retrievePlayer(id, code, idPlayer)
        
            expect(result).to.exist
            expect(result.name).to.equal(namePlayer)
            expect(result.surname).to.equal(surnamePlayer)
            expect(result.position).to.equal(position)
            expect(result.real_team).to.equal(real_team)
            expect(result.total_points).to.equal(total_points)
            expect(result.points_per_game).to.equal(points_per_game)
            expect(result.yellow_cards).to.equal(yellow_cards)
            expect(result.red_cards).to.equal(red_cards)
            expect(result.goals).to.equal(goals)
            expect(result.minutes).to.equal(minutes)
            expect(result.cost).to.equal(cost)
        

    })

        it('should fail on incorrect user id', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.retrievePlayer(id, code, idPlayer)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`User with id ${id} does not exist`)
            }
            
        })

        it('should fail if the player does not exist', async () => {

                await League.create({ id, name: nameLeague,code  })
                await Team.create({id, name: nameTeam, points})
                await Player.create({name: namePlayer, surname: surnamePlayer, playerId, real_team, position, points_per_game, total_points, yellow_cards, red_cards,  goals, minutes, cost})
                await Player.deleteMany()
        
                try {
                     await logic.retrievePlayer(id, code, idPlayer)
                } catch(error) {
                    
                     expect(error).to.exist
                     expect(error.message).to.equal(`Player with id ${idPlayer} does not exist`)
                }

         })

        it('should fail on undefined id user', () => 
            expect(() => 
                logic.retrievePlayer(undefined, code, idPlayer)
     
             ).to.throw(`id with value undefined is not a string`)
            )

       
        it('should fail on undefined code name', () => 
            expect(() => 
                logic.retrievePlayer(id, undefined, idPlayer)
         ).to.throw(`code with value undefined is not a string`)
        )

        it('should fail on undefined player id', () => 
            expect(() => 
                logic.retrievePlayer(id, code, undefined)
        ).to.throw(`player id with value undefined is not a string`)
        )

      
        it('should fail on empty code league id user', () => 
             expect(() => 
            logic.retrievePlayer('',code, idPlayer)
 
         ).to.throw(`id is empty or blank`)
        )

        it('should fail on empty code league', () => 
            expect(() => 
            logic.retrievePlayer(id, '', idPlayer)
        ).to.throw(`code is empty or blank`)
        )

        it('should fail on non-string user id', () => 
             expect(() => 
                 logic.retrievePlayer(12345, code, idPlayer)

         ).to.throw(`id with value 12345 is not a string`)
        )

      
        it('should fail on non-string code', () => 
             expect(() => 
                 logic.retrievePlayer(id, 12345, idPlayer)

         ).to.throw(`code with value 12345 is not a string`)
        )

        it('should fail on non-string player id', () => 
             expect(() => 
                 logic.retrievePlayer(id, code, 12345)

         ).to.throw(`player id with value 12345 is not a string`)
        )






    after(() => database.disconnect())
})