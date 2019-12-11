require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Student , Tutor }} = require('data')
const { formatDate } = require('utils')

const retireveStudentsByTutor = require('.')

const { env : { DB_URL_TEST } } = process

describe('logic - retrieve students by tutor', () => {
    before(() => database.connect(DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard
    let studentId1, studentId2 , studentId3 , tutorId
    let tutorName , tutorSurname , tutorDNI , phone1 , email, password

    beforeEach(async () => {
        studentName1 = `student1-name-${Math.random()}`
        studentSurname1 = `student1-surname-${Math.random()}`
        birthdate1 = formatDate(new Date())
        healthcard1  = `healtcard1-${Math.random()}`
        
        studentName2 = `student2-name-${Math.random()}`
        studentSurname2 = `student2-surname-${Math.random()}`
        birthdate2 = formatDate(new Date())
        healthcard2  = `healtcard2-${Math.random()}`
        
        studentName3 = `student3-name-${Math.random()}`
        studentSurname3 = `student3-surname-${Math.random()}`
        birthdate3 = formatDate(new Date())
        healthcard3 = `healtcard3-${Math.random()}`

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

        const student1 = await Student.create({ name : studentName1 , surname : studentSurname1 , birthdate : birthdate1 , healthcard : healthcard1 , tutor:tutorId })
        studentId1 = student1.id
        
        const student2 = await Student.create({ name : studentName2 , surname : studentSurname2 , birthdate : birthdate2 , healthcard : healthcard2 , tutor:tutorId })
        studentId2 = student2.id
        
        const student3 = await Student.create({ name : studentName3 , surname : studentSurname3 , birthdate : birthdate3 , healthcard : healthcard3 , tutor:tutorId })
        studentId3 = student3.id
    })

    it('should succeed on correct data', async () =>{
        const students = await retireveStudentsByTutor(tutorId)
        expect(students).to.have.lengthOf(3)

        expect(students[0].id).to.equal(studentId1)
        expect(students[0].name).to.equal(studentName1)
        expect(students[0].surname).to.equal(studentSurname1)
        expect(students[0].birthdate).to.equal(birthdate1)
        expect(students[0].healthcard).to.equal(healthcard1)

        debugger
        
        expect(students[1].id).to.equal(studentId2)
        expect(students[1].name).to.equal(studentName2)
        expect(students[1].surname).to.equal(studentSurname2)
        expect(students[1].birthdate).to.equal(birthdate2)
        expect(students[1].healthcard).to.equal(healthcard2)
        
        expect(students[2].id).to.equal(studentId3)
        expect(students[2].name).to.equal(studentName3)
        expect(students[2].surname).to.equal(studentSurname3)
        expect(students[2].birthdate).to.equal(birthdate3)
        expect(students[2].healthcard).to.equal(healthcard3)
    })

    it('should fail on a non existing tutor' , async () =>{
        const id = '5d5d5530531d455f75da9fF9'
        try{
            await retireveStudentsByTutor(id)
        } catch({ message }){
            expect(message).to.equal(`tutor with id ${id} not found`)
        }
    })

    it('should fail on empty student id', () => 
        expect(() => retireveStudentsByTutor("")).to.throw('tutor id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => retireveStudentsByTutor(123)).to.throw('tutor id with value 123 is not a string'))

    after(() => database.disconnect())
})