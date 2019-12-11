require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Tutor }} = require('data')

const registerTutor = require('.')

const { env : { DB_URL_TEST } } = process

describe("logic - register tutor" , ()=>{
    
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , dni , phone1 , email , password

    beforeEach( async ()=> {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        phone1 = `phone-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        await Tutor.deleteMany()
    })

    it('should succeed on correct data' , async()=>{
        const result = await registerTutor(name , surname , dni , phone1 ,  email , password)
        expect(result).to.exist

        const tutor = await Tutor.findOne({ email })
        expect(tutor.id).to.exist
        expect(tutor.name).to.equal(name)
        expect(tutor.surname).to.equal(surname)
        expect(tutor.dni).to.equal(dni)
        expect(tutor.phone1).to.equal(phone1)
        expect(tutor.email).to.equal(email)
        
        const match = await bcrypt.compare(password,tutor.password)
        expect(match).to.be.true
    })

    it("should fail on existing tutor" , async () => {
        await Tutor.create({ name , surname , dni , phone1 ,  email , password })
        try{
            await registerTutor(name , surname , dni , phone1 ,  email , password)
        }catch({ message }){
            expect(message).to.equal(`tutor with email ${email} already exists`)
        }
    })

    it('should fail on empty name' , () =>
        expect(() => registerTutor("" , surname , dni , phone1 ,  email , password)).to.throw('name is empty or blank')
    )
    
    it('should fail on wrong name type' , () =>
        expect(() => registerTutor(123 , surname , dni , phone1 ,  email , password)).to.throw('name with value 123 is not a string')
    )

    it('should fail on empty surname' , ( )=>
        expect(() => registerTutor(name , "" , dni , phone1 ,  email , password)).to.throw('surname is empty or blank')
    )

    it('should fail on wrong surname type' , () =>
        expect(() => registerTutor(name , 123 , dni , phone1 ,  email , password)).to.throw('surname with value 123 is not a string')
    )
    
    it('should fail on empty dni' , () =>
        expect(() => registerTutor(name , surname , "" , phone1 ,  email , password)).to.throw('dni is empty or blank')
    )
    
    it('should fail on wrong dni type' , () =>
        expect(() => registerTutor(name , surname , 123 , phone1 ,  email , password)).to.throw('dni with value 123 is not a string')
    )
    
    it('should fail on empty phone1' , () =>
        expect(() => registerTutor(name , surname , dni , "" ,  email , password)).to.throw('phone1 is empty or blank')
    )

    it('should fail on wrong phone1 type' , () =>
        expect(() => registerTutor(name , surname , dni , 123 ,  email , password)).to.throw('phone1 with value 123 is not a string')
    )

    it('should fail on empty email' , () =>
        expect(() => registerTutor(name , surname , dni , phone1 ,  "" , password)).to.throw('email is empty or blank')
    )
    
    it('should fail on wrong email type' , () =>
        expect(() => registerTutor(name , surname , dni , phone1 ,  123 , password)).to.throw('email with value 123 is not a string')
    )
    
    it('should fail on wrong email format' , () =>
        expect(() => registerTutor(name , surname , dni , phone1 ,  "123@mailcom" , password)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )
    
    it('should fail on empty password' , () =>
        expect(() => registerTutor(name , surname , dni , phone1 ,  email , "")).to.throw('password is empty or blank')
    )
    
    it('should fail on wrong password wrong' , () =>
        expect(() => registerTutor(name , surname , dni , phone1 ,  email , 123)).to.throw('password with value 123 is not a string')
    )
    
    after(database.disconnect())
})