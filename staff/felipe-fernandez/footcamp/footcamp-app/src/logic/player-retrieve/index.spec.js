import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'
const {  random : { number }  } = require('footcamp-utils')

const { User , League, Team, Player } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve player', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code, leagueId, id, teamId, idPlayer, idPlayer2, playerId
    let namePlayer,  surnamePlayer,  playerIid,  realTeam,  position,  pointsPerGame
    let totalPoints,  yellowCards,  redCards,  goals,  minutes,   cost

    beforeEach(async () => {
       
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
                   

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
            
       debugger
            const result = await logic.retrievePlayer(idPlayer)
        
            expect(result).toBeDefined()
            expect(result.player.name).toBe(namePlayer)
            expect(result.player.surname).toBe(surnamePlayer)
            expect(result.player.position).toBe(position)
            expect(result.player.realTeam).toBe(realTeam)
            expect(result.player.totalPoints).toBe(totalPoints)
            expect(result.player.pointsPerGame).toBe(pointsPerGame)
            expect(result.player.yellowCards).toBe(yellowCards)
            expect(result.player.redCards).toBe(redCards)
            expect(result.player.goals).toBe(goals)
            expect(result.player.minutes).toBe(minutes)
            expect(result.player.cost).toBe(cost)
           
          
        })

    afterAll(() => database.disconnect())
})