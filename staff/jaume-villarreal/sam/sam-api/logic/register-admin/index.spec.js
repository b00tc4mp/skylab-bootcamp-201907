require('dotenv').config()
const bcrypt = require('bcryptjs')

const { expect } = require('chai')
const { env : { DB_URL_TEST } } = process

const { database , models : { Admin , Activity }} = require('data')
const { random : { value } } = require('utils')
const registerAdmin = require('.')


describe("logic - register admin" , ()=>{
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , dni , accreditation , age , role , activity , email , password , activityId

    beforeEach( async ()=> {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        accreditation = `accreditation-${Math.random()}`
        age = Math.random()
        role = value(0,1)
        activity  = value("Casalet INF" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo")
        email = `admin-email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await Admin.deleteMany()
    })

    it('should succeed on correct data' , async ()=>{
        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id
        
        const result = await registerAdmin(name , surname , dni , accreditation , age , role , activity , email , password)
        expect(result).to.exist
        
        const admin = await Admin.findOne({ email })

        expect(admin).to.exist
        expect(admin.name).to.equal(name)
        expect(admin.surname).to.equal(surname)
        expect(admin.dni).to.equal(dni)
        expect(admin.accreditation).to.equal(accreditation)
        expect(admin.age).to.equal(age)
        expect(admin.role).to.equal(role)
        expect(admin.activity.toString()).to.equal(activityId)
        expect(admin.email).to.equal(email)

        const hashed = await bcrypt.compare(password , admin.password)
        expect(hashed).to.be.true

    })
    
    it('should fail on unexisting activity' , async ()=>{
        activity = "Casal handbol"
        try{
            await registerAdmin(name , surname , dni , accreditation , age , role , activity , email , password)
        }catch({ message }){
            expect(message).to.equal(`activity ${activity} does not exist`)
        }   
    })

    it("should fail on  existing admin" , async () => {
        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id

        await Admin.create({ name , surname , dni , accreditation , age , role , activity : activityId , email , password })

        try{
            await registerAdmin(name , surname , dni , accreditation , age , role , activity , email , password)
        }catch({ message }){
            expect(message).to.equal(`admin with email ${email} already exists`)
        }
    })

    it('should fail on empty name' , () =>
        expect(() => registerAdmin( "" , surname , dni , accreditation , age , role , activity , email , password) ).to.throw('name is empty or blank')
    )
    
    it('should fail on wrong name type' , () =>
        expect(() => registerAdmin(123 , surname , dni , accreditation , age , role , activity , email , password) ).to.throw('name with value 123 is not a string')
    )

    it('should fail on empty surname' , ( )=>
        expect(() => registerAdmin( name , "" , dni , accreditation , age , role , activity , email , password ) ).to.throw('surname is empty or blank')
    )

    it('should fail on wrong surname type' , () =>
        expect(() => registerAdmin( name , 123 , dni , accreditation , age , role , activity , email , password )).to.throw('surname with value 123 is not a string')
    )
    
    it('should fail on empty dni' , () =>
        expect(() => registerAdmin( name , surname , "" , accreditation , age , role , activity , email , password)).to.throw('dni is empty or blank')
    )
    
    it('should fail on wrong dni type' , () =>
        expect(() => registerAdmin( name , surname , 123 , accreditation , age , role , activity , email , password )).to.throw('dni with value 123 is not a string')
    )
    
    it('should fail on empty accreditation' , () =>
        expect(() => registerAdmin( name , surname , dni , "" , age , role , activity , email , password)).to.throw('accreditation is empty or blank')
    )

    it('should fail on wrong accreditation type' , () =>
        expect(() => registerAdmin( name , surname , dni , 123 , age , role , activity , email , password)).to.throw('accreditation with value 123 is not a string')
    )
    
    it('should fail on empty age' , () =>
        expect(() => registerAdmin( name , surname , dni , accreditation , "123" , role , activity , email , password )).to.throw('age with value 123 is not a number')
    )
    
    it('should fail on empty role' , () =>
        expect(() => registerAdmin( name , surname , dni , accreditation , age , "role" , activity , email , password )).to.throw('role with value role is not a number')
    )
    
    it('should fail on empty activity' , () =>
        expect(() => registerAdmin( name , surname , dni , accreditation , age , role , "" , email , password )).to.throw('activity is empty or blank')
    )
    
    it('should fail on wrong activity type' , () =>
        expect(() => registerAdmin( name , surname , dni , accreditation , age , role , 123 , email , password )).to.throw('activity with value 123 is not a string')
    )

    it('should fail on empty email' , () =>
    expect(() => registerAdmin( name , surname , dni , accreditation , age , role , activity , "" , password )).to.throw('email is empty or blank')
    )

    it('should fail on wrong email type' , () =>
        expect(() => registerAdmin( name , surname , dni , accreditation , age , role , activity , 123 , password )).to.throw('email with value 123 is not a string')
    )

    it('should fail on empty email' , () =>
        expect(() => registerAdmin( name , surname , dni , accreditation , age , role , activity , "123@mailcom" , password )).to.throw('email with value 123@mailcom is not a valid e-mail')
    )

    it('should fail on empty password' , () =>
        expect(() => registerAdmin( name , surname , dni , accreditation , age , role , activity , email , "")).to.throw('password is empty or blank')
    )

    it('should fail on wrong password type' , () =>
        expect(() => registerAdmin( name , surname , dni , accreditation , age , role , activity , email , 123 )).to.throw('password with value 123 is not a string')
    )

    after(database.disconnect())
})





