require ('dotenv').config()
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Activity , Course , Enrollment , Student , Tutor , Week }} = require('data')
const { random : { value , boolean } , formatDate } = require('utils')

const retrieveEnrollment = require('.')

const { env : { DB_URL_TEST } } = process

describe('logic - retrieve current enrollment', () => {
    before(() => database.connect(DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard
    let tutorName , tutorSurname , dni , phone1 , email, password , tutorId

    let school , group , shirt , allergy , illness , medication , observations , imageAuth , excursionAuth , activity
    
    let activityId , studentId , enrollmentId

    let currentYear
    
    let weekOption1 , morningPerm1 , afternoonPerm1 , lunch1
    let weekOption2 , morningPerm2 , afternoonPerm2 , lunch2
    let weekOption3 , morningPerm3 , afternoonPerm3 , lunch3
    let weekOption4 , morningPerm4 , afternoonPerm4 , lunch4

    beforeEach(async () => {
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
         
         let currentDate = new Date()
         currentYear = currentDate.getFullYear()
         
         const course = await Course.create({ year : currentYear , shirt : "new model" , admins : [] , activities : [] , enrollments : [] })
         courseId = course.id
         
         const tutor = await Tutor.create({ name : tutorName , surname : tutorSurname , dni , phone1 , email , password : await bcrypt.hash(password,10) })
         tutorId = tutor.id
         
         const student = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId})
         studentId = student.id
         
         const _activity = await Activity.findOne({ name : activity })
         activityId = _activity.id
    })
    
    it('should succeed on correct data for first week enrollment', async () =>{
        weekOption1 = "part"
        morningPerm1 = boolean()
        afternoonPerm1 = boolean()
        lunch1 = boolean()
        
        const newEnrollment = await new Enrollment({ year : currentYear , school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId })
        enrollmentId = newEnrollment.id

        const week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
        newEnrollment.weeks.push(week1)

        await newEnrollment.save()
        
        let currentDate = new Date()
        let year = currentDate.getFullYear()
        
        const currentCourse = await Course.findOne({ year })
        currentCourse.enrollments.push(enrollmentId)
        await currentCourse.save()

        const enrollment = await retrieveEnrollment(studentId)

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activity)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)
    })

    it('should succeed on correct data for first and second week enrollment', async () =>{
        weekOption1 = "part"
        morningPerm1 = boolean()
        afternoonPerm1 = boolean()
        lunch1 = boolean()
        
        weekOption2 = "full"
        morningPerm2 = boolean()
        afternoonPerm2 = boolean()
        lunch2 = boolean()
        
        const newEnrollment = await new Enrollment({ year : currentYear , school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId })
        enrollmentId = newEnrollment.id

        const week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
        newEnrollment.weeks.push(week1)

        const week2 = await new Week({number : 2 , category : weekOption2 , morningPermanence : morningPerm2 , afternoonPermanence : afternoonPerm2 , lunch : lunch2 })
        newEnrollment.weeks.push(week2)

        await newEnrollment.save()
        
        let currentDate = new Date()
        let year = currentDate.getFullYear()
        
        const currentCourse = await Course.findOne({ year })
        currentCourse.enrollments.push(enrollmentId)
        await currentCourse.save()

        const enrollment = await retrieveEnrollment(studentId)

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activity)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)

        expect(enrollment.weeks[1].number).to.equal(2)
        expect(enrollment.weeks[1].category).to.equal(weekOption2)
        expect(enrollment.weeks[1].morningPermanence).to.equal(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence).to.equal(afternoonPerm2)
        expect(enrollment.weeks[1].lunch).to.equal(lunch2)
    })

    it('should succeed on correct data for first, second and third week enrollment', async () =>{
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
        
        // weekOption4 = "empty"
        // morningPerm4 = false
        // afternoonPerm4 = false
        // lunch4 = false
        
        const newEnrollment = await new Enrollment({ year : currentYear , school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId })
        enrollmentId = newEnrollment.id

        const week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
        newEnrollment.weeks.push(week1)

        const week2 = await new Week({number : 2 , category : weekOption2 , morningPermanence : morningPerm2 , afternoonPermanence : afternoonPerm2 , lunch : lunch2 })
        newEnrollment.weeks.push(week2)

        const week3 = await new Week({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3, lunch : lunch3})
        newEnrollment.weeks.push(week3)

        await newEnrollment.save()
        
        let currentDate = new Date()
        let year = currentDate.getFullYear()
        
        const currentCourse = await Course.findOne({ year })
        currentCourse.enrollments.push(enrollmentId)
        await currentCourse.save()

        const enrollment = await retrieveEnrollment(studentId)

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activity)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)
        
        expect(enrollment.weeks[1].number).to.equal(2)
        expect(enrollment.weeks[1].category).to.equal(weekOption2)
        expect(enrollment.weeks[1].morningPermanence).to.equal(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence).to.equal(afternoonPerm2)
        expect(enrollment.weeks[1].lunch).to.equal(lunch2)
        
        expect(enrollment.weeks[2].number).to.equal(3)
        expect(enrollment.weeks[2].category).to.equal(weekOption3)
        expect(enrollment.weeks[2].morningPermanence).to.equal(morningPerm3)
        expect(enrollment.weeks[2].afternoonPermanence).to.equal(afternoonPerm3)
        expect(enrollment.weeks[2].lunch).to.equal(lunch3)
    })

    it('should succeed on correct data for first, second, third and fourth  week enrollment', async () =>{
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
        
        const newEnrollment = await new Enrollment({ year : currentYear , school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId })
        enrollmentId = newEnrollment.id

        const week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
        newEnrollment.weeks.push(week1)

        const week2 = await new Week({number : 2 , category : weekOption2 , morningPermanence : morningPerm2 , afternoonPermanence : afternoonPerm2 , lunch : lunch2 })
        newEnrollment.weeks.push(week2)

        const week3 = await new Week({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3, lunch : lunch3})
        newEnrollment.weeks.push(week3)

        const week4 = await new Week({number : 4 , category : weekOption4 , morningPermanence : morningPerm4 , afternoonPermanence : afternoonPerm4, lunch : lunch4})
        newEnrollment.weeks.push(week4)

        await newEnrollment.save()
        
        let currentDate = new Date()
        let year = currentDate.getFullYear()
        
        const currentCourse = await Course.findOne({ year })
        currentCourse.enrollments.push(enrollmentId)
        await currentCourse.save()

        const enrollment = await retrieveEnrollment(studentId)

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activity)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)
        
        expect(enrollment.weeks[1].number).to.equal(2)
        expect(enrollment.weeks[1].category).to.equal(weekOption2)
        expect(enrollment.weeks[1].morningPermanence).to.equal(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence).to.equal(afternoonPerm2)
        expect(enrollment.weeks[1].lunch).to.equal(lunch2)
        
        expect(enrollment.weeks[2].number).to.equal(3)
        expect(enrollment.weeks[2].category).to.equal(weekOption3)
        expect(enrollment.weeks[2].morningPermanence).to.equal(morningPerm3)
        expect(enrollment.weeks[2].afternoonPermanence).to.equal(afternoonPerm3)
        expect(enrollment.weeks[2].lunch).to.equal(lunch3)
        
        expect(enrollment.weeks[3].number).to.equal(4)
        expect(enrollment.weeks[3].category).to.equal(weekOption4)
        expect(enrollment.weeks[3].morningPermanence).to.equal(morningPerm4)
        expect(enrollment.weeks[3].afternoonPermanence).to.equal(afternoonPerm4)
        expect(enrollment.weeks[3].lunch).to.equal(lunch4)
    })

    it('should succeed on correct data for first and third week', async () =>{
        weekOption1 = "part"
        morningPerm1 = boolean()
        afternoonPerm1 = boolean()
        lunch1 = boolean()
       
        weekOption3 = "part"
        morningPerm3 = boolean()
        afternoonPerm3 = boolean()
        lunch3 = boolean()
        
        const newEnrollment = await new Enrollment({ year : currentYear , school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId })
        enrollmentId = newEnrollment.id

        const week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
        newEnrollment.weeks.push(week1)

        const week3 = await new Week({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3, lunch : lunch3})
        newEnrollment.weeks.push(week3)

        await newEnrollment.save()
        
        let currentDate = new Date()
        let year = currentDate.getFullYear()
        
        const currentCourse = await Course.findOne({ year })
        currentCourse.enrollments.push(enrollmentId)
        await currentCourse.save()

        const enrollment = await retrieveEnrollment(studentId)

        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth).to.equal(imageAuth)
        expect(enrollment.excursionAuth).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activity)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).to.equal(lunch1)
        
        expect(enrollment.weeks[1].number).to.equal(3)
        expect(enrollment.weeks[1].category).to.equal(weekOption3)
        expect(enrollment.weeks[1].morningPermanence).to.equal(morningPerm3)
        expect(enrollment.weeks[1].afternoonPermanence).to.equal(afternoonPerm3)
        expect(enrollment.weeks[1].lunch).to.equal(lunch3)
    })

    it('should fail on a non existing enrollment' , async () =>{
        id = '5d5d5530531d455f75da9fF9'
        try{
            await retrieveEnrollment(id)
        } catch({ message }){
            expect(message).to.equal(`student with id ${id} does not exist`)
        }
    })

    it('should fail on empty enrollment id', () => 
        expect(() => retrieveEnrollment("")).to.throw('student id is empty or blank')
    )
    
    it('should fail on wrong user id type', () => 
        expect(() => retrieveEnrollment(123)).to.throw('student id with value 123 is not a string'))

    after(() => database.disconnect())
})