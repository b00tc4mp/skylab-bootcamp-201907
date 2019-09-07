require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - leave league', () => {
    
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
            
            leagues.participants.push(id)
                      debugger
            await leagues.save()

                                              
        })()
    
   })

    
    it('should remove league on correct data', async() => {
        const result = await logic.leaveLeagues(id, code)
            expect(result).not.to.exist

        const findLeague = await League.findOne({code})
            expect(findLeague).to.exist
            expect(findLeague.participants.length).to.equal(0)
                   
       
     })

    it('should fail on incorrect user id', async () => {
        id = '5d772fb62bb54120d08d7a7b'
        try {
            await logic.leaveLeagues(id, code)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`User with id ${id} does not exists`)
        }
        
    })
    it('should fail on incorrect league code', async () => {
        code = '12345'

        try {
            await logic.leaveLeagues(id, code)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`cannot find league with code ${ code }`)
        }
        
    })

    it('should fail on undefined user id', () => 
        expect(() => 
            logic.leaveLeagues(undefined, code)
    ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on undefined league code', () => 
        expect(() => 
            logic.leaveLeagues(id,  undefined)
    ).to.throw(`code with value undefined is not a string`)
    )


    it('should fail on non-string user id', () => 
        expect(() => 
            logic.leaveLeagues(12345,  code)
    ).to.throw(`id with value 12345 is not a string`)
    )

    it('should fail on non-string league code', () => 
        expect(() => 
            logic.leaveLeagues(id,  12345)
    ).to.throw(`code with value 12345 is not a string`)
    )


    it('should fail on empty code', () => 
        expect(() => 
            logic.leaveLeagues('',  code)
    ).to.throw(`id is empty or blank`)
    )

    it('should fail on empty name', () => 
        expect(() => 
            logic.leaveLeagues(id,  '')
    ).to.throw(`code is empty or blank`)
    )


after(() => database.disconnect())
})