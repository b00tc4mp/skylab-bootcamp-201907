import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'

const { User , League, Team } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - create team', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, points, code, leagueId, id

    beforeEach(async () => {
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam5-${Math.random()}`
        code = `code-${Math.random()}`

        await User.deleteMany()
        await League.deleteMany()
        await Team.deleteMany()
        
      
        const users = await User.create({name, surname, email, password})
        id = users.id

        const league= new League({id, name: nameLeague, code})
        leagueId= league.id
        
        league.participants.push(id)

        await users.save()
        await league.save()

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
            
        
            const result = await logic.createTeam(nameTeam, leagueId)
                expect(result).toBeDefined()
    
            const league = await League.findOne({_id: leagueId})
                expect(league).toBeDefined()
                
            const team = await Team.findOne({name: nameTeam})
                expect(team).toBeDefined()
                
                expect(team.players.length).toBe(18)
                expect(team.owner.toString()).toBe(id)
                expect(team.name).toBe(nameTeam)
          
        })

         
   
        it('should fail on undefined league name', () => 
            expect(() => 
                logic.createTeam(undefined, leagueId)
         ).to.throw(`name with value undefined is not a string`)
        )

        

        it('should fail on undefined leagueId', () => 
            expect(() => 
                logic.createTeam(nameTeam, undefined)
        ).to.throw(`leagueId with value undefined is not a string`)
        )
        
     

        it('should fail on non-string team name', () => 
            expect(() => 
                logic.createTeam(12345, leagueId)
        ).to.throw(`name with value 12345 is not a string`)
        )


        it('should fail on non-string leagueId', () => 
            expect(() => 
                logic.createTeam(nameTeam, 12345)
        ).to.throw(`leagueId with value 12345 is not a string`)
        )

      
                
         

        it('should fail on empty leagueId', () => 
            expect(() => 
                    logic.createTeam(nameTeam, '' )
        ).to.throw(`leagueId is empty or blank`)
            )

        it('should fail on empty name team', () => 
             expect(() => 
                    logic.createTeam('', leagueId)
        ).to.throw(`name is empty or blank`)
            )


    afterAll(() => database.disconnect())
})