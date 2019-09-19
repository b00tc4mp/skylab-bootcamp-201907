require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Tutor }} = require('data')
const { random : { value } } = require('utils')

const authenticateTutor = require('.')

const { env : { DB_URL_TEST } } = process

describe("logic - authenticate tutor" , ()=>{
    
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , dni , phone1 , email , password , tutorId

    beforeEach( async ()=> {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        phone1 = `phone1-${Math.random()}`
        email = `tutor-email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await Tutor.deleteMany()

        const tutor = await Tutor.create({ name , surname , dni , phone1 , email , password : await bcrypt.hash(password,10)})
        tutorId = tutor.id
    })

    it('should succeed on correct data' , async()=>{
        const id = await authenticateTutor(email , password)
        expect(id).to.exist
        expect(id).to.equal(tutorId)
    })

    it('should fail on unexisting tutor' , async()=>{
        try{
            await authenticateTutor("unexisting@mail.com" , password)
        }catch({ message }){
            expect(message).to.equal(`tutor with email unexisting@mail.com does not exist`)
        }
    })
    
    it('should fail on wrong credentials' , async()=>{
        try{
            await authenticateTutor(email , '123')
        }catch({ message }){
            expect(message).to.equal("wrong credentials")
        }
    })

    it('should fail on empty email' , () =>
        expect(() => authenticateTutor("" , password)).to.throw('email is empty or blank')
    )
    
    it('should fail on wrong email type' , () =>
        expect(() => authenticateTutor(123 , password)).to.throw('email with value 123 is not a string')
    )
    
    it('should fail on wrong email format' , () =>
        expect(() => authenticateTutor("123@mailcom" , password)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )
    
    it('should fail on empty password' , () =>
        expect(() => authenticateTutor(email , "")).to.throw('password is empty or blank')
    )
    
    it('should fail on wrong password wrong' , () =>
        expect(() => authenticateTutor(email , 123)).to.throw('password with value 123 is not a string')
    )

    after(database.disconnect())
})