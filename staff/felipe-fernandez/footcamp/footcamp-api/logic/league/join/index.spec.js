require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - join league', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, code ,nameLeague

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
            debugger
            const users = await User.create({name, surname, email, password})
            id = users.id
            const league = await League.create({id, name: nameLeague})
            code = league.code
        })()
    
   })

   it('should succeed on correct data', async () => {
        
    const result = await logic.joinLeague(id, nameLeague, code)
        expect(result).to.exist
        expect(result.code).to.exist
               
    
    })


        

after(() => database.disconnect())
})