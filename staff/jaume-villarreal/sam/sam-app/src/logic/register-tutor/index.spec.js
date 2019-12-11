import logic from '../../logic'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const { Tutor } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
// const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

const { random } = Math

describe.only("logic - register tutor" , ()=>{
    
    beforeAll( ()=> database.connect(REACT_APP_DB_URL_TEST))

    let name , surname , dni , phone1 , email , password , repassword

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
        const result = await logic.registerTutor(name , surname , dni , phone1 ,  email , password , password)
        expect(result).toBeDefined()

        const tutor = await Tutor.findOne({ email })
        expect(tutor.id).toBeDefined()
        expect(tutor.name).toBe(name)
        expect(tutor.surname).toBe(surname)
        expect(tutor.dni).toBe(dni)
        expect(tutor.phone1).toBe(phone1)
        expect(tutor.email).toBe(email)
        
        const match = await bcrypt.compare(password,tutor.password)
        expect(match).toBeTruthy()
    })

    it("should fail on existing tutor" , async () => {
        await Tutor.create({ name , surname , dni , phone1 ,  email , password })
        try{
            await logic.registerTutor(name , surname , dni , phone1 ,  email , password , password)
        }catch({ message }){
            expect(message).toBe(`tutor with email ${email} already exists`)
        }
    })

    it('should fail on empty name' , () =>
        expect(() => logic.registerTutor("" , surname , dni , phone1 ,  email , password)).toThrow('name is empty or blank')
    )
    
    it('should fail on wrong name type' , () =>
        expect(() => logic.registerTutor(123 , surname , dni , phone1 ,  email , password , password)).toThrow('name with value 123 is not a string')
    )

    it('should fail on empty surname' , ( )=>
        expect(() => logic.registerTutor(name , "" , dni , phone1 ,  email , password , password)).toThrow('surname is empty or blank')
    )

    it('should fail on wrong surname type' , () =>
        expect(() => logic.registerTutor(name , 123 , dni , phone1 ,  email , password , password)).toThrow('surname with value 123 is not a string')
    )
    
    it('should fail on empty dni' , () =>
        expect(() => logic.registerTutor(name , surname , "" , phone1 ,  email , password , password)).toThrow('dni is empty or blank')
    )
    
    it('should fail on wrong dni type' , () =>
        expect(() => logic.registerTutor(name , surname , 123 , phone1 ,  email , password , password)).toThrow('dni with value 123 is not a string')
    )
    
    it('should fail on empty phone1' , () =>
        expect(() => logic.registerTutor(name , surname , dni , "" ,  email , password , password)).toThrow('phone1 is empty or blank')
    )

    it('should fail on wrong phone1 type' , () =>
        expect(() => logic.registerTutor(name , surname , dni , 123 ,  email , password , password)).toThrow('phone1 with value 123 is not a string')
    )

    it('should fail on empty email' , () =>
        expect(() => logic.registerTutor(name , surname , dni , phone1 ,  "" , password , password)).toThrow('email is empty or blank')
    )
    
    it('should fail on wrong email type' , () =>
        expect(() => logic.registerTutor(name , surname , dni , phone1 ,  123 , password , password)).toThrow('email with value 123 is not a string')
    )
    
    it('should fail on wrong email format' , () =>
        expect(() => logic.registerTutor(name , surname , dni , phone1 ,  "123@mailcom" , password , password)).toThrow('email with value 123@mailcom is not a valid e-mail')
    )
    
    it('should fail on empty password' , () =>
        expect(() => logic.registerTutor(name , surname , dni , phone1 ,  email , "" , password)).toThrow('password is empty or blank')
    )
    
    it('should fail on wrong password type' , () =>
    expect(() => logic.registerTutor(name , surname , dni , phone1 ,  email , 123 , password)).toThrow('password with value 123 is not a string')
    )
    
    it('should fail on empty repassword' , () =>
        expect(() => logic.registerTutor(name , surname , dni , phone1 ,  email , password , "")).toThrow('password is empty or blank')
    )
    
    it('should fail on wrong repassword type' , () =>
        expect(() => logic.registerTutor(name , surname , dni , phone1 ,  email , password , 123)).toThrow('password with value 123 is not a string')
    )
    
    it('should fail on not matching passwords' , () =>
        expect(() => logic.registerTutor(name , surname , dni , phone1 ,  email , password , '123')).toThrow('passwords don\'t match')
    )

    afterAll(database.disconnect())
})