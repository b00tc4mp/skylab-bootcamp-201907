require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe('logic - create league', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, nameLeague, code
    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`
        nameLeague = `nameLeague-${Math.random()}`
        code = `code-${Math.random()}`

        return (async () => {
            await User.deleteMany()
          
            const users = await User.create({name, surname, email, password})
            id = users.id
           
        })()
    
   })

    it('should succeed on correct data', async () => {
        const result = await logic.createLeague(id, nameLeague, code)
            expect(result).not.to.exist
        const league = await League.findOne({name: nameLeague, code})
            expect(league).to.exist
            expect(league.team).to.exist
            expect(league.name).to.equal(nameLeague)
            expect(league.code).to.equal(code)
           
        
    })

        it('should fail if the league already exists', async () => {

            await League.create({ id, name: nameLeague,code  })
     
            try {
                 await logic.createLeague(id, nameLeague, code)
            } catch(error) {
                
                 expect(error).to.exist
                 expect(error.message).to.equal(`league with name ${nameLeague} alredy exists`)
            }
         })

               
            
   
        it('should fail on undefined league name', () => 
            expect(() => 
                logic.createLeague(id, undefined, code)
         ).to.throw(`name with value undefined is not a string`)
        )

        it('should fail on undefined user id', () => 
            expect(() => 
                logic.createLeague(undefined, nameLeague,code)
        ).to.throw(`id with value undefined is not a string`)
        )

        it('should fail on undefined code', () => 
            expect(() => 
                logic.createLeague(id, nameLeague, undefined)
        ).to.throw(`code with value undefined is not a string`)
        )


       
   
        it('should fail on non-string league name', () => 
            expect(() => 
                logic.createLeague(id, 12345, code)
         ).to.throw(`name with value 12345 is not a string`)
        )

        it('should fail on non-string user id', () => 
            expect(() => 
                logic.createLeague(12345, nameLeague, code)
        ).to.throw(`id with value 12345 is not a string`)
        )


        it('should fail on non-string code', () => 
        expect(() => 
            logic.createLeague(id, nameLeague, 12345)
    ).to.throw(`code with value 12345 is not a string`)
    )


       it('should fail on empty id', () => 
        expect(() => 
        logic.createLeague('', nameLeague, code)
        ).to.throw(`id is empty or blank`)
        )
    
        it('should fail on empty name', () => 
        expect(() => 
        logic.createLeague(id, '', code)
        ).to.throw(`name is empty or blank`)
        )

        it('should fail on empty code', () => 
        expect(() => 
        logic.createLeague(id, nameLeague, '')
        ).to.throw(`code is empty or blank`)
        )


    after(() => database.disconnect())
})