require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve team', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code
    let namePlayer, namePlayer2,  surnamePlayer, surnamePlayer2, player_id, player_id2, real_team, real_team2, position, position2, points_per_game, points_per_game2
    let total_points, total_points2, yellow_cards, yellow_cards2, red_cards, red_cards2, goals, goals2, minutes, minutes2, photo, cost, cost2

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
        player_id = number(1111,2241111)
        real_team = `realTeam-${Math.random()}`
        position = number(1111,2241111)
        points_per_game = number(1111,2241111)
        total_points = number(1111,2241111)
        yellow_cards = number(1111,2241111)
        red_cards = number(1111,2241111)
        goals = number(1111,2241111)
        minutes = number(1111,2241111)
        cost = number(1111,2241111)
        //create player 2
        namePlayer2 = `name-${Math.random()}`
        surnamePlayer2 = `surname-${Math.random()}`
        player_id2 = number(1111,2241111)
        real_team2 = `realTeam-${Math.random()}`
        position2 = number(1111,2241111)
        points_per_game2 = number(1111,2241111)
        total_points2 = number(1111,2241111)
        yellow_cards2 = number(1111,2241111)
        red_cards2 = number(1111,2241111)
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

            const player = new Player({name: namePlayer, surname: surnamePlayer, player_id, real_team, position, points_per_game, total_points, yellow_cards, red_cards,  goals, minutes, cost  })
            const player2 = new Player({name: namePlayer2, surname: surnamePlayer2, player_id: player_id2, real_team: real_team2 , position: position2,   points_per_game:  points_per_game2, total_points: total_points2, yellow_cards: yellow_cards2, red_cards: red_cards2,  goals: goals2, minutes: minutes2, cost: cost2  })
            id_player = player.id
            id_player2 = player2.id

            const team = new Team({id, name: nameTeam, points})
            team.owner = id
            
            team.players.push(id_player)
            team.players.push(id_player2)

            await users.save()
            await league.save()
            await player.save()
            await player2.save()
            await team.save()
                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.retrieveTeam(id, code, nameTeam, points)
        
            expect(result).to.exist
            expect(result._name).to.equal(nameTeam)
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
                 await logic.retrieveTeam(id, code, nameTeam, points)
            } catch(error) {
                
                 expect(error).to.exist
                 expect(error.message).to.equal(`League with code ${code} does not exist`)
            }
         })

        it('should fail on incorrect user id', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.retrieveTeam(id, code, nameTeam, points)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`User with id ${id} does not exist`)
            }
            
        })

        it('should fail if the team name does not exist', async () => {

            await League.create({ id, name: nameLeague,code  })

           
            try {
                await logic.retrieveTeam(id, code, '12345', points)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`Team with name 12345 does not exist`)
            }
            
        })
         
         
   
        it('should fail on undefined league name', () => 
            expect(() => 
                logic.retrieveTeam(id, code, undefined, points)
         ).to.throw(`name with value undefined is not a string`)
        )

        it('should fail on undefined user id', () => 
            expect(() => 
                logic.retrieveTeam(undefined, code, nameTeam ,points)
        ).to.throw(`id with value undefined is not a string`)
        )

        it('should fail on undefined code', () => 
            expect(() => 
                logic.retrieveTeam(id, undefined, nameTeam, points)
        ).to.throw(`code with value undefined is not a string`)
        )
        
        it('should fail on undefined points', () => 
             expect(() => 
               logic.retrieveTeam(id, code, nameTeam, undefined)
         ).to.throw(`points with value undefined is not a number`)
          )


        it('should fail on non-string team name', () => 
            expect(() => 
                logic.retrieveTeam(id, code, 12345, points)
        ).to.throw(`name with value 12345 is not a string`)
        )

        it('should fail on non-string user id', () => 
            expect(() => 
                logic.retrieveTeam(12345, code, nameTeam ,points)
        ).to.throw(`id with value 12345 is not a string`)
        )

        it('should fail on non-string code', () => 
            expect(() => 
                logic.retrieveTeam(id, 12345, nameTeam, points)
        ).to.throw(`code with value 12345 is not a string`)
        )

        it('should fail on non-number points', () => 
            expect(() => 
            logic.retrieveTeam(id, code, nameTeam, 'points')
        ).to.throw(`points with value points is not a number`)
        )

                
         it('should fail on empty id', () => 
            expect(() => 
                    logic.retrieveTeam('', code, nameTeam, points)
            ).to.throw(`id is empty or blank`)
            )

        it('should fail on empty code', () => 
            expect(() => 
                    logic.retrieveTeam(id, '', nameTeam ,points)
        ).to.throw(`code is empty or blank`)
            )

        it('should fail on empty name team', () => 
             expect(() => 
                    logic.retrieveTeam(id, code, '', points)
        ).to.throw(`name is empty or blank`)
            )



    after(() => database.disconnect())
})