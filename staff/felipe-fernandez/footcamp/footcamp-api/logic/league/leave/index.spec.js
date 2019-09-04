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
            leagueId = leagues.id

            const leagues2 = new League({id: id2, name: nameLeague2, code: code2 })
            leagueId2 = leagues2.id

            users.leagues.push(leagueId)
            users.leagues.push(leagueId2)
            
            await leagues.save()

            await users.save()
                                   
        })()
    
   })

    



    it('should remove league on correct data', async() => {
        const result = await logic.leaveLeagues(id, leagueId)
            expect(result).not.to.exist
        const userFind = await User.findById(id)
        const leagueFound = userFind.leagues.find(league => league.toString() === leagueId)
            expect(leagueFound).not.to.exist
       
        })

    it('should fail on incorrect user id', async () => {
        id = '5d772fb62bb54120d08d7a7b'
        try {
            await logic.leaveLeagues(id, leagueId)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`User with id ${id} does not exists`)
        }
        
    })
    it('should fail on incorrect league id', async () => {
        leagueId = '12345'
        try {
            await logic.leaveLeagues(id, leagueId)
            throw Error('should not reach this point') 
        }
        catch({message}){
            expect(message).to.equal(`League with id ${ leagueId } does not exists`)
        }
        
    })

    it('should fail on undefined user id', () => 
        expect(() => 
            logic.leaveLeagues(undefined, leagueId)
    ).to.throw(`id with value undefined is not a string`)
    )

    it('should fail on undefined league id', () => 
        expect(() => 
            logic.leaveLeagues(id,  undefined)
    ).to.throw(`League Id with value undefined is not a string`)
    )


    it('should fail on non-string user id', () => 
        expect(() => 
            logic.leaveLeagues(12345,  leagueId)
    ).to.throw(`id with value 12345 is not a string`)
    )

    it('should fail on non-string league id', () => 
        expect(() => 
            logic.leaveLeagues(id,  12345)
    ).to.throw(`League Id with value 12345 is not a string`)
    )


    it('should fail on empty id', () => 
        expect(() => 
            logic.leaveLeagues('',  leagueId)
    ).to.throw(`id is empty or blank`)
    )

    it('should fail on empty name', () => 
        expect(() => 
            logic.leaveLeagues(id,  '')
    ).to.throw(`League Id is empty or blank`)
    )


after(() => database.disconnect())
})