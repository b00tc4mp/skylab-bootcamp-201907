import logic from '../../logic'
import { formatDate } from 'utils'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { Student , Tutor } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET = process.env.REACT_APP_JWT_SECRET

const { random } = Math

describe("logic - register student" , ()=>{
    
    beforeAll( ()=> database.connect(REACT_APP_DB_URL_TEST))

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

        const token = jwt.sign( {sub:tutorId} , REACT_APP_JWT_SECRET )

        logic.__token__ = token
    })
    
    it("should succeed on correct data" , async ()=> {    
        const result = await logic.registerStudent(studentName , studentSurname , birthdate , healthcard)
        expect(result).toBeDefined()

        const student = await Student.findOne({ healthcard })
        expect(student.name).toBe(studentName)
        expect(student.surname).toBe(studentSurname)
        expect(student.birthdate).toBe(birthdate)
        expect(student.healthcard).toBe(healthcard)
        expect(student.tutor.toString()).toBe(tutorId)
    })

    // it("should fail on existing student" , async () => {
    //     await Student.create({ name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId })
    //     try{
    //         await logic.registerStudent(studentName , studentSurname , birthdate , healthcard , tutorId)
    //     }catch({ message }){
    //         expect(message).toBe(`student with healthcard ${healthcard} already exists`)
    //     }
    // })

    // it('should fail on empty name' , () =>
    //     expect(() => logic.registerStudent("" ,  studentSurname , birthdate , healthcard , tutorId)).toThrow('name is empty or blank')
    // )
    
    // it('should fail on wrong name type' , () =>
    //     expect(() => logic.registerStudent(123 ,  studentSurname , birthdate , healthcard , tutorId)).toThrow('name with value 123 is not a string')
    // )

    // it('should fail on empty surname' , ( )=>
    //     expect(() => logic.registerStudent(studentName , "" , birthdate , healthcard , tutorId)).toThrow('surname is empty or blank')
    // )

    // it('should fail on wrong surname type' , () =>
    //     expect(() => logic.registerStudent(studentName , 123 , birthdate , healthcard , tutorId)).toThrow('surname with value 123 is not a string')
    // )
    
    // it('should fail on empty birthdate' , ( )=>
    //     expect(() => logic.registerStudent(studentName , studentSurname , "" , healthcard , tutorId)).toThrow('birth date is empty or blank')
    // )

    // it('should fail on wrong birthdate type' , () =>
    //     expect(() => logic.registerStudent(studentName , studentSurname , 123 , healthcard , tutorId)).toThrow('birth date with value 123 is not a string')
    // )
    
    // it('should fail on empty healthcard' , ( )=>
    //     expect(() => logic.registerStudent(studentName , studentSurname , birthdate , "" , tutorId)).toThrow('health card is empty or blank')
    // )

    // it('should fail on wrong healthcard type' , () =>
    //     expect(() => logic.registerStudent(studentName , studentSurname , birthdate , 123 , tutorId)).toThrow('health card with value 123 is not a string')
    // )
    
    // it('should fail on empty tutorId' , ( )=>
    //     expect(() => logic.registerStudent(studentName , studentSurname , birthdate , healthcard , "")).toThrow('tutor id is empty or blank')
    // )

    // it('should fail on wrong tutorId type' , () =>
    //     expect(() => logic.registerStudent(studentName , studentSurname , birthdate , healthcard , 123)).toThrow('tutor id with value 123 is not a string')
    // )
  



    afterAll(database.disconnect())
})