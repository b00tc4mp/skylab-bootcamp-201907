require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Student , Tutor } } = require('data')
const { formatDate } = require('utils')
const registerStudent = require('.')


describe.only('logic - register student' , ()=>{
    before( () => database.connect(DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard
    let studentId , tutorId
    let tutorName , tutorSurname , tutorDNI , phone1 , email, password

    beforeEach( async () => {
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
    })
    
    it("should succeed on correct data" , async ()=> {
        // const result = await registerStudent(studentName , studentSurname , birthdate , healthcard , tutorId )
        // studentId = result.id
        
        const result = await registerStudent(studentName , studentSurname , birthdate , healthcard , tutorId )
        expect(result).to.exist

        const student = await Student.findOne({ healthcard })
        expect(student.name).to.equal(studentName)
        expect(student.surname).to.equal(studentSurname)
        expect(student.birthdate).to.equal(birthdate)
        expect(student.healthcard).to.equal(healthcard)
        expect(student.tutor.toString()).to.equal(tutorId)
    })

    it("should fail on existing student" , async () => {
        await Student.create({ name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId })
        try{
            await registerStudent(studentName , studentSurname , birthdate , healthcard , tutorId)
        }catch({ message }){
            expect(message).to.equal(`this student already exists`)
        }
    })

    it('should fail on empty name' , () =>
        expect(() => registerStudent("" ,  studentSurname , birthdate , healthcard , tutorId)).to.throw('name is empty or blank')
    )
    
    it('should fail on wrong name type' , () =>
        expect(() => registerStudent(123 ,  studentSurname , birthdate , healthcard , tutorId)).to.throw('name with value 123 is not a string')
    )

    it('should fail on empty surname' , ( )=>
        expect(() => registerStudent(studentName , "" , birthdate , healthcard , tutorId)).to.throw('surname is empty or blank')
    )

    it('should fail on wrong surname type' , () =>
        expect(() => registerStudent(studentName , 123 , birthdate , healthcard , tutorId)).to.throw('surname with value 123 is not a string')
    )
    
    it('should fail on empty birthdate' , ( )=>
        expect(() => registerStudent(studentName , studentSurname , "" , healthcard , tutorId)).to.throw('birth date is empty or blank')
    )

    it('should fail on wrong birthdate type' , () =>
        expect(() => registerStudent(studentName , studentSurname , 123 , healthcard , tutorId)).to.throw('birth date with value 123 is not a string')
    )
    
    it('should fail on empty healthcard' , ( )=>
        expect(() => registerStudent(studentName , studentSurname , birthdate , "" , tutorId)).to.throw('health card is empty or blank')
    )

    it('should fail on wrong healthcard type' , () =>
        expect(() => registerStudent(studentName , studentSurname , birthdate , 123 , tutorId)).to.throw('health card with value 123 is not a string')
    )
    
    it('should fail on empty tutorId' , ( )=>
        expect(() => registerStudent(studentName , studentSurname , birthdate , healthcard , "")).to.throw('tutor id is empty or blank')
    )

    it('should fail on wrong tutorId type' , () =>
        expect(() => registerStudent(studentName , studentSurname , birthdate , healthcard , 123)).to.throw('tutor id with value 123 is not a string')
    )
    
    after(database.disconnect())
})