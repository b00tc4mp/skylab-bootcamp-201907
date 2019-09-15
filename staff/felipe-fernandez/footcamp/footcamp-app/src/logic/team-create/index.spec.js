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

    afterAll(() => database.disconnect())
})