require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - join league', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, code , nameLeague, leagueId

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`

        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            
            const users = await User.create({name, surname, email, password})
            id = users.id
            const league = await League.create({id, name: nameLeague})
            //save the league's id to create the code what I will use in the call of joinLeague logic
            leagueId = league.id
            code = leagueId.slice(2,8)
            
                                           
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.joinLeague(id, nameLeague, code)
            expect(result).not.to.exist
        debugger
         const findLeague = await League.findOne({name: nameLeague})
            expect(findLeague).to.exist
            expect(findLeague.team).to.exist
            expect(findLeague.name).to.equal(nameLeague)
        const user = await User.findById(id)
            expect(user.leagues[0].toString()).to.equal(leagueId)
           
    })


    it('should fail if the league already exists', async () => {

        await League.create({ id, name })
 
        try {
             await logic.joinLeague(id, 'hola', code)
        } catch(error) {
            
             expect(error).to.exist
             expect(error.message).to.equal(`league with name hola does not exists`)
        }
     })

    it('should fail if the code does not match', async () => {

        await League.create({ id, name: nameLeague })
 
        try {
             await logic.joinLeague(id, nameLeague, '53534')
        } catch(error) {
            
             expect(error).to.exist
             expect(error.message).to.equal(`code with number 53534 does not exists`)
        }
     })
    
        

    it('should fail on undefined league name', () => 
        expect(() => 
            logic.joinLeague(id, undefined, code)
     ).to.throw(`name with value undefined is not a string`)
    )

    it('should fail on undefined user id', () => 
        expect(() => 
            logic.joinLeague(undefined, nameLeague, code)
    ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on undefined code', () => 
        expect(() => 
            logic.joinLeague(id, nameLeague, undefined)
    ).to.throw(`code with value undefined is not a string`)
    )


    it('should fail on non-string league name', () => 
        expect(() => 
            logic.joinLeague(id, 12345, code)
     ).to.throw(`name with value 12345 is not a string`)
    )

    it('should fail on non-string user id', () => 
        expect(() => 
            logic.joinLeague(12345, nameLeague, code)
    ).to.throw(`id with value 12345 is not a string`)
    )

    it('should fail on non-string code', () => 
        expect(() => 
            logic.joinLeague(id, nameLeague, 12345)
    ).to.throw(`code with value 12345 is not a string`)
    )


    it('should fail on empty id', () => 
        expect(() => 
            logic.joinLeague('', nameLeague, code)
    ).to.throw(`id is empty or blank`)
    )

    it('should fail on empty name', () => 
        expect(() => 
            logic.joinLeague(id, '', code)
    ).to.throw(`name is empty or blank`)
    )

    it('should fail on empty name', () => 
        expect(() => 
            logic.joinLeague(id, nameLeague, '')
    ).to.throw(`code is empty or blank`)
    )





after(() => database.disconnect())
})