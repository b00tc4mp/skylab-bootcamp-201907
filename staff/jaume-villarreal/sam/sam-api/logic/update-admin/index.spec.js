require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { env : { DB_URL_TEST } } = process

const { database , models : { Admin , Activity }} = require('data')
const { random : { value } } = require('utils')

const updateAdmin = require('.')

describe('logic - update admin', () => {
    before(() => database.connect(DB_URL_TEST))

    let name , surname , dni , accreditation , age , role , activity , email , password
    let userId , activityId

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        accreditation = `accreditation-${Math.random()}`
        age = Math.random()
        role = value(0,1)
        activity  = value("Casalet INF" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo")
        email = `admin-email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
        
        body = {
            name : `name-${Math.random()}`,
            surname : `surname-${Math.random()}`,
            dni : `dni-${Math.random()}`,
            accreditation : `accreditation-${Math.random()}`,
            age : Math.random(),
            role : value(0,1),
            activity  : value("Casalet INF" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo"),
            email : `admin-email-${Math.random()}@mail.com`,
            password : `password-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }

        await Admin.deleteMany()

        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id

        const admin = await Admin.create({ name , surname , dni , accreditation , age , role , activityId , email , password : await bcrypt.hash(password,10) })
        adminId = admin.id
    })

    it('should succeed on correct data', async () =>{
        const result = await updateAdmin(adminId, body)
            expect(result.nModified).to.exist

        const _admin = await Admin.findById(adminId)
            expect(_admin).to.exist
            expect(_admin.name).to.equal(body.name)
            expect(_admin.surname).to.equal(body.surname)
            expect(_admin.dni).to.equal(body.dni)
            expect(_admin.accreditation).to.equal(body.accreditation)
            expect(_admin.age).to.equal(body.age)
            expect(_admin.role).to.equal(body.role)
            expect(_admin.email).to.equal(body.email)

            const match = await bcrypt.compare(body.password , _admin.password)
            expect(match).to.be.true
    
            expect(_admin.extra).not.to.exist
    })

    it('should fail on non-existing user', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await updateAdmin(id, body)
        } catch({ message }){
            expect(message).to.equal(`admin with id ${id} does not exist`)
        }
    })

    it('should fail on empty id', () => 
        expect(() => updateAdmin("", body)).to.throw('id is empty or blank')
    )
    
    it('should fail on wrong id type', () => 
        expect(() => updateAdmin(123, body)).to.throw('id with value 123 is not a string')
    )

    after(() => database.disconnect())
})