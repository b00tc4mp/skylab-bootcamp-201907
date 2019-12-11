require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Activity , Course , Enrollment , Student , Tutor , Week }} = require('data')
const { random : { value , boolean } , formatDate } = require('utils')

const retrieveEnrollmentsByYear = require('.')

const { env : { DB_URL_TEST } } = process

describe('logic - retrieve enrollments by year', () => {
    before(() => database.connect(DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard
    let tutorName , tutorSurname , dni , phone1 , email, password

    let school , group , shirt , allergy , illness , medication , observations , imageAuth , excursionAuth , activity
    
    let activityId , courseId
    let tutorId1 , tutorId2 , tutorId3 , tutorId4
    let studentId1 , studentId2, studentId3 , studentId4 , studentId5 , studentId6 , studentId7 , studentId8
    let enrollmentId1 , enrollmentId2 , enrollmentId3 , enrollmentId4 , enrollmentId5 , enrollmentId6 , enrollmentId7 , enrollmentId8

    let currentYear
    
    let weekOption1 , morningPerm1 , afternoonPerm1 , lunch1
    let weekOption2 , morningPerm2 , afternoonPerm2 , lunch2
    let weekOption3 , morningPerm3 , afternoonPerm3 , lunch3
    let weekOption4 , morningPerm4 , afternoonPerm4 , lunch4

    let week1 , week2 , week3 , week4

    beforeEach(async () => { 
        let currentDate = new Date()
        currentYear = currentDate.getFullYear()

        // tutor data
        tutorName = `tutor-name-${Math.random()}`
        tutorSurname = `tutor-surname-${Math.random()}`
        dni = `dni-${Math.random()}`
        phone1 = `phone-${Math.random()}`
        email = `email-${Math.random()}@mail.com`
        password = `password-${Math.random()}`
 
        // student data
        studentName = `student-name-${Math.random()}`
        studentSurname = `student-surname-${Math.random()}`
        birthdate = formatDate(new Date())
        healthcard  = `healtcard-${Math.random()}`
 
        // enrollment data
        school = `school-${Math.random()}`
        group = value("P3" , "P4" , "P5", "1EP" , "2EP" , "3EP" , "4EP" , "5EP" , "6EP" , "1ESO" , "2ESO" , "3ESO" , "4ESO")
        shirt = value("4" , "6" , "8", "10" , "12" , "XS" , "S" , "M" , "L" , "XL")
        allergy = `allergy-${Math.random()}`
        illness = `illness-${Math.random()}`
        medication = `medication-${Math.random()}`
        observations = `observations-${Math.random()}`
        imageAuth = boolean()
        excursionAuth = boolean()
        activity = value("Casalet INF" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo")
 
        await Tutor.deleteMany()
        await Student.deleteMany()
        await Enrollment.deleteMany()
        await Course.deleteMany()
        
        const tutor1 = await Tutor.create({ name : tutorName , surname : tutorSurname , dni , phone1 , email , password : await bcrypt.hash(password,10) })
        tutorId1 = tutor1.id
        
        const tutor2 = await Tutor.create({ name : tutorName , surname : tutorSurname , dni , phone1 , email , password : await bcrypt.hash(password,10) })
        tutorId2 = tutor2.id
        
        const tutor3 = await Tutor.create({ name : tutorName , surname : tutorSurname , dni , phone1 , email , password : await bcrypt.hash(password,10) })
        tutorId3 = tutor3.id
        
        const tutor4 = await Tutor.create({ name : tutorName , surname : tutorSurname , dni , phone1 , email , password : await bcrypt.hash(password,10) })
        tutorId4 = tutor4.id
        
        const student1 = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId1})
        studentId1 = student1.id
        
        const student2 = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId1})
        studentId2 = student2.id
        
        const student3 = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId2})
        studentId3 = student3.id
        
        const student4 = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId2})
        studentId4 = student4.id
        
        const student5 = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId3})
        studentId5 = student5.id
        
        const student6 = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId3})
        studentId6 = student6.id
        
        const student7 = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId4})
        studentId7 = student7.id
        
        const student8 = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId4})
        studentId8 = student8.id
        
        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id
        
        weekOption1 = "part"
        morningPerm1 = boolean()
        afternoonPerm1 = boolean()
        lunch1 = boolean()
        
        weekOption2 = "full"
        morningPerm2 = boolean()
        afternoonPerm2 = boolean()
        lunch2 = boolean()
        
        weekOption3 = "part"
        morningPerm3 = boolean()
        afternoonPerm3 = boolean()
        lunch3 = boolean()
        
        weekOption4 = "full"
        morningPerm4 = boolean()
        afternoonPerm4 = boolean()
        lunch4 = boolean()
        
        week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
        week2 = await new Week({number : 2 , category : weekOption2 , morningPermanence : morningPerm2 , afternoonPermanence : afternoonPerm2 , lunch : lunch2 })
        week3 = await new Week({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3, lunch : lunch3})
        week4 = await new Week({number : 4 , category : weekOption4 , morningPermanence : morningPerm4 , afternoonPermanence : afternoonPerm4, lunch : lunch4})
        
        const newEnrollment1 = await new Enrollment({ year : currentYear ,  school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId1 })
        enrollmentId1 = newEnrollment1.id
        newEnrollment1.weeks.push(week1)
        newEnrollment1.weeks.push(week2)
        newEnrollment1.weeks.push(week3)
        newEnrollment1.weeks.push(week4)
        await newEnrollment1.save()
        
        const newEnrollment2 = await new Enrollment({ year : currentYear ,  school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId2 })
        enrollmentId2 = newEnrollment2.id
        newEnrollment2.weeks.push(week1)
        newEnrollment2.weeks.push(week2)
        newEnrollment2.weeks.push(week3)
        newEnrollment2.weeks.push(week4)
        await newEnrollment2.save()
        
        const newEnrollment3 = await new Enrollment({ year : currentYear ,  school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId3 })
        enrollmentId3 = newEnrollment3.id
        newEnrollment3.weeks.push(week1)
        newEnrollment3.weeks.push(week2)
        newEnrollment3.weeks.push(week3)
        newEnrollment3.weeks.push(week4)
        await newEnrollment3.save()
        
        
        const newEnrollment4 = await new Enrollment({ year : currentYear ,  school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId4 })
        enrollmentId4 = newEnrollment4.id
        newEnrollment4.weeks.push(week1)
        newEnrollment4.weeks.push(week2)
        newEnrollment4.weeks.push(week3)
        newEnrollment4.weeks.push(week4)
        await newEnrollment4.save()
        
        
        const newEnrollment5 = await new Enrollment({ year : currentYear ,  school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId5 })
        enrollmentId5 = newEnrollment5.id
        newEnrollment5.weeks.push(week1)
        newEnrollment5.weeks.push(week2)
        newEnrollment5.weeks.push(week3)
        newEnrollment5.weeks.push(week4)
        await newEnrollment5.save()
        
        
        const newEnrollment6 = await new Enrollment({ year : currentYear ,  school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId6 })
        enrollmentId6 = newEnrollment6.id
        newEnrollment6.weeks.push(week1)
        newEnrollment6.weeks.push(week2)
        newEnrollment6.weeks.push(week3)
        newEnrollment6.weeks.push(week4)
        await newEnrollment6.save()
        
        
        const newEnrollment7 = await new Enrollment({ year : currentYear ,  school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId7 })
        enrollmentId7 = newEnrollment7.id
        newEnrollment7.weeks.push(week1)
        newEnrollment7.weeks.push(week2)
        newEnrollment7.weeks.push(week3)
        newEnrollment7.weeks.push(week4)
        await newEnrollment7.save()
        
        
        const newEnrollment8 = await new Enrollment({ year : currentYear ,  school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId8 })
        enrollmentId8 = newEnrollment8.id
        newEnrollment8.weeks.push(week1)
        newEnrollment8.weeks.push(week2)
        newEnrollment8.weeks.push(week3)
        newEnrollment8.weeks.push(week4)
        await newEnrollment8.save()
        
        const course = await new Course ({ year : currentYear, shirt : "new model" , admins : [] , activities : [] , enrollments : [] })
        courseId = course.id
        course.enrollments.push(enrollmentId1)
        course.enrollments.push(enrollmentId2)
        course.enrollments.push(enrollmentId3)
        course.enrollments.push(enrollmentId4)
        course.enrollments.push(enrollmentId5)
        course.enrollments.push(enrollmentId6)
        course.enrollments.push(enrollmentId7)
        course.enrollments.push(enrollmentId8)
        await course.save()
    })

    it('should retrieve enrollments of a given year on correct data ', async () =>{
        const enrollments = await retrieveEnrollmentsByYear(currentYear)
        expect(enrollments).to.have.lengthOf(8)
    })

    it('should fail on a non existing course' , async () =>{
        currentYear = 1900
        try{
            await retrieveEnrollmentsByYear(currentYear)
        } catch({ message }){
            expect(message).to.equal(`course ${currentYear} does not exist `)
        }
    })

    it('should fail on wrong year type', () => 
        expect(() => retrieveEnrollmentsByYear("abc")).to.throw('course with value abc is not a number')
    )

    after(() => database.disconnect())
})