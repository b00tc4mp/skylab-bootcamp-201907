require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { env : { DB_URL_TEST } } = process

const { database , models : { Student , Tutor }} = require('data')
const { formatDate } = require('utils')

const updateStudent = require('.')

describe('logic - update student', () => {
    before(() => database.connect(DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard , body
    let studentId , tutorId
    let tutorName , tutorSurname , tutorDNI , phone1 , email, password

    beforeEach(async () => {
        studentName = `student-name-${Math.random()}`
        studentSurname = `student-surname-${Math.random()}`
        birthdate = formatDate(new Date())
        healthcard  = `healtcard-${Math.random()}`

        body = {
            name : `updated-student-name-${Math.random()}`,
            surname : `updated-student-surname-${Math.random()}`,
            birthdate : `updated-birthdate-${formatDate(new Date())}`,
            healthcard : `updated-healtcard-${Math.random()}`,
            extra: `extra-${Math.random()}` 
        }

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
        const result = await updateStudent(studentId, body)
            expect(result.nModified).to.exist
            
        const _student = await Student.findById(studentId)
            expect(_student).to.exist
            expect(_student.name).to.equal(body.name)
            expect(_student.surname).to.equal(body.surname)
            expect(_student.birthdate).to.equal(body.birthdate)
            expect(_student.healthcard).to.equal(body.healthcard)
            expect(_student.extra).not.to.exist
    })

    it('should fail on non-existing student', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await updateStudent(studentId, body)
        } catch({ message }){
            expect(message).to.equal(`student with id ${studentId} does not exist`)
        }
    })

    it('should fail on empty id', () => 
        expect(() => updateStudent("", body)).to.throw('id is empty or blank')
    )
    
    it('should fail on wrong id type', () => 
        expect(() => updateStudent(123, body)).to.throw('id with value 123 is not a string')
    )

    after(() => database.disconnect())
})