require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Tutor }} = require('data')
const { random : { value } } = require('utils')

const retrieveTutor = require('.')

const { env : { DB_URL_TEST } } = process

describe('logic - retrieve tutor', () => {
    before(() => database.connect(DB_URL_TEST))

    let name , surname , dni , phone1 , email , password , tutorId

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        phone1 = `phone-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`

        await Tutor.deleteMany()

        const newTutor = await Tutor.create({ name , surname , dni , phone1 , email , password : await bcrypt.hash(password,10) })
        tutorId = newTutor.id
    })

    it('should succeed on correct data', async () =>{
        const tutor = await retrieveTutor(tutorId)
        expect(tutor).to.exist
        expect(tutor.name).to.equal(name)
        expect(tutor.surname).to.equal(surname)
        expect(tutor.phone1).to.equal(phone1)
        expect(tutor.email).to.equal(email) 
        expect(tutor.password).not.to.exist
    })

    it('should fail on a non existing tutor' , async () =>{
        id = '5d5d5530531d455f75da9fF9'
        try{
            await retrieveTutor(tutorId)
        } catch({ message }){
            expect(message).to.equal(`tutor with id ${id} not found`)
        }
    })

    it('should fail on empty admin id', () => 
        expect(() => retrieveTutor("")).to.throw('tutor id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => retrieveTutor(123)).to.throw('tutor id with value 123 is not a string'))

    after(() => database.disconnect())
})