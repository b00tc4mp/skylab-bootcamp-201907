import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'
const {  random : { number }  } = require('footcamp-utils')

const { User , League, Team, Player } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - create lineup', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code, leagueId, id,teamId
    let namePlayer, surnamePlayer, playerId, realTeam, position, pointsPerGame,  totalPoints,  yellowCards,  redCards,  goals,  minutes,  cost

    beforeEach(async () => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`
        points= 0

             await User.deleteMany()
            await League.deleteMany()
            await Team.deleteMany()
            await Player.deleteMany()
            
          
            const users = await User.create({name, surname, email, password})
            id = users.id

            const league = new League({id, name: nameLeague, code})
            leagueId = league.id

            const team = new Team({id, name: nameTeam, points})
            team.owner = id
            teamId= team.id
             
            for(let i = 0; i < 50; i++){
                let min =1
                let max= 4
                let random = Math.random()
                let randomNumber = Math.floor(random * (max -min +1)) +min
                namePlayer = `name-${Math.random()}`
                surnamePlayer = `surname-${Math.random()}`
                playerId = number(1111,2241111)
                realTeam = `realTeam-${Math.random()}`
                position = randomNumber
                pointsPerGame = number(1111,2241111)
                totalPoints = number(1111,2241111)
                yellowCards = number(1111,2241111)
                redCards = number(1111,2241111)
                goals = number(1111,2241111)
                minutes = number(1111,2241111)
                cost = number(1111,2241111)
                const player = new Player({name: namePlayer, surname: surnamePlayer, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, cost  })
                team.players.push(player.id)
                await player.save()
            }
            await users.save()
            await team.save()
            await league.save()



        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
            
                      
        const result = await logic.getLineup(leagueId, teamId)

        expect(result).toBeDefined()
        
        const team = await Team.findOne({name: nameTeam})  
        
            expect(team.lineup).toBeDefined()
            expect(team.lineup.length).toBe(11)
            
        })

    afterAll(() => database.disconnect())
})