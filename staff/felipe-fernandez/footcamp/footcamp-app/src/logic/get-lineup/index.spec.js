import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'
const {  random : { number }  } = require('footcamp-utils')

const { User , League, Team, Player } = models
jest.setTimeout(10000)
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


    it('should fail on incorrect user id', async () => {
        id = '5d772fb62bb54120d08d7a7b'
        try {
            await logic.lineUpTeam(leagueId, teamId)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).toBe(`User with id ${id} does not exist`)
        }
        
    })

    it('should fail if the team name does not exist', async () => {
       
        teamId ='5d772fb62bb54120d08d7a7b'
        await League.create({ id, name: nameLeague,code  })

       
        try {
            await logic.lineUpTeam(leagueId, teamId)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).toBe(`Team with name 5d772fb62bb54120d08d7a7b does not exist`)
        }
        
    })
     
     

        it('should fail on undefined league team Id', () => 
            expect(() => 
                logic.lineUpTeam(leagueId, undefined)
        ).to.throw(`team id with value undefined is not a string`)
        )

       
        it('should fail on undefined leagueId', () => 
            expect(() => 
                logic.lineUpTeam(undefined, teamId)
        ).to.throw(`league Id with value undefined is not a string`)
        )
        


        it('should fail on non-string team id', () => 
            expect(() => 
                logic.lineUpTeam(leagueId, 12345)
        ).to.throw(`team id with value 12345 is not a string`)
        )

        
        it('should fail on non-string leagueId', () => 
            expect(() => 
                logic.lineUpTeam(12345, teamId)
        ).to.throw(`league Id with value 12345 is not a string`)
        )

    
         

        it('should fail on empty leagueId', () => 
            expect(() => 
                    logic.lineUpTeam('', teamId)
        ).to.throw(`league Id is empty or blank`)
            )

        it('should fail on empty team id', () => 
            expect(() => 
                    logic.lineUpTeam(leagueId, '')
        ).to.throw(`team id is empty or blank`)
            )



    afterAll(() => database.disconnect())
})