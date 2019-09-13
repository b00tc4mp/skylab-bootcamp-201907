require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve league', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameLeague, name2, surname2, email2, password2, id, id2

    beforeEach(() => {

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

        return (async () => {
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
            league.participants.push(id, id2)

            await users.save()
            await users2.save()
            await league.save()
            await team.save()

        })()


    })

     it('should succeed on correct data', async () => {
            
        const result = await logic.retrieveLeague(id, leagueId)
        
            expect(result).to.exist
            expect(result.code).to.equal(code) 
            expect(result.name).to.equal(nameLeague) 
            expect(result.teams.length).to.equal(1) 
            expect(result.participants.length).to.equal(2) 
            expect(result.participants[0].toString()).to.equal(id) 
            expect(result.participants[1].toString()).to.equal(id2) 
            expect(result.teams[0].name).to.equal(nameteam) 
        })
        

        it('should fail on incorrect user id', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.retrieveLeague(id, leagueId)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`User with id ${id} does not exist`)
            }
            
        })
        
        it('should fail if the league do not exist', async () => {
           
            await League.create({ id, name, code})

            leagueId = '5d772fb62bb54120d08d7a7b'

            try {
                 await logic.retrieveLeague(id ,leagueId)
            } catch(error) {
                
                 expect(error).to.exist
                 expect(error.message).to.equal(`league with code 5d772fb62bb54120d08d7a7b does not exist`)
            }
         })
    
      
        it('should fail on undefined league leagueId', () => 
            expect(() => 
                logic.retrieveLeague(id, undefined)
         ).to.throw(`league id with value undefined is not a string`)
        )
    
        it('should fail on undefined user id', () => 
            expect(() => 
                logic.retrieveLeague(undefined, leagueId)
        ).to.throw(`id with value undefined is not a string`)
        )
    
        
        it('should fail on non-string league leagueId', () => 
            expect(() => 
                logic.retrieveLeague(id, 12345)
         ).to.throw(`league id with value 12345 is not a string`)
        )
    
        it('should fail on non-string user id', () => 
            expect(() => 
                logic.retrieveLeague(12345, leagueId)
        ).to.throw(`id with value 12345 is not a string`)
        )
    

        it('should fail on empty id', () => 
            expect(() => 
                logic.retrieveLeague('', leagueId)
        ).to.throw(`id is empty or blank`)
        )
    
        it('should fail on empty leagueId', () => 
            expect(() => 
                logic.retrieveLeague(id, '')
        ).to.throw(`league id is empty or blank`)
        )
   
        

   after(() => database.disconnect())
})