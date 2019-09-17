import logic from '..'
import { database, models } from 'footcamp-data'
import jwt from 'jsonwebtoken'

const { User , League , Team } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe.only('logic - retrieve league', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, nameLeague,nameteam, points, name2, surname2, email2, password2, id, id2, code, leagueId

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
        nameteam =`team-${Math.random()}`
        code =`code-${Math.random()}`
        points = 0

        await User.deleteMany()
        await League.deleteMany()
        
        
        const users = await User.create({name, surname, email, password})
        id = users.id

        const users2 = await User.create({name: name2, surname: surname2, email: email2, password: password2})
        id2 = users.id
        
        const league= new League({id, name: nameLeague, code})
        leagueId = league.id

        const team =  new Team({name: nameteam, points}) 
        team.owner = id

        league.team.push(team)
        league.participants.push(id)
        league.participants.push(id2)

        await users.save()
        await users2.save()
        await league.save()
        await team.save()


        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
       
                  
        const result = await logic.retrieveLeague(leagueId)
        
            expect(result).toBeDefined()
            expect(result.code).toBe(code) 
            expect(result.name).toBe(nameLeague) 
            expect(result.teams.length).toBe(1) 
            expect(result.participants.length).toBe(2) 
            expect(result.participants[0].toString()).toBe(id) 
            expect(result.participants[1].toString()).toBe(id2) 
            expect(result.teams[0].name).toBe(nameteam)    
          
          
        }) 
        
        it('should fail on incorrect user id', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.retrieveLeague(leagueId)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).toBe(`User with id ${id} does not exist`)
            }
            
        })
        
        it('should fail if the league do not exist', async () => {
           
            await League.create({ id, name, code})

            leagueId = '5d772fb62bb54120d08d7a7b'

            try {
                 await logic.retrieveLeague(leagueId)
            } catch(error) {
                
                 expect(error).toBeDefined()
                 expect(error.message).toBe(`league with id 5d772fb62bb54120d08d7a7b does not exist`)
            }
         })


        it('should fail on undefined league leagueId', () => 
        expect(() => 
            logic.retrieveLeague(undefined)
     ).to.throw(`league id with value undefined is not a string`)
    )

   
    
    it('should fail on non-string league leagueId', () => 
        expect(() => 
            logic.retrieveLeague(12345)
     ).to.throw(`league id with value 12345 is not a string`)
    )

    

    it('should fail on empty leagueId', () => 
        expect(() => 
            logic.retrieveLeague(id, '')
    ).to.throw(`league id is empty or blank`)
    )

    

    afterAll(() => database.disconnect())
})