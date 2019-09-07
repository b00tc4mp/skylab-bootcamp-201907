require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League, Team, Player } } = require('footcamp-data')
const {  random : { number }  } = require('footcamp-utils')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all leagues', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameTeam, nameLeague, nameLeague2, nameLeague3, points, idLeague, idLeague2, idLeague3
    let code, code2, code3

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        nameLeague2 = `nameLeague-${Math.random()}`
        nameLeague3 = `nameLeague-${Math.random()}`
        nameTeam = `nameTeam-${Math.random()}`
        code = `code-${Math.random()}`
        code2 = `code-${Math.random()}`
        code3 = `code-${Math.random()}`
        points= 0
  
         return (async () => {
            await User.deleteMany()
            await League.deleteMany()
                        
          
            const users = await User.create({name, surname, email, password})
            id = users.id

            const league = new League({id, name: nameLeague, code})
            idLeague =league.id 
            const league2 = new League({id, name: nameLeague2, code: code2})
            idLeague2 = league2.id
            const league3 = new League({id, name: nameLeague3, code: code3})
            idLeague3 = league3.id 
            debugger
            users.leagues.push(idLeague)
            users.leagues.push(idLeague2)
            users.leagues.push(idLeague3)
             
             
            
            await league.save()
            await league2.save()
            await league3.save()
            await users.save()


                       
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.retrieveAllLeague(id)
        
        
            expect(result).to.exist
            expect(result.length).to.equal(3)
            expect(result[0].name).to.equal(nameLeague)
            expect(result[1].name).to.equal(nameLeague2)
            expect(result[2].name).to.equal(nameLeague3)
            expect(result[0].code).to.equal(code)
            expect(result[1].code).to.equal(code2)
            expect(result[2].code).to.equal(code2)
            expect(result.id[0]).to.equal(idLeague)
            expect(result.id[1]).to.equal(idLeague2)
            expect(result.id[2]).to.equal(idLeague3)
            
                     

        
    })


    // it('should fail if the league does not exist', async () => {

    //     await League.create({ id, name: nameLeague, code })
    //     await League.deleteMany()
    //     try {
    //          await logic.lineUpTeam(id, code, nameTeam)
    //     } catch(error) {
            
    //          expect(error).to.exist
    //          expect(error.message).to.equal(`League with code ${code} does not exist`)
    //     }
    //  })

    // it('should fail on incorrect user id', async () => {
    //     id = '5d772fb62bb54120d08d7a7b'
    //     try {
    //         await logic.lineUpTeam(id, code, nameTeam)
    //         throw Error('should not reach this point') 
    //     }
    //     catch({message}){
    //         expect(message).to.equal(`User with id ${id} does not exist`)
    //     }
        
    // })

    // it('should fail if the team name does not exist', async () => {

    //     await League.create({ id, name: nameLeague,code  })

       
    //     try {
    //         await logic.lineUpTeam(id, code, '12345')
    //         throw Error('should not reach this point') 
    //     }
    //     catch({message}){
    //         expect(message).to.equal(`Team with name 12345 does not exist`)
    //     }
        
    // })
     
     

    // it('should fail on undefined league name', () => 
    //     expect(() => 
    //         logic.lineUpTeam(id, code, undefined)
    //  ).to.throw(`name with value undefined is not a string`)
    // )

    // it('should fail on undefined user id', () => 
    //     expect(() => 
    //         logic.lineUpTeam(undefined, code, nameTeam)
    // ).to.throw(`id with value undefined is not a string`)
    // )

    // it('should fail on undefined code', () => 
    //     expect(() => 
    //         logic.lineUpTeam(id, undefined, nameTeam)
    // ).to.throw(`code with value undefined is not a string`)
    // )
    


    // it('should fail on non-string team name', () => 
    //     expect(() => 
    //         logic.lineUpTeam(id, code, 12345)
    // ).to.throw(`name with value 12345 is not a string`)
    // )

    // it('should fail on non-string user id', () => 
    //     expect(() => 
    //         logic.lineUpTeam(12345, code, nameTeam)
    // ).to.throw(`id with value 12345 is not a string`)
    // )

    // it('should fail on non-string code', () => 
    //     expect(() => 
    //         logic.lineUpTeam(id, 12345, nameTeam)
    // ).to.throw(`code with value 12345 is not a string`)
    // )

   
            
    //  it('should fail on empty id', () => 
    //     expect(() => 
    //             logic.lineUpTeam('', code, nameTeam)
    //     ).to.throw(`id is empty or blank`)
    //     )

    // it('should fail on empty code', () => 
    //     expect(() => 
    //             logic.lineUpTeam(id, '', nameTeam)
    // ).to.throw(`code is empty or blank`)
    //     )

    // it('should fail on empty name team', () => 
    //      expect(() => 
    //             logic.lineUpTeam(id, code, '')
    // ).to.throw(`name is empty or blank`)
    //     )



    after(() => database.disconnect())
})