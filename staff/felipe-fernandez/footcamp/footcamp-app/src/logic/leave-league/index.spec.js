import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'

const { User , League } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe.only('logic - leave league', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, id,nameLeague, code, leagueId

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        code = `code-${Math.random()}`

        await User.deleteMany()
        await League.deleteMany()

        const user = await User.create({ name, surname, email, password })

        id = user.id
        
        const league = await League.create({id, name: nameLeague, code})
        leagueId= league.id

        league.participants.push(id)
        await league.save()

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
        const result = await logic.leaveLeague(leagueId)
            expect(result).toBeDefined()

        const findLeague = await League.findOne({_id: leagueId})
            expect(findLeague).toBeDefined()
            expect(findLeague.participants.length).toBe(0)
                
          
          
        })

    afterAll(() => database.disconnect())
})