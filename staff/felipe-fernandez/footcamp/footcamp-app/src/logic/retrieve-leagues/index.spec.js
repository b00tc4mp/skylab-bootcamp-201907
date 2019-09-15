import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'
const {  random : { number }  } = require('footcamp-utils')
const { User , League , Team, Player } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe.only('logic - retrieve leagues', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

   
    let name, surname, email, password, nameTeam, nameLeague, points, code, nameTeam2, name2, surname2, email2, password2, idPlayer2, idPlayer
    let namePlayer, namePlayer2,  surnamePlayer, surnamePlayer2, playerId, playerId2, realTeam, realTeam2, position, position2, pointsPerGame, pointsPerGame2
    let totalPoints, totalPoints2, yellowCards, yellowCards2, redCards, redCards2, goals, goals2, minutes, minutes2, photo, cost, cost2 ,leagueId ,id, id2, id_player, id_player2


    beforeEach(async () => {
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

        await User.deleteMany()
        await League.deleteMany()
        await Team.deleteMany()
        
      
        const users = await User.create({name, surname, email, password})
        id = users.id

        const users2 = await User.create({name: name2, surname:surname2, email: email2, password: password2})
        id2 = users.id
       
      
        
        const league= new League({id, name: nameLeague, code})
        leagueId = league.id


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
                   


        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
       
                   
        const result = await logic.retrieveAllLeagues(leagueId)
        

            expect(result.team[0].name).toBe(nameTeam)    
            expect(result).toBeDefined()
            expect(result.code).toBe(code)
            expect(result.name).toBe(nameLeague)
            expect(result.participants.length).toBe(2)
            expect(result.team.length).toBe(2)
          
          
        })

    afterAll(() => database.disconnect())
})