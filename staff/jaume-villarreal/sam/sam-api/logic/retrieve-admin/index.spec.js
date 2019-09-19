require ('dotenv').config()
const bcrypt = require ('bcryptjs')
const { expect } = require('chai')

const { database , models : { Admin , Activity }} = require('data')
const { random : { value } } = require('utils')

const retrieveAdmin = require('.')

const { env : { DB_URL_TEST } } = process

describe('logic - retrieve admin', () => {
    before(() => database.connect(DB_URL_TEST))

    let name , surname , dni , accreditation , age , role , activityName , email , password
    let adminId , activityId

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        accreditation = `accreditation-${Math.random()}`
        age = Math.random()
        role = value(0,1)
        activityName  = value("Casalet INF" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo")
        email = `admin-email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        const _activity = await Activity.findOne({ name : activityName })
        activityId = _activity.id

        await Admin.deleteMany()

        const newAdmin = await Admin.create({ name , surname , dni , accreditation , age , role , activity : activityId , email , password : await bcrypt.hash(password,10) })
        adminId = newAdmin.id
    })

    it('should succeed on correct data', async () =>{
        const admin = await retrieveAdmin(adminId)
        expect(admin).to.exist
        expect(admin.name).to.equal(name)
        expect(admin.surname).to.equal(surname)
        expect(admin.dni).to.equal(dni)
        expect(admin.accreditation).to.equal(accreditation)
        expect(admin.age).to.equal(age)
        expect(admin.role).to.equal(role)
        expect(admin.activity.toString()).to.equal(activityId)
        expect(admin.email).to.equal(email) 
        expect(admin.password).not.to.exist
    })

    it('should fail on a non existing user' , async () =>{
        id = '5d5d5530531d455f75da9fF9'
        try{
            await retrieveAdmin(id)
        } catch({ message }){
            expect(message).to.equal(`admin with id ${id} not found`)
        }
    })

    it('should fail on empty admin id', () => 
        expect(() => retrieveAdmin("")).to.throw('admin id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => retrieveAdmin(123)).to.throw('admin id with value 123 is not a string'))

    after(() => database.disconnect())
})