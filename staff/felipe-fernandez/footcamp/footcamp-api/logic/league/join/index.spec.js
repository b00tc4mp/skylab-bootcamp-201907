require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - join league', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameLeague

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
            const league = await League.create({id, name: nameLeague, code})
            leagueId = league.id
                                   
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.joinLeague(id, code)
            expect(result).not.to.exist
        debugger
         const findLeague = await League.findOne({code})
            expect(findLeague).to.exist
            expect(findLeague.team).to.exist
            expect(findLeague.name).to.equal(nameLeague)
            
           
    })

    it('should fail on incorrect user', async () => {
        id = '5d772fb62bb54120d08d7a7b'
        try {
            await logic.joinLeague(id, name, code)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`User with id ${id} does not exist.`)
        }
        
    })

    it('should fail if the league already exists', async () => {

        await League.create({ id, name , code})
 
        try {
             await logic.joinLeague(id, 'hola', code)
        } catch(error) {
            
             expect(error).to.exist
             expect(error.message).to.equal(`cannot find league with code hola`)
        }
     })

    it('should fail if the code does not match', async () => {

        await League.create({ id, name: nameLeague, code })
 
        try {
             await logic.joinLeague(id, '53534')
        } catch(error) {
            
             expect(error).to.exist
             expect(error.message).to.equal(`cannot find league with code 53534`)
        }
     })
    
        

    it('should fail on undefined user id', () => 
        expect(() => 
            logic.joinLeague(undefined, code)
    ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on undefined code', () => 
        expect(() => 
            logic.joinLeague(id,  undefined)
    ).to.throw(`code with value undefined is not a string`)
    )


    it('should fail on non-string user id', () => 
        expect(() => 
            logic.joinLeague(12345,  code)
    ).to.throw(`id with value 12345 is not a string`)
    )

    it('should fail on non-string code', () => 
        expect(() => 
            logic.joinLeague(id,  12345)
    ).to.throw(`code with value 12345 is not a string`)
    )


    it('should fail on empty id', () => 
        expect(() => 
            logic.joinLeague('',  code)
    ).to.throw(`id is empty or blank`)
    )

    it('should fail on empty name', () => 
        expect(() => 
            logic.joinLeague(id,  '')
    ).to.throw(`code is empty or blank`)
    )





after(() => database.disconnect())
})