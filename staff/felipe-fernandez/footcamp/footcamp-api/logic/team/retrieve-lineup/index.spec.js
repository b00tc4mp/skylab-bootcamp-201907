require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve lineup', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code 
    let namePlayer, surnamePlayer, playerId, realTeam, position, pointsPerGame,  totalPoints,  yellowCards,  redCards,  goals,  minutes,  cost
    
    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`
        points= 0
       
  
         return (async () => {
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
             
            for(let i = 0; i < 11; i++){
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
                team.lineup.push(player.id)
                await player.save()
            }
            await users.save()
            await team.save()
            await league.save()



                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.retrievelineUpTeam(id, leagueId, teamId)
                
            expect(result).to.exist
            expect(result.length).to.equal(11)
           
                   
    })


    it('should fail if the league does not exist', async () => {

        await League.create({ id, name: nameLeague, code })
        await League.deleteMany()
        try {
             await logic.retrievelineUpTeam(id, leagueId, teamId)
        } catch(error) {
            
             expect(error).to.exist
             expect(error.message).to.equal(`League with code ${leagueId} does not exist`)
        }
     })

    it('should fail on incorrect user id', async () => {
        id = '5d772fb62bb54120d08d7a7b'
        try {
            await logic.retrievelineUpTeam(id, leagueId, teamId)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`User with id ${id} does not exist`)
        }
        
    })

    it('should fail if the team name does not exist', async () => {
       
        teamId ='5d772fb62bb54120d08d7a7b'
        await League.create({ id, name: nameLeague,code  })

       
        try {
            await logic.retrievelineUpTeam(id, leagueId, teamId)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`Team with name 5d772fb62bb54120d08d7a7b does not exist`)
        }
        
    })
     
     

    it('should fail on undefined league team Id', () => 
        expect(() => 
            logic.retrievelineUpTeam(id, leagueId, undefined)
     ).to.throw(`team id with value undefined is not a string`)
    )

    it('should fail on undefined user id', () => 
        expect(() => 
            logic.retrievelineUpTeam(undefined, leagueId, teamId)
    ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on undefined leagueId', () => 
        expect(() => 
            logic.retrievelineUpTeam(id, undefined, teamId)
    ).to.throw(`league Id with value undefined is not a string`)
    )
    


    it('should fail on non-string team id', () => 
        expect(() => 
            logic.retrievelineUpTeam(id, leagueId, 12345)
    ).to.throw(`team id with value 12345 is not a string`)
    )

    it('should fail on non-string user id', () => 
        expect(() => 
            logic.retrievelineUpTeam(12345, leagueId, teamId)
    ).to.throw(`id with value 12345 is not a string`)
    )

    it('should fail on non-string leagueId', () => 
        expect(() => 
            logic.retrievelineUpTeam(id, 12345, teamId)
    ).to.throw(`league Id with value 12345 is not a string`)
    )

   
            
     it('should fail on empty id', () => 
        expect(() => 
                logic.retrievelineUpTeam('', leagueId, teamId)
        ).to.throw(`id is empty or blank`)
        )

    it('should fail on empty leagueId', () => 
        expect(() => 
                logic.retrievelineUpTeam(id, '', teamId)
    ).to.throw(`league Id is empty or blank`)
        )

    it('should fail on empty team id', () => 
         expect(() => 
                logic.retrievelineUpTeam(id, leagueId, '')
    ).to.throw(`team id is empty or blank`)
        )



    after(() => database.disconnect())
})