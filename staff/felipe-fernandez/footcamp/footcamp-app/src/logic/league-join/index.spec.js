import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'

const { User , League } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe.only('logic - join league', () => {
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
        
        const league = await League.create({id, name: nameLeague, code})
        

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
            
                
            const result = await logic.joinLeague(code)
              expect(result).toBeDefined()

            const league = await League.findOne({name: nameLeague, code})
                expect(league).toBeDefined()
                expect(league.team).toBeDefined()
                expect(league.name).toBe(nameLeague)
                expect(league.code).toBe(code)
                expect(league.participants.length).toBe(1)
                expect(league.participants[0].toString()).toBe(id)
          
        })

        it('should fail on incorrect user', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.joinLeague(code)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`User with id ${id} does not exist.`)
            }
            
        })
    
           
        it('should fail if the code does not match', async () => {
    
            await League.create({ id, name: nameLeague, code })
     
            try {
                 await logic.joinLeague('53534')
            } catch(error) {
                
                 expect(error).toBeDefined()
                 expect(error.message).toBe(`cannot find league with code 53534`)
            }
         })
         
             

        

        it('should fail on undefined code', () => 
            expect(() => 
                logic.joinLeague(undefined)
        ).to.throw(`code with value undefined is not a string`)
        )



        it('should fail on non-string code', () => 
            expect(() => 
                logic.joinLeague(12345)
        ).to.throw(`code with value 12345 is not a string`)
        )



        it('should fail on empty code', () => 
            expect(() => 
                logic.joinLeague('')
        ).to.throw(`code is empty or blank`)
        )

        

    afterAll(() => database.disconnect())
})