import logic from '../../logic'
import { database, models } from 'data'
import { formatDate , random } from 'utils'
import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const {  Activity , Course , Enrollment , Student , Tutor , Week  } = models
const {  value , boolean  } = random

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
// const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe("logic - retrieve current enrollment" , ()=>{
    
    beforeAll( ()=> database.connect(REACT_APP_DB_URL_TEST))

    let studentName , studentSurname , birthdate , healthcard
    let tutorName , tutorSurname , dni , phone1 , email, password , tutorId

    let school , group , shirt , allergy , illness , medication , observations , imageAuth , excursionAuth , activity
    
    let activityId , studentId , enrollmentId , courseId

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

        const {enrollment} = await logic.retrieveCurrentEnrollment(studentId)
        expect(enrollment.school).toBe(school)
        expect(enrollment.group).toBe(group)
        expect(enrollment.shirt).toBe(shirt)
        expect(enrollment.allergy).toBe(allergy)
        expect(enrollment.illness).toBe(illness)
        expect(enrollment.medication).toBe(medication)
        expect(enrollment.observations).toBe(observations)
        expect(enrollment.imageAuth).toBe(imageAuth)
        expect(enrollment.excursionAuth).toBe(excursionAuth)
        expect(enrollment.student.toString()).toBe(studentId)
        expect(enrollment.activity.toString()).toBe(activity)

        expect(enrollment.weeks[0].number).toBe(1)
        expect(enrollment.weeks[0].category).toBe(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).toBe(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).toBe(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).toBe(lunch1)
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

        const enrollment = await logic.retrieveCurrentEnrollment(studentId)

        expect(enrollment.group).toBe(group)
        expect(enrollment.school).toBe(school)
        expect(enrollment.shirt).toBe(shirt)
        expect(enrollment.allergy).toBe(allergy)
        expect(enrollment.illness).toBe(illness)
        expect(enrollment.medication).toBe(medication)
        expect(enrollment.observations).toBe(observations)
        expect(enrollment.imageAuth).toBe(imageAuth)
        expect(enrollment.excursionAuth).toBe(excursionAuth)
        expect(enrollment.student.toString()).toBe(studentId)
        expect(enrollment.activity.toString()).toBe(activity)

        expect(enrollment.weeks[0].number).toBe(1)
        expect(enrollment.weeks[0].category).toBe(weekOption1)
        expect(enrollment.weeks[0].morningPermanence).toBe(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence).toBe(afternoonPerm1)
        expect(enrollment.weeks[0].lunch).toBe(lunch1)

        expect(enrollment.weeks[1].number).toBe(2)
        expect(enrollment.weeks[1].category).toBe(weekOption2)
        expect(enrollment.weeks[1].morningPermanence).toBe(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence).toBe(afternoonPerm2)
        expect(enrollment.weeks[1].lunch).toBe(lunch2)
    })

    // it('should succeed on correct data for first, second and third week enrollment', async () =>{
    //     weekOption1 = "part"
    //     morningPerm1 = boolean()
    //     afternoonPerm1 = boolean()
    //     lunch1 = boolean()
        
    //     weekOption2 = "full"
    //     morningPerm2 = boolean()
    //     afternoonPerm2 = boolean()
    //     lunch2 = boolean()
       
    //     weekOption3 = "part"
    //     morningPerm3 = boolean()
    //     afternoonPerm3 = boolean()
    //     lunch3 = boolean()
        
    //     // weekOption4 = "empty"
    //     // morningPerm4 = false
    //     // afternoonPerm4 = false
    //     // lunch4 = false
        
    //     const newEnrollment = await new Enrollment({ year : currentYear , school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId })
    //     enrollmentId = newEnrollment.id

    //     const week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
    //     newEnrollment.weeks.push(week1)

    //     const week2 = await new Week({number : 2 , category : weekOption2 , morningPermanence : morningPerm2 , afternoonPermanence : afternoonPerm2 , lunch : lunch2 })
    //     newEnrollment.weeks.push(week2)

    //     const week3 = await new Week({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3, lunch : lunch3})
    //     newEnrollment.weeks.push(week3)

    //     await newEnrollment.save()
        
    //     let currentDate = new Date()
    //     let year = currentDate.getFullYear()
        
    //     const currentCourse = await Course.findOne({ year })
    //     currentCourse.enrollments.push(enrollmentId)
    //     await currentCourse.save()

    //     const enrollment = await logic.retrieveCurrentEnrollment(studentId)

    //     expect(enrollment.school).toBe(school)
    //     expect(enrollment.group).toBe(group)
    //     expect(enrollment.shirt).toBe(shirt)
    //     expect(enrollment.allergy).toBe(allergy)
    //     expect(enrollment.illness).toBe(illness)
    //     expect(enrollment.medication).toBe(medication)
    //     expect(enrollment.observations).toBe(observations)
    //     expect(enrollment.imageAuth).toBe(imageAuth)
    //     expect(enrollment.excursionAuth).toBe(excursionAuth)
    //     expect(enrollment.student.toString()).toBe(studentId)
    //     expect(enrollment.activity.toString()).toBe(activity)

    //     expect(enrollment.weeks[0].number).toBe(1)
    //     expect(enrollment.weeks[0].category).toBe(weekOption1)
    //     expect(enrollment.weeks[0].morningPermanence).toBe(morningPerm1)
    //     expect(enrollment.weeks[0].afternoonPermanence).toBe(afternoonPerm1)
    //     expect(enrollment.weeks[0].lunch).toBe(lunch1)
        
    //     expect(enrollment.weeks[1].number).toBe(2)
    //     expect(enrollment.weeks[1].category).toBe(weekOption2)
    //     expect(enrollment.weeks[1].morningPermanence).toBe(morningPerm2)
    //     expect(enrollment.weeks[1].afternoonPermanence).toBe(afternoonPerm2)
    //     expect(enrollment.weeks[1].lunch).toBe(lunch2)
        
    //     expect(enrollment.weeks[2].number).toBe(3)
    //     expect(enrollment.weeks[2].category).toBe(weekOption3)
    //     expect(enrollment.weeks[2].morningPermanence).toBe(morningPerm3)
    //     expect(enrollment.weeks[2].afternoonPermanence).toBe(afternoonPerm3)
    //     expect(enrollment.weeks[2].lunch).toBe(lunch3)
    // })

    // it('should succeed on correct data for first, second, third and fourth  week enrollment', async () =>{
    //     weekOption1 = "part"
    //     morningPerm1 = boolean()
    //     afternoonPerm1 = boolean()
    //     lunch1 = boolean()
        
    //     weekOption2 = "full"
    //     morningPerm2 = boolean()
    //     afternoonPerm2 = boolean()
    //     lunch2 = boolean()
       
    //     weekOption3 = "part"
    //     morningPerm3 = boolean()
    //     afternoonPerm3 = boolean()
    //     lunch3 = boolean()
        
    //     weekOption4 = "full"
    //     morningPerm4 = boolean()
    //     afternoonPerm4 = boolean()
    //     lunch4 = boolean()
        
    //     const newEnrollment = await new Enrollment({ year : currentYear , school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId })
    //     enrollmentId = newEnrollment.id

    //     const week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
    //     newEnrollment.weeks.push(week1)

    //     const week2 = await new Week({number : 2 , category : weekOption2 , morningPermanence : morningPerm2 , afternoonPermanence : afternoonPerm2 , lunch : lunch2 })
    //     newEnrollment.weeks.push(week2)

    //     const week3 = await new Week({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3, lunch : lunch3})
    //     newEnrollment.weeks.push(week3)

    //     const week4 = await new Week({number : 4 , category : weekOption4 , morningPermanence : morningPerm4 , afternoonPermanence : afternoonPerm4, lunch : lunch4})
    //     newEnrollment.weeks.push(week4)

    //     await newEnrollment.save()
        
    //     let currentDate = new Date()
    //     let year = currentDate.getFullYear()
        
    //     const currentCourse = await Course.findOne({ year })
    //     currentCourse.enrollments.push(enrollmentId)
    //     await currentCourse.save()

    //     const enrollment = await logic.retrieveCurrentEnrollment(studentId)

    //     expect(enrollment.school).toBe(school)
    //     expect(enrollment.group).toBe(group)
    //     expect(enrollment.shirt).toBe(shirt)
    //     expect(enrollment.allergy).toBe(allergy)
    //     expect(enrollment.illness).toBe(illness)
    //     expect(enrollment.medication).toBe(medication)
    //     expect(enrollment.observations).toBe(observations)
    //     expect(enrollment.imageAuth).toBe(imageAuth)
    //     expect(enrollment.excursionAuth).toBe(excursionAuth)
    //     expect(enrollment.student.toString()).toBe(studentId)
    //     expect(enrollment.activity.toString()).toBe(activity)

    //     expect(enrollment.weeks[0].number).toBe(1)
    //     expect(enrollment.weeks[0].category).toBe(weekOption1)
    //     expect(enrollment.weeks[0].morningPermanence).toBe(morningPerm1)
    //     expect(enrollment.weeks[0].afternoonPermanence).toBe(afternoonPerm1)
    //     expect(enrollment.weeks[0].lunch).toBe(lunch1)
        
    //     expect(enrollment.weeks[1].number).toBe(2)
    //     expect(enrollment.weeks[1].category).toBe(weekOption2)
    //     expect(enrollment.weeks[1].morningPermanence).toBe(morningPerm2)
    //     expect(enrollment.weeks[1].afternoonPermanence).toBe(afternoonPerm2)
    //     expect(enrollment.weeks[1].lunch).toBe(lunch2)
        
    //     expect(enrollment.weeks[2].number).toBe(3)
    //     expect(enrollment.weeks[2].category).toBe(weekOption3)
    //     expect(enrollment.weeks[2].morningPermanence).toBe(morningPerm3)
    //     expect(enrollment.weeks[2].afternoonPermanence).toBe(afternoonPerm3)
    //     expect(enrollment.weeks[2].lunch).toBe(lunch3)
        
    //     expect(enrollment.weeks[3].number).toBe(4)
    //     expect(enrollment.weeks[3].category).toBe(weekOption4)
    //     expect(enrollment.weeks[3].morningPermanence).toBe(morningPerm4)
    //     expect(enrollment.weeks[3].afternoonPermanence).toBe(afternoonPerm4)
    //     expect(enrollment.weeks[3].lunch).toBe(lunch4)
    // })

    // it('should succeed on correct data for first and third week', async () =>{
    //     weekOption1 = "part"
    //     morningPerm1 = boolean()
    //     afternoonPerm1 = boolean()
    //     lunch1 = boolean()
       
    //     weekOption3 = "part"
    //     morningPerm3 = boolean()
    //     afternoonPerm3 = boolean()
    //     lunch3 = boolean()
        
    //     const newEnrollment = await new Enrollment({ year : currentYear , school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId })
    //     enrollmentId = newEnrollment.id

    //     const week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
    //     newEnrollment.weeks.push(week1)

    //     const week3 = await new Week({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3, lunch : lunch3})
    //     newEnrollment.weeks.push(week3)

    //     await newEnrollment.save()
        
    //     let currentDate = new Date()
    //     let year = currentDate.getFullYear()
        
    //     const currentCourse = await Course.findOne({ year })
    //     currentCourse.enrollments.push(enrollmentId)
    //     await currentCourse.save()

    //     const enrollment = await logic.retrieveCurrentEnrollment(studentId)

    //     expect(enrollment.school).toBe(school)
    //     expect(enrollment.group).toBe(group)
    //     expect(enrollment.shirt).toBe(shirt)
    //     expect(enrollment.allergy).toBe(allergy)
    //     expect(enrollment.illness).toBe(illness)
    //     expect(enrollment.medication).toBe(medication)
    //     expect(enrollment.observations).toBe(observations)
    //     expect(enrollment.imageAuth).toBe(imageAuth)
    //     expect(enrollment.excursionAuth).toBe(excursionAuth)
    //     expect(enrollment.student.toString()).toBe(studentId)
    //     expect(enrollment.activity.toString()).toBe(activity)

    //     expect(enrollment.weeks[0].number).toBe(1)
    //     expect(enrollment.weeks[0].category).toBe(weekOption1)
    //     expect(enrollment.weeks[0].morningPermanence).toBe(morningPerm1)
    //     expect(enrollment.weeks[0].afternoonPermanence).toBe(afternoonPerm1)
    //     expect(enrollment.weeks[0].lunch).toBe(lunch1)
        
    //     expect(enrollment.weeks[1].number).toBe(3)
    //     expect(enrollment.weeks[1].category).toBe(weekOption3)
    //     expect(enrollment.weeks[1].morningPermanence).toBe(morningPerm3)
    //     expect(enrollment.weeks[1].afternoonPermanence).toBe(afternoonPerm3)
    //     expect(enrollment.weeks[1].lunch).toBe(lunch3)
    // })

    // it('should fail on a non existing enrollment' , async () =>{
    //     id = '5d5d5530531d455f75da9fF9'
    //     try{
    //         await logic.retrieveCurrentEnrollment(id)
    //     } catch({ message }){
    //         expect(message).toBe(`student with id ${id} does not exist`)
    //     }
    // })

    // it('should fail on empty enrollment id', () => 
    //     expect(() => logic.retrieveCurrentEnrollment("")).to.throw('student id is empty or blank')
    // )
    
    // it('should fail on wrong user id type', () => 
    //     expect(() => logic.retrieveCurrentEnrollment(123)).to.throw('student id with value 123 is not a string'))




    afterAll(database.disconnect())
})