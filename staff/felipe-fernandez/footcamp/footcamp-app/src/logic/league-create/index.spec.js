import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'

const { User , League } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - create league', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, id,nameLeague, code

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

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
            
                
            const result = await logic.createLeague(nameLeague, code)
              expect(result).toBeDefined()

            const league = await League.findOne({name: nameLeague, code})
                expect(league).toBeDefined()
                expect(league.team).toBeDefined()
                expect(league.name).toBe(nameLeague)
                expect(league.code).toBe(code)
                expect(league.participants.length).toBe(1)
                expect(league.participants[0].toString()).toBe(id)
          
        })


        it('should fail on undefined league name', () => 
            expect(() => 
                logic.createLeague(undefined, code)
         ).to.throw(`name with value undefined is not a string`)
        )

       
        it('should fail on undefined code', () => 
            expect(() => 
                logic.createLeague(nameLeague, undefined)
        ).to.throw(`code with value undefined is not a string`)
        )


       
   
        it('should fail on non-string league name', () => 
            expect(() => 
                logic.createLeague(12345, code)
         ).to.throw(`name with value 12345 is not a string`)
        )



        it('should fail on non-string code', () => 
        expect(() => 
            logic.createLeague(nameLeague, 12345)
        ).to.throw(`code with value 12345 is not a string`)
        )


    
        it('should fail on empty name', () => 
        expect(() => 
        logic.createLeague('', code)
        ).to.throw(`name is empty or blank`)
        )

        it('should fail on empty code', () => 
        expect(() => 
        logic.createLeague(nameLeague, '')
        ).to.throw(`code is empty or blank`)
        )


    afterAll(() => database.disconnect())
})