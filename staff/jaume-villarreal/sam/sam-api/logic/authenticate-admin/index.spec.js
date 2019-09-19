require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Admin , Activity }} = require('data')
const { random : { value } } = require('utils')

const authenticateAdmin = require('.')

const { env : { DB_URL_TEST } } = process

describe("logic - authenticate admin" , ()=>{
    
    before( ()=> database.connect(DB_URL_TEST))

    let name , surname , dni , accreditation , age , role , activity , email , password
    let adminId , activityId

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

        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id
        
        const admin = await Admin.create({ name , surname , dni , accreditation , age , role , activity : activityId , email , password : await bcrypt.hash(password,10) })
        adminId = admin.id
    })
    
    it('should succeed on correct data' , async()=>{
        const id = await authenticateAdmin(email , password)
        expect(id).to.exist
        expect(id).to.equal(adminId)
        // const match = await bcrypt.compare(password , )
    })

    it('should fail on unexisting admin' , async()=>{
        try{
            await authenticateAdmin("unexisting@mail.com" , password)
        }catch({ message }){
            expect(message).to.equal(`admin with email unexisting@mail.com does not exist`)
        }
    })
    
    it('should fail on wrong credentials' , async()=>{
        try{
            await authenticateAdmin(email , '123')
        }catch({ message }){
            expect(message).to.equal("wrong credentials")
        }
    })

    it('should fail on empty email' , () =>
        expect(() => authenticateAdmin("" , password)).to.throw('email is empty or blank')
    )
    
    it('should fail on wrong email type' , () =>
        expect(() => authenticateAdmin(123 , password)).to.throw('email with value 123 is not a string')
    )
    
    it('should fail on wrong email format' , () =>
        expect(() => authenticateAdmin("123@mailcom" , password)).to.throw('email with value 123@mailcom is not a valid e-mail')
    )
    
    it('should fail on empty password' , () =>
        expect(() => authenticateAdmin(email , "")).to.throw('password is empty or blank')
    )
    
    it('should fail on wrong password wrong' , () =>
        expect(() => authenticateAdmin( email , 123)).to.throw('password with value 123 is not a string')
    )

    after(database.disconnect())
})