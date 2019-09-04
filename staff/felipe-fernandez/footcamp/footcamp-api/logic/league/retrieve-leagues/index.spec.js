require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all leagues', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameLeague, leagueId, leagueId2, id2, nameLeague2, code2


    beforeEach(() => {

    
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        code = `code-${Math.random()}`

        

        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            
            const users = await User.create({name, surname, email, password})
            id = users.id
          
            const leagues = new League({id, name: nameLeague, code})
            leagueId = leagues.id

            const leagues2 = new League({id: id2, name: nameLeague2, code: code2 })
            leagueId2 = leagues2.id

            users.leagues.push(leagueId)
            users.leagues.push(leagueId2)
            
            await leagues.save()

            await users.save()
        })()

    })

     it('should succeed on correct data', async () => {
        debugger
        const result = await logic.retrieveLeagues(id)
        
            expect(result).to.exist
            expect(result.length).to.equal(2)
            expect(result[0]).to.equal(leagueId)
            expect(result[1]).to.equal(leagueId2)
        })

        it('should fail on incorrect user', async () => {
            id = '5d772fb62bb54120d08d7a7b'
            try {
                await logic.retrieveLeagues(id)
                throw Error('should not reach this point') 
            }
            catch({message}){
                expect(message).to.equal(`User with id ${id} does not exist.`)
            }
            
        })
            
        it('should fail on undefined user id', () => 
            expect(() => 
                logic.retrieveLeagues(undefined)
        ).to.throw(`id with value undefined is not a string`)
        )

      
        it('should fail on non-string user id', () => 
            expect(() => 
                logic.retrieveLeagues(12345)
        ).to.throw(`id with value 12345 is not a string`)
        )


        it('should fail on empty id', () => 
            expect(() => 
                logic.retrieveLeagues('')
        ).to.throw(`id is empty or blank`)
        )

   after(() => database.disconnect())
})