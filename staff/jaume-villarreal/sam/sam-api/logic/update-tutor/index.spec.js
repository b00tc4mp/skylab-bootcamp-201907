require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { env : { DB_URL_TEST } } = process

const { database , models : { Tutor }} = require('data')
// const { random : { value } } = require('utils')

const updateTutor = require('.')

describe('logic - update tutor', () => {
    before(() => database.connect(DB_URL_TEST))

    let name , surname , dni , phone1 , email , password

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        phone1 = `phone-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        body = {
            name : `name-${Math.random()}`,
            surname : `surname-${Math.random()}`,
            dni : `dni-${Math.random()}`,
            phone1 : `phone-${Math.random()}`,
            email : `email-${Math.random()}@mail.com`,
            password : `password-${Math.random()}`,
            extra: `extra-${Math.random()}`
        }

        await Tutor.deleteMany()

        const tutor = await Tutor.create({ name , surname , dni , phone1 ,  email , password : await bcrypt.hash(password,10) })
        tutorId = tutor.id
    })

    it('should succeed on correct data', async () =>{
        const result = await updateTutor(tutorId, body)
            expect(result.nModified).to.exist

        const _tutor = await Tutor.findById(tutorId)
            expect(_tutor).to.exist
            expect(_tutor.name).to.equal(body.name)
            expect(_tutor.surname).to.equal(body.surname)
            expect(_tutor.dni).to.equal(body.dni)
            expect(_tutor.phone1).to.equal(body.phone1)
            expect(_tutor.email).to.equal(body.email)

            const match = await bcrypt.compare(body.password,_tutor.password)
            expect(match).to.be.true

            expect(_tutor.extra).not.to.exist
    })

    it('should fail on non-existing user', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await updateTutor(id, body)
        } catch({ message }){
            expect(message).to.equal(`tutor with id ${id} does not exist`)
        }
    })

    it('should fail on empty id', () => 
        expect(() => updateTutor("", body)).to.throw('id is empty or blank')
    )
    
    it('should fail on wrong id type', () => 
        expect(() => updateTutor(123, body)).to.throw('id with value 123 is not a string')
    )

    after(() => database.disconnect())
})