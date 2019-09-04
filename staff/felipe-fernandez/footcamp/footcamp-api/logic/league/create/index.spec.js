require('dotenv').config()

const {expect} = require('chai')
const logic = require('../..')
const { database, models: { User, League } } = require('footcamp-data')

const { env: { DB_URL_TEST }} = process

describe.only('logic - create league', () => {
    
    before(() =>  database.connect(DB_URL_TEST))

    let name, surname, email, password, code

    beforeEach(() => {

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `password-${Math.random()}`

        return (async () => {
            await User.deleteMany()
            await League.deleteMany()
            const users = await User.create({name, surname, email, password})
            id = users.id
        })()
    
   })

    it('should succeed on correct data', async () => {
        
        const result = await logic.createLeague(id, name)
            expect(result).to.exist
            expect(result,code).to.exist
            expect(result.admin).to.exist
            expect(result.admin[0].toString()).to.equal(id)
            expect(result.name).to.equal(name)
        
        })

   
        it('should fail if the league already exists', async () => {

            await League.create({ id, name })
     
            try {
                 await logic.createLeague(id, name)
            } catch(error) {
                
                 expect(error).to.exist
                 expect(error.message).to.equal(`League exists!`)
            }
         })
        
            
   
        it('should fail on undefined league name', () => 
            expect(() => 
                logic.createLeague(id, undefined)
         ).to.throw(`name with value undefined is not a string`)
        )

        it('should fail on undefined user id', () => 
            expect(() => 
                logic.createLeague(undefined, name)
        ).to.throw(`id with value undefined is not a string`)
        )

       
        
    



        
    // it('should fail if the user already exists', async () => {

    //    await User.create({ name, surname, email, password })

    //    try {
    //         await logic.user.register(name, surname, email, password)
    //    } catch(error) {
    //         expect(error).to.exist
    //         expect(error.message).to.equal(`User already exists.`)
    //    }
    // })

    // /* Name */
    // it('should fail on empty name', () => 
    //     expect(() => 
    //            logic.user.register('', surname, email, password)
    // ).to.throw('name is empty or blank')
    // )

    //  it('should fail on undefined name', () => 
    //     expect(() => 
    //            logic.user.register(undefined, surname, email, password)
    // ).to.throw(`name with value undefined is not a string`)
    // )

    //  it('should fail on wrong data type for name', () => 
    //     expect(() => 
    //            logic.user.register(123, surname, email, password)
    // ).to.throw(`name with value 123 is not a string`)
    // )

    // /* Surname */
    // it('should fail on empty surname', () => 
    //     expect(() => 
    //            logic.user.register(name, '', email, password)
    // ).to.throw('surname is empty or blank')
    // )

    //  it('should fail on undefined surname', () => 
    //     expect(() => 
    //            logic.user.register(name, undefined, email, password)
    // ).to.throw(`surname with value undefined is not a string`)
    // )

    //  it('should fail on wrong data type for surname', () => 
    //     expect(() => 
    //            logic.user.register(name, 123, email, password)
    // ).to.throw(`surname with value 123 is not a string`)
    // )


    // /* Email */
    // it('should fail on empty email', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, '', password)
    // ).to.throw('email is empty or blank')
    // )

    //  it('should fail on undefined surname', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, undefined, password)
    // ).to.throw(`email with value undefined is not a string`)
    // )

    //  it('should fail on wrong data type for email', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, 123, password)
    // ).to.throw(`email with value 123 is not a string`)
    // )

    //  it('should fail on wrong email format', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, 'a@a', password)
    // ).to.throw(`email with value a@a is not a valid e-mail`)
    // )

    // /* Password */
    // it('should fail on empty password', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, email, '')
    // ).to.throw('password is empty or blank')
    // )

    //  it('should fail on undefined password', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, email, undefined)
    // ).to.throw(`password with value undefined is not a string`)
    // )

    //  it('should fail on wrong data type for password', () => 
    //     expect(() => 
    //            logic.user.register(name, surname, email, 123)
    // ).to.throw(`password with value 123 is not a string`)
    // )


    after(() => database.disconnect())
})