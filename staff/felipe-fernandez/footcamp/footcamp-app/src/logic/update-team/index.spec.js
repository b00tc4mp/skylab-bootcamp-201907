import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'
const {  random : { number }  } = require('footcamp-utils')

const { User , League, Team, Player } = models


// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - update team', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code, leagueId, id, teamId, idPlayer, idPlayer2,idPlayer3, idPlayer4, idPlayer5
    let namePlayer, namePlayer2,  surnamePlayer, surnamePlayer2, playerId, playerId2, realTeam, realTeam2, position, position2, pointsPerGame, pointsPerGame2
    let totalPoints, totalPoints2, yellowCards, yellowCards2, redCards, redCards2, goals, goals2, minutes, minutes2, photo, cost, cost2
    let namePlayer3, surnamePlayer3, playerId3,  realTeam3, position3, pointsPerGame3, totalPoints3, yellowCards3, redCards3, goals3, minutes3, cost3
    let namePlayer4, surnamePlayer4, playerId4,  realTeam4, position4, pointsPerGame4, totalPoints4, yellowCards4, redCards4, goals4, minutes4, cost4
    let namePlayer5, surnamePlayer5, playerId5,  realTeam5, position5, pointsPerGame5, totalPoints5, yellowCards5, redCards5, goals5, minutes5, cost5

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

        //create player 3
        namePlayer3 = `name-${Math.random()}`
        surnamePlayer3 = `surname-${Math.random()}`
        playerId3 = number(1111,2241111)
        realTeam3 = `realTeam-${Math.random()}`
        position3= number(1111,2241111)
        pointsPerGame3 = number(1111,2241111)
        totalPoints3 = number(1111,2241111)
        yellowCards3 = number(1111,2241111)
        redCards3 = number(1111,2241111)
        goals3 = number(1111,2241111)
        minutes3 = number(1111,2241111)
        cost3 = number(1111,2241111)

         //create player 4
         namePlayer4 = `name-${Math.random()}`
         surnamePlayer4 = `surname-${Math.random()}`
         playerId4 = number(1111,2241111)
         realTeam4 = `realTeam-${Math.random()}`
         position4 = number(1111,2241111)
         pointsPerGame4 = number(1111,2241111)
         totalPoints4 = number(1111,2241111)
         yellowCards4 = number(1111,2241111)
         redCards4 = number(1111,2241111)
         goals4 = number(1111,2241111)
         minutes4 = number(1111,2241111)
         cost4 = number(1111,2241111)
        
          //create player 5
        namePlayer5 = `name-${Math.random()}`
        surnamePlayer5 = `surname-${Math.random()}`
        playerId5 = number(1111,2241111)
        realTeam5 = `realTeam-${Math.random()}`
        position5 = number(1111,2241111)
        pointsPerGame5 = number(1111,2241111)
        totalPoints5 = number(1111,2241111)
        yellowCards5 = number(1111,2241111)
        redCards5 = number(1111,2241111)
        goals5 = number(1111,2241111)
        minutes5 = number(1111,2241111)
        cost5 = number(1111,2241111)



        await User.deleteMany()
        await League.deleteMany()
        await Team.deleteMany()
        
      
        const users = await User.create({name, surname, email, password})
        id = users.id

        const league= new League({id, name: nameLeague, code})
        leagueId = league.id

        const player = new Player({name: namePlayer, surname: surnamePlayer, playerId, realTeam, position, pointsPerGame, totalPoints, yellowCards, redCards,  goals, minutes, cost  })
        const player2 = new Player({name: namePlayer2, surname: surnamePlayer2, playerId: playerId2, realTeam: realTeam2 , position: position2,   pointsPerGame:  pointsPerGame2, totalPoints: totalPoints2, yellowCards: yellowCards2, redCards: redCards2,  goals: goals2, minutes: minutes2, cost: cost2  })
        const player3 = new Player({name: namePlayer3, surname: surnamePlayer3, playerId: playerId3, realTeam: realTeam3 , position: position3,   pointsPerGame:  pointsPerGame3, totalPoints: totalPoints3, yellowCards: yellowCards3, redCards: redCards3,  goals: goals3, minutes: minutes3, cost: cost3  })
        const player4 = new Player({name: namePlayer4, surname: surnamePlayer4, playerId: playerId4, realTeam: realTeam4 , position: position4,   pointsPerGame:  pointsPerGame4, totalPoints: totalPoints4, yellowCards: yellowCards4, redCards: redCards4,  goals: goals4, minutes: minutes4, cost: cost4  })
        const player5 = new Player({name: namePlayer5, surname: surnamePlayer5, playerId: playerId5, realTeam: realTeam5 , position: position5,   pointsPerGame:  pointsPerGame5, totalPoints: totalPoints5, yellowCards: yellowCards5, redCards: redCards5,  goals: goals5, minutes: minutes5, cost: cost5  })
        idPlayer = player.id
        idPlayer2 = player2.id
        idPlayer3 = player3.id
        idPlayer4 = player4.id
        idPlayer5 = player5.id

        const team = new Team({id, name: nameTeam, points})
        team.owner = id
        teamId= team.id
        
        team.players.push(idPlayer)
        team.players.push(idPlayer2)
        team.players.push(idPlayer3)
        team.players.push(idPlayer4)
        team.players.push(idPlayer5)
        
        team.lineup.push(idPlayer)
        team.lineup.push(idPlayer2)
        team.lineup.push(idPlayer3)
        team.lineup.push(idPlayer4)
        team.lineup.push(idPlayer5)
      
        await users.save()
        await league.save()
        await player.save()
        await player2.save()
        await team.save()
                   
        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
            
        
        const result = await logic.updateTeam(leagueId,teamId, idPlayer, idPlayer3)
        
             expect(result).toBeUndefined()
        

        const team = await Team.findOne({name: nameTeam})  
    
             expect(team.lineup[0]).toBe(idPlayer3)
    
          
        })

        it('should fail if the team id does not exist', async () => {
            teamId = '5d772fb62bb54120d08d7a7b'
            await League.create({ id, name: nameLeague,code  })

           
            try {
                await logic.updateTeam(leagueId, teamId, idPlayer, idPlayer3)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`Team with id 5d772fb62bb54120d08d7a7b does not exist`)
            }
            
        })

    afterAll(() => database.disconnect())
})