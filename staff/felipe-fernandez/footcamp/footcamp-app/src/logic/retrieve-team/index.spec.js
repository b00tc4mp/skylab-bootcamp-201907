import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'
const {  random : { number }  } = require('footcamp-utils')

const { User , League, Team, Player } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve team', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code, leagueId, id, teamId, idPlayer, idPlayer2
    let namePlayer, namePlayer2,  surnamePlayer, surnamePlayer2, playerId, playerId2, realTeam, realTeam2, position, position2, pointsPerGame, pointsPerGame2
    let totalPoints, totalPoints2, yellowCards, yellowCards2, redCards, redCards2, goals, goals2, minutes, minutes2, photo, cost, cost2

    beforeEach(async () => {
        
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
                   

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
            
         const result = await logic.retrieveTeam(leagueId, teamId)
        
            expect(result).toBeDefined()
            expect(result.team.name_team).toBe(nameTeam)
            expect(result.team.owner.toString()).toBe(id)
            expect(result.team.points).toBe(0)

        const team = await Team.findOne({name: nameTeam})  
        
            expect(team.players).toBeDefined()
            expect(team.players.length).toBe(2) 
            expect(team.name).toBe(nameTeam)
            expect(team.owner.toString()).toBe(id)
            expect(team.points).toBe(0)
           
          
        })

    afterAll(() => database.disconnect())
})