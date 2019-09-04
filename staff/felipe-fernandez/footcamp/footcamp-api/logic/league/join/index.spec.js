require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')
const { random: { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe.only('logic - join league', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, code , nameLeague

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`

        return (async () => {
            await User.deleteMany()
            // await League.deleteMany()
            
            const users = await User.create({name, surname, email, password})
            id = users.id
            const league = await League.create({id, name: nameLeague})
            
            code = league.id.slice(2,8)
                        
        })()
    
   })

   it('should succeed on correct data', async () => {
        
    const result = await logic.joinLeague(id, nameLeague, code)
        expect(result).to.exist
        debugger
        expect(result.admin).to.exist
        expect(result.id).to.equal(leagueId)
        expect(result.name).to.equal(nameLeague)  

               
    
    })



after(() => database.disconnect())
})