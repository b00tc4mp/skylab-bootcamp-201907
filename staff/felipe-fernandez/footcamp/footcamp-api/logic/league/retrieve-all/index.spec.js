
require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all league teams ', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code, nameTeam2, name2, surname2, email2, password2, idPlayer2, idPlayer
    let namePlayer, namePlayer2,  surnamePlayer, surnamePlayer2, playerId, playerId2, realTeam, realTeam2, position, position2, pointsPerGame, pointsPerGame2
    let totalPoints, totalPoints2, yellowCards, yellowCards2, redCards, redCards2, goals, goals2, minutes, minutes2, photo, cost, cost2

    beforeEach(() => {

        name = `name-${Math.random()}`
        name2 = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        email2 = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        password2 = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        nameTeam2 = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`
        points= 0
        //create player 1
        namePlayer = `name-${Math.random()}`
        surnamePlayer = `surname-${Math.random()}`
        playerId = number(1111,2241111)
        realTeam = `realTeam-${Math.random()}`
        position = 1
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
        position2 = 2
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

            const users2 = await User.create({name: name2, surname:surname2, email: email2, password: password2})
            id2 = users.id
           
          
            
            const league= new League({id, name: nameLeague, code})

            users.leagues.push(league)
            users2.leagues.push(league)
            
            league.participants.push(users)
            league.participants.push(users2)

            const player = new Player({name: namePlayer, surname: surnamePlayer, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, cost  })
            const player2 = new Player({name: namePlayer2, surname: surnamePlayer2, playerId: playerId2, realTeam: realTeam2 , position: position2,   pointsPerGame:  pointsPerGame2, totalPoints: totalPoints2, yellowCards: yellowCards2, redCards: redCards2,  goals: goals2, minutes: minutes2, cost: cost2  })
            id_player = player.id
            id_player2 = player2.id

            const team1 = new Team({id, name: nameTeam, points})
            const team2 = new Team({id: id2, name: nameTeam2, points})
            team1.owner = id
            team2.owner = id2
            
            
            team1.players.push(id_player)
            team2.players.push(id_player2)
            team1.players.push(id_player)
            team2.players.push(id_player2)

            league.team.push(team1)
            league.team.push(team2)

            await users.save()
            await users2.save()
            await league.save()
            await player.save()
            await player2.save()
            await team1.save()
            await team2.save()
                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        
        const result = await logic.retrieveAllLeagues(id)
        
            expect(result).to.exist
            expect(result.code).to.equal(code)
            expect(result.name).to.equal(nameLeague)
            expect(result.participants.length).to.equal(2)
            expect(result.team.length).to.equal(2)
          
           
            
    })

    it('should fail if the league does not exist', async () => {

        await League.create({ id, name: nameLeague, code })
        await League.deleteMany()
        try {
             await logic.retrieveAllLeagues(id)
        } catch(error) {
            
             expect(error).to.exist
             expect(error.message).to.equal(`League with code ${code} does not exist`)
        }
     })

    it('should fail on incorrect user id', async () => {
        id = '5d772fb62bb54120d08d7a7b'
        try {
            await logic.retrieveAllLeagues(id)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`User with id ${id} does not exist`)
        }
        
    })

     

    
    it('should fail on undefined user id', () => 
        expect(() => 
            logic.retrieveAllLeagues(undefined)
    ).to.throw(`id with value undefined is not a string`)
    )

  


   it('should fail on non-string user id', () => 
        expect(() => 
            logic.retrieveAllLeagues(12345)
    ).to.throw(`id with value 12345 is not a string`)
    )


            
     it('should fail on empty id', () => 
        expect(() => 
                logic.retrieveAllLeagues('')
        ).to.throw(`id is empty or blank`)
        )

   


    after(() => database.disconnect())
})