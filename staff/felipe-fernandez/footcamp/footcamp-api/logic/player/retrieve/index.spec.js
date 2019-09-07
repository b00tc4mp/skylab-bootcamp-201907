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
        //create player 1
        namePlayer = `webName-${Math.random()}`
        surnamePlayer = `webName-${Math.random()}`
        player_id = number(1111,2241111)
        real_team = `realTeam-${Math.random()}`
        position = `position-${Math.random()}`
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

            const player = new Player({name: namePlayer, surname: surnamePlayer, player_id, real_team, position, points_per_game, total_points, yellow_cards, red_cards,  goals, minutes, cost  }) 

            const team = new Team({id, name: nameTeam, points})
            team.owner = id
            debugger

            team.players.push(player)
           

            await users.save()
            await league.save()
            await player.save()
            await team.save()
                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        debugger
        const result = await logic.retrievePlayer(nameTeam, player_id)
        
            expect(result).to.exist
            expect(result.name).to.equal(namePlayer)
            expect(result.surname).to.equal(surnamePlayer)
            expect(result.player_id).to.equal(player_id)
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

        it('should fail if the player does not exist', async () => {

                await League.create({ id, name: nameLeague,code  })
                await Team.create({id, name: nameTeam, points})
                await Player.create({name: namePlayer, surname: surnamePlayer, player_id, real_team, position, points_per_game, total_points, yellow_cards, red_cards,  goals, minutes, cost})
                await Player.deleteMany()
        
                try {
                     await logic.retrievePlayer(nameTeam, player_id)
                } catch(error) {
                    
                     expect(error).to.exist
                     expect(error.message).to.equal(`Player with id ${player_id} does not exist`)
                }

         })

         it('should fail if the team does not exist', async () => {

            await League.create({ id, name: nameLeague,code  })
            await Team.create({id, name: nameTeam, points})
            await Team.deleteMany()
    
            try {
                 await logic.retrievePlayer(nameTeam, player_id)
            } catch(error) {
                
                 expect(error).to.exist
                 expect(error.message).to.equal(`Team with name ${nameTeam} does not exist`)
            }

         })

         
         
        it('should fail on undefined league name', () => 
            expect(() => 
                logic.retrievePlayer(undefined, player_id)
         ).to.throw(`name with value undefined is not a string`)
        )

        it('should fail on undefined player id', () => 
            expect(() => 
            logic.retrievePlayer(nameTeam, undefined)
        ).to.throw(`player id with value undefined is not a number`)
        )

        it('should fail on non-string league name', () => 
            expect(() => 
                logic.retrievePlayer(12345, player_id)
         ).to.throw(`name with value 12345 is not a string`)
        )

        it('should fail on non-number league name', () => 
            expect(() => 
                logic.retrievePlayer(nameTeam, 'player_id')
         ).to.throw(`player id with value player_id is not a number`)
        )


        it('should fail on empty id league name', () => 
        expect(() => 
            logic.retrievePlayer('', player_id)
        ).to.throw(`name is empty or blank`)
        )


    after(() => database.disconnect())
})