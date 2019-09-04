require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe.only('logic - retrieve all leagues', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, id , league1, league2, leagueId, leagueId2

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        league1 = `nameLeague-${Math.random()}`
        league2 = `nameLeague-${Math.random()}`

        return (async () => {

            await User.deleteMany()
            await League.deleteMany()
            debugger
            const users = await User.create({name, surname, email, password})
            id = users.id

            // const leagues = await League.create({id, name: league1})
            // leagueId = leagues.id

            // const leagues2 = await League.create({id, name: league2})
            // leagueId2 = leagues2.id

            const leagues = new League({id, name: league1})
            leagueId = leagues.id
            debugger
            const leagues2 = new League({id, name: league2})
            leagueId2 = leagues2.id

            users.leagues.push(leagues)
            users.leagues.push(leagues2)
            
            await users.save()

        })()

    })

     it('should succeed on correct data', async () => {
        
        const result = await logic.retrieveLeagues(id)
        debugger
            expect(result).to.exist
            expect(result.length).to.equal(2)
            const arrayResultString = result.toString().split(',')
            expect(arrayResultString[0]).to.equal(leagueId) 
            expect(arrayResultString[1]).to.equal(leagueId2) 
            
        })

        it('should fail if user do not exist', async () => {
           
            id= '5d6fd6457287f9731654b328'

            try {
                 await logic.retrieveLeagues(id)
            } catch(error) {
                debugger
                 expect(error).to.exist
                 expect(error.message).to.equal(`user with id 5d6fd6457287f9731654b328 does not exists`)
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