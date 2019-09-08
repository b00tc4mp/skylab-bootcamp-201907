require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')


const { env: { DB_URL_TEST }} = process

describe('logic - create team', () => {
    
    // before(() =>  database.connect(DB_URL_TEST))
    before(() =>  database.connect('mongodb://localhost/footcamp-test-create-players', { useNewUrlParser: true }))

    

    let name, surname, email, password, nameTeam, nameLeague,  code
    // let namePlayer, namePlayer2,  surnamePlayer, surnamePlayer2, player_id, player_id2, real_team, real_team2, position, position2, points_per_game, points_per_game2
    // let total_points, total_points2, yellow_cards, yellow_cards2, red_cards, red_cards2, goals, goals2, minutes, minutes2, photo, cost, cost2

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`

        //  //create player 1
        // namePlayer = `name-${Math.random()}`
        // surnamePlayer = `surname-${Math.random()}`
        // playerId = number(1111,2241111)
        // real_team = `realTeam-${Math.random()}`
        // position = number(1111,2241111)
        // points_per_game = number(1111,2241111)
        // total_points = number(1111,2241111)
        // yellow_cards = number(1111,2241111)
        // red_cards = number(1111,2241111)
        // goals = number(1111,2241111)
        // minutes = number(1111,2241111)
        // cost = number(1111,2241111)
        // //create player 2
        // namePlayer2 = `name-${Math.random()}`
        // surnamePlayer2 = `surname-${Math.random()}`
        // playerId2 = number(1111,2241111)
        // real_team2 = `realTeam-${Math.random()}`
        // position2 = number(1111,2241111)
        // points_per_game2 = number(1111,2241111)
        // total_points2 = number(1111,2241111)
        // yellow_cards2 = number(1111,2241111)
        // red_cards2 = number(1111,2241111)
        // goals2 = number(1111,2241111)
        // minutes2 = number(1111,2241111)
        // cost2 = number(1111,2241111)
        

        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            await Team.deleteMany()
            
          
            const users = await User.create({name, surname, email, password})
            id = users.id

            const league= new League({id, name: nameLeague, code})
            
            league.participants.push(id)

            // const player = new Player({name: namePlayer, surname: surnamePlayer, playerId, real_team, position, points_per_game, total_points, yellow_cards, red_cards,  goals, minutes, cost  })
            // const player2 = new Player({name: namePlayer2, surname: surnamePlayer2, playerId: playerId2, real_team: real_team2 , position: position2,   points_per_game:  points_per_game2, total_points: total_points2, yellow_cards: yellow_cards2, red_cards: red_cards2,  goals: goals2, minutes: minutes2, cost: cost2  })
            // idPlayer = player.id
            // idPlayer2 = player2.id

            // const team = new Team({id, name: nameTeam})
            // team.owner = id
            
            // team.players.push(idPlayer)
            // team.players.push(idPlayer2)

            await users.save()
            await league.save()
            // await player.save()
            // await player2.save()
            // await team.save()
                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.createTeam(id, code, nameTeam)
            expect(result).to.exist

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

        it('should fail if the user does not join before to the league', async () => {

            const user = await User.create({ name, surname, email, password })

            const league = await League.create({ id, name: nameLeague,code  })

            league.participants.includes(user.id)
           
            await Team.create({ id, name: nameTeam, code})

            try {
                await logic.createTeam(id, code, nameTeam)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`Team with name ${nameTeam} already exist`)
            }
            
        })

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