require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Student , Tutor }} = require('data')
const { formatDate } = require('utils')

const retrieveStudent = require('.')

const { env : { DB_URL_TEST } } = process

describe('logic - retrieve student', () => {
    before(() => database.connect(DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard
    let studentId , tutorId
    let tutorName , tutorSurname , tutorDNI , phone1 , email, password

    beforeEach(async () => {
        studentName = `student-name-${Math.random()}`
        studentSurname = `student-surname-${Math.random()}`
        birthdate = formatDate(new Date())
        healthcard  = `healtcard-${Math.random()}`

        tutorName = `tutor-name-${Math.random()}`
        tutorSurname = `tutor-surname-${Math.random()}`
        tutorDNI = `tutor-dni-${Math.random()}`
        phone1 = `phone1-${Math.random()}`
        email = `tutor-email-${Math.random()}@mail.com`
        password = `tutor-password-${Math.random()}`

        await Student.deleteMany()
        await Tutor.deleteMany()

        const tutor = await Tutor.create({ name : tutorName , surname : tutorSurname , dni : tutorDNI , phone1 , email, password : await bcrypt.hash(password,10) })
        tutorId = tutor.id

        const student = await Student.create({ name : studentName , surname : studentSurname , birthdate , healthcard , tutor:tutorId})
        studentId = student.id
    })

    it('should succeed on correct data', async () =>{
        const student = await retrieveStudent(studentId)
        expect(student).to.exist
        expect(student.name).to.equal(studentName)
        expect(student.surname).to.equal(studentSurname)
        expect(student.birthdate).to.equal(birthdate)
        expect(student.healthcard).to.equal(healthcard)
    })

    it('should fail on a non existing student' , async () =>{
        id = '5d5d5530531d455f75da9fF9'
        try{
            await retrieveStudent(studentId)
        } catch({ message }){
            expect(message).to.equal(`student with id ${studentId} not found`)
        }
    })

    it('should fail on empty student id', () => 
        expect(() => retrieveStudent("")).to.throw('student id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => retrieveStudent(123)).to.throw('student id with value 123 is not a string'))

    after(() => database.disconnect())
})