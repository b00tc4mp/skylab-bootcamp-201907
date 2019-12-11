import logic from '../../logic'
import { formatDate , random } from 'utils'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const { Activity , Course , Enrollment , Student , Tutor , Week } =  models


const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
// const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe("logic - register enrollment" , ()=>{
    
    beforeAll( ()=> database.connect(REACT_APP_DB_URL_TEST))
    
    let studentName , studentSurname , birthdate , healthcard , studentId
    let tutorName , tutorSurname , dni , phone1 , email, password , tutorId

    let school , group , shirt , allergy , illness , medication , observations , imageAuth , excursionAuth , activity , activityId
    
    let weekOption1 , morningPerm1 , afternoonPerm1 , lunch1
    let weekOption2 , morningPerm2 , afternoonPerm2 , lunch2
    let weekOption3 , morningPerm3 , afternoonPerm3 , lunch3
    let weekOption4 , morningPerm4 , afternoonPerm4 , lunch4

    let currentYear

    beforeEach( async () => {
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
        group = random.value("P3" , "P4" , "P5", "1EP" , "2EP" , "3EP" , "4EP" , "5EP" , "6EP" , "1ESO" , "2ESO" , "3ESO" , "4ESO")
        shirt = random.value("4" , "6" , "8", "10" , "12" , "XS" , "S" , "M" , "L" , "XL")
        allergy = `allergy-${Math.random()}`
        illness = `illness-${Math.random()}`
        medication = `medication-${Math.random()}`
        observations = `observations-${Math.random()}`
        imageAuth = random.value("true" , "false")
        excursionAuth = random.value("true" , "false")
        activity = random.value("Casalet INF" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo")

        const _activity = await Activity.findOne({ name : activity })
        activityId = _activity.id
        
        await Tutor.deleteMany()
        await Student.deleteMany()
        await Enrollment.deleteMany()
        await Course.deleteMany()
        
        
        const date = new Date()
        currentYear = date.getFullYear()
        await Course.create({ year : currentYear , shirt : "new model" , admins : [] , activities : [] , enrollments : [] })

        const tutor = await Tutor.create({ name : tutorName , surname : tutorSurname , dni , phone1 , email , password : await bcrypt.hash(password,10) })
        tutorId = tutor.id

        const student = await Student.create({name : studentName , surname : studentSurname , birthdate , healthcard , tutor : tutorId})
        studentId = student.id

    })

    it("should succeed on correct data for first week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = random.value("true" , "false")
        afternoonPerm1 = random.value("true" , "false")
        lunch1 = random.value("true" , "false")
        
        weekOption2 = "empty"
        morningPerm2 = "false"
        afternoonPerm2 = "false"
        lunch2 = "false"
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "empty"
        morningPerm4 = "false"
        afternoonPerm4 = "false"
        lunch4 = "false"
        
        const newEnrollment = await logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).toBeDefined()

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).toBe(currentYear)   
        expect(enrollment.school).toBe(school)
        expect(enrollment.group).toBe(group)
        expect(enrollment.shirt).toBe(shirt)
        expect(enrollment.allergy).toBe(allergy)
        expect(enrollment.illness).toBe(illness)
        expect(enrollment.medication).toBe(medication)
        expect(enrollment.observations).toBe(observations)
        expect(enrollment.imageAuth.toString()).toBe(imageAuth)
        expect(enrollment.excursionAuth.toString()).toBe(excursionAuth)
        expect(enrollment.student.toString()).toBe(studentId)
        expect(enrollment.activity.toString()).toBe(activityId)

        expect(enrollment.weeks[0].number).toBe(1)
        expect(enrollment.weeks[0].category).toBe(weekOption1)
        expect(enrollment.weeks[0].morningPermanence.toString()).toBe(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).toBe(afternoonPerm1)
        expect(enrollment.weeks[0].lunch.toString()).toBe(lunch1)
    })
    
    it("should succeed on correct data for first and second week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = random.value("true" , "false")
        afternoonPerm1 = random.value("true" , "false")
        lunch1 = random.value("true" , "false")
        
        weekOption2 = "full"
        morningPerm2 = random.value("true" , "false")
        afternoonPerm2 = random.value("true" , "false")
        lunch2 = random.value("true" , "false")
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "empty"
        morningPerm4 = "false"
        afternoonPerm4 = "false"
        lunch4 = "false"
        
        const newEnrollment = await logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).toBeDefined()

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).toBe(currentYear)
        expect(enrollment.school).toBe(school)
        expect(enrollment.group).toBe(group)
        expect(enrollment.shirt).toBe(shirt)
        expect(enrollment.allergy).toBe(allergy)
        expect(enrollment.illness).toBe(illness)
        expect(enrollment.medication).toBe(medication)
        expect(enrollment.observations).toBe(observations)
        expect(enrollment.imageAuth.toString()).toBe(imageAuth)
        expect(enrollment.excursionAuth.toString()).toBe(excursionAuth)
        expect(enrollment.student.toString()).toBe(studentId)
        expect(enrollment.activity.toString()).toBe(activityId)

        expect(enrollment.weeks[0].number).toBe(1)
        expect(enrollment.weeks[0].category).toBe(weekOption1)
        expect(enrollment.weeks[0].morningPermanence.toString()).toBe(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).toBe(afternoonPerm1)
        expect(enrollment.weeks[0].lunch.toString()).toBe(lunch1)
        
        expect(enrollment.weeks[1].number).toBe(2)
        expect(enrollment.weeks[1].category).toBe(weekOption2)
        expect(enrollment.weeks[1].morningPermanence.toString()).toBe(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence.toString()).toBe(afternoonPerm2)
        expect(enrollment.weeks[1].lunch.toString()).toBe(lunch2)
    })

    it("should succeed on correct data for first, second and third week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = random.value("true" , "false")
        afternoonPerm1 = random.value("true" , "false")
        lunch1 = random.value("true" , "false")
        
        weekOption2 = "full"
        morningPerm2 = random.value("true" , "false")
        afternoonPerm2 = random.value("true" , "false")
        lunch2 = random.value("true" , "false")
       
        weekOption3 = "full"
        morningPerm3 = random.value("true" , "false")
        afternoonPerm3 = random.value("true" , "false")
        lunch3 = random.value("true" , "false")
        
        weekOption4 = "empty"
        morningPerm4 = "false"
        afternoonPerm4 = "false"
        lunch4 = "false"
        
        const newEnrollment = await logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).toBeDefined()

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).toBe(currentYear)
        expect(enrollment.school).toBe(school)
        expect(enrollment.group).toBe(group)
        expect(enrollment.shirt).toBe(shirt)
        expect(enrollment.allergy).toBe(allergy)
        expect(enrollment.illness).toBe(illness)
        expect(enrollment.medication).toBe(medication)
        expect(enrollment.observations).toBe(observations)
        expect(enrollment.imageAuth.toString()).toBe(imageAuth)
        expect(enrollment.excursionAuth.toString()).toBe(excursionAuth)
        expect(enrollment.student.toString()).toBe(studentId)
        expect(enrollment.activity.toString()).toBe(activityId)

        expect(enrollment.weeks[0].number).toBe(1)
        expect(enrollment.weeks[0].category).toBe(weekOption1)
        expect(enrollment.weeks[0].morningPermanence.toString()).toBe(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).toBe(afternoonPerm1)
        expect(enrollment.weeks[0].lunch.toString()).toBe(lunch1)
        
        expect(enrollment.weeks[1].number).toBe(2)
        expect(enrollment.weeks[1].category).toBe(weekOption2)
        expect(enrollment.weeks[1].morningPermanence.toString()).toBe(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence.toString()).toBe(afternoonPerm2)
        expect(enrollment.weeks[1].lunch.toString()).toBe(lunch2)
        
        expect(enrollment.weeks[2].number).toBe(3)
        expect(enrollment.weeks[2].category).toBe(weekOption3)
        expect(enrollment.weeks[2].morningPermanence.toString()).toBe(morningPerm3)
        expect(enrollment.weeks[2].afternoonPermanence.toString()).toBe(afternoonPerm3)
        expect(enrollment.weeks[2].lunch.toString()).toBe(lunch3)
    })

    it("should succeed on correct data for first, second, third and fourth week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = random.value("true" , "false")
        afternoonPerm1 = random.value("true" , "false")
        lunch1 = random.value("true" , "false")
        
        weekOption2 = "full"
        morningPerm2 = random.value("true" , "false")
        afternoonPerm2 = random.value("true" , "false")
        lunch2 = random.value("true" , "false")
       
        weekOption3 = "full"
        morningPerm3 = random.value("true" , "false")
        afternoonPerm3 = random.value("true" , "false")
        lunch3 = random.value("true" , "false")
        
        weekOption4 = "part"
        morningPerm4 = random.value("true" , "false")
        afternoonPerm4 = random.value("true" , "false")
        lunch4 = random.value("true" , "false")
        
        const newEnrollment = await logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).toBeDefined()

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).toBe(currentYear)
        expect(enrollment.school).toBe(school)
        expect(enrollment.group).toBe(group)
        expect(enrollment.shirt).toBe(shirt)
        expect(enrollment.allergy).toBe(allergy)
        expect(enrollment.illness).toBe(illness)
        expect(enrollment.medication).toBe(medication)
        expect(enrollment.observations).toBe(observations)
        expect(enrollment.imageAuth.toString()).toBe(imageAuth)
        expect(enrollment.excursionAuth.toString()).toBe(excursionAuth)
        expect(enrollment.student.toString()).toBe(studentId)
        expect(enrollment.activity.toString()).toBe(activityId)

        expect(enrollment.weeks[0].number).toBe(1)
        expect(enrollment.weeks[0].category).toBe(weekOption1)
        expect(enrollment.weeks[0].morningPermanence.toString()).toBe(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).toBe(afternoonPerm1)
        expect(enrollment.weeks[0].lunch.toString()).toBe(lunch1)
        
        expect(enrollment.weeks[1].number).toBe(2)
        expect(enrollment.weeks[1].category).toBe(weekOption2)
        expect(enrollment.weeks[1].morningPermanence.toString()).toBe(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence.toString()).toBe(afternoonPerm2)
        expect(enrollment.weeks[1].lunch.toString()).toBe(lunch2)
        
        expect(enrollment.weeks[2].number).toBe(3)
        expect(enrollment.weeks[2].category).toBe(weekOption3)
        expect(enrollment.weeks[2].morningPermanence.toString()).toBe(morningPerm3)
        expect(enrollment.weeks[2].afternoonPermanence.toString()).toBe(afternoonPerm3)
        expect(enrollment.weeks[2].lunch.toString()).toBe(lunch3)
        
        expect(enrollment.weeks[3].number).toBe(4)
        expect(enrollment.weeks[3].category).toBe(weekOption4)
        expect(enrollment.weeks[3].morningPermanence.toString()).toBe(morningPerm4)
        expect(enrollment.weeks[3].afternoonPermanence.toString()).toBe(afternoonPerm4)
        expect(enrollment.weeks[3].lunch.toString()).toBe(lunch4)
    })

    it("should succeed on correct data for only second week enrollment" , async ()=> {
        weekOption1 = "empty"
        morningPerm1 = "false"
        afternoonPerm1 = "false"
        lunch1 = "false"
        
        weekOption2 = "full"
        morningPerm2 = random.value("true" , "false")
        afternoonPerm2 = random.value("true" , "false")
        lunch2 = random.value("true" , "false")
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "empty"
        morningPerm4 = "false"
        afternoonPerm4 = "false"
        lunch4 = "false"
        
        const newEnrollment = await logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).toBeDefined()

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).toBe(currentYear)
        expect(enrollment.school).toBe(school)
        expect(enrollment.group).toBe(group)
        expect(enrollment.shirt).toBe(shirt)
        expect(enrollment.allergy).toBe(allergy)
        expect(enrollment.illness).toBe(illness)
        expect(enrollment.medication).toBe(medication)
        expect(enrollment.observations).toBe(observations)
        expect(enrollment.imageAuth.toString()).toBe(imageAuth)
        expect(enrollment.excursionAuth.toString()).toBe(excursionAuth)
        expect(enrollment.student.toString()).toBe(studentId)
        expect(enrollment.activity.toString()).toBe(activityId)
        
        expect(enrollment.weeks[0].number).toBe(2)
        expect(enrollment.weeks[0].category).toBe(weekOption2)
        expect(enrollment.weeks[0].morningPermanence.toString()).toBe(morningPerm2)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).toBe(afternoonPerm2)
        expect(enrollment.weeks[0].lunch.toString()).toBe(lunch2)
    })

    it("should succeed on correct data for only second and fourth week enrollment" , async ()=> {
        weekOption1 = "empty"
        morningPerm1 = "false"
        afternoonPerm1 = "false"
        lunch1 = "false"
        
        weekOption2 = "full"
        morningPerm2 = random.value("true" , "false")
        afternoonPerm2 = random.value("true" , "false")
        lunch2 = random.value("true" , "false")
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "full"
        morningPerm4 = random.value("true" , "false")
        afternoonPerm4 = random.value("true" , "false")
        lunch4 = random.value("true" , "false")
        
        const newEnrollment = await logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).toBeDefined()

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).toBe(currentYear)
        expect(enrollment.school).toBe(school)
        expect(enrollment.group).toBe(group)
        expect(enrollment.shirt).toBe(shirt)
        expect(enrollment.allergy).toBe(allergy)
        expect(enrollment.illness).toBe(illness)
        expect(enrollment.medication).toBe(medication)
        expect(enrollment.observations).toBe(observations)
        expect(enrollment.imageAuth.toString()).toBe(imageAuth)
        expect(enrollment.excursionAuth.toString()).toBe(excursionAuth)
        expect(enrollment.student.toString()).toBe(studentId)
        expect(enrollment.activity.toString()).toBe(activityId)
        
        expect(enrollment.weeks[0].number).toBe(2)
        expect(enrollment.weeks[0].category).toBe(weekOption2)
        expect(enrollment.weeks[0].morningPermanence.toString()).toBe(morningPerm2)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).toBe(afternoonPerm2)
        expect(enrollment.weeks[0].lunch.toString()).toBe(lunch2)
        
        expect(enrollment.weeks[1].number).toBe(4)
        expect(enrollment.weeks[1].category).toBe(weekOption4)
        expect(enrollment.weeks[1].morningPermanence.toString()).toBe(morningPerm4)
        expect(enrollment.weeks[1].afternoonPermanence.toString()).toBe(afternoonPerm4)
        expect(enrollment.weeks[1].lunch.toString()).toBe(lunch4)
    })

    it("should fail if student is already registered" , async ()=> {
        weekOption1 = "empty"
        morningPerm1 = "false"
        afternoonPerm1 = "false"
        lunch1 = "false"
        
        weekOption2 = "full"
        morningPerm2 = random.value("true" , "false")
        afternoonPerm2 = random.value("true" , "false")
        lunch2 = random.value("true" , "false")
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "full"
        morningPerm4 = random.value("true" , "false")
        afternoonPerm4 = random.value("true" , "false")
        lunch4 = random.value("true" , "false")
        
        const enrollment = await new Enrollment({ year : currentYear , school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity : activityId , student : studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4 })
        
        const week1 = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
        enrollment.weeks.push(week1)
        
        const week2 = await new Week({number : 2 , category : weekOption2 , morningPermanence : morningPerm2 , afternoonPermanence : afternoonPerm2 , lunch : lunch2 })
        enrollment.weeks.push(week2)
        
        const week3 = await new Week({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3 , lunch : lunch3 })
        enrollment.weeks.push(week3)
        
        const week4 = await new Week({number : 4 , category : weekOption4 , morningPermanence : morningPerm4 , afternoonPermanence : afternoonPerm4 , lunch : lunch4 })
        enrollment.weeks.push(week4)

        await enrollment.save()
        try{
            await logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)
        }catch({ message }){
            expect(message).toBe(`this student has already registered an enrollemnt for current year`)
        }
    })

    it("should fail if no week is selected" , async ()=> {
        weekOption1 = "empty"
        morningPerm1 = "false"
        afternoonPerm1 = "false"
        lunch1 = "false"
        
        weekOption2 = "empty"
        morningPerm2 = "false"
        afternoonPerm2 = "false"
        lunch2 = "false"
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "empty"
        morningPerm4 = "false"
        afternoonPerm4 = "false"
        lunch4 = "false"
        try{
            await logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)
        }catch({ message }){
            expect(message).toBe(`no week selected`)
        }
    })

    it('should fail on empty school' , () =>
        expect(() => logic.registerEnrollment("" , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('school is empty or blank')
    )
    
    it('should fail on wrong school type' , () =>
        expect(() => logic.registerEnrollment(123 , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('school with value 123 is not a string')
    )
    
    it('should fail on empty group' , () =>
        expect(() => logic.registerEnrollment(school , "" , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('group is empty or blank')
    )
    
    it('should fail on wrong group type' , () =>
        expect(() => logic.registerEnrollment(school , 123 , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('group with value 123 is not a string')
    )

    it('should fail on empty shirt' , () =>
        expect(() => logic.registerEnrollment(school , group , "" , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('shirt is empty or blank')
    )

    it('should fail on wrong shirt data type' , () =>
        expect(() => logic.registerEnrollment(school , group , 123 , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('shirt with value 123 is not a string')
    )

    it('should fail on wrong allergy data type' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , 123 , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('allergy with value 123 is not a string')
    )

    it('should fail on wrong illness data type' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , 123 , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('illness with value 123 is not a string')
    )

    it('should fail on wrong medication data type' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , 123 ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('medication with value 123 is not a string')
    )

    it('should fail on wrong observations data type' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  123 , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('observations with value 123 is not a string')
    )

    it('should fail on wrong imageAuth type' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , 123 , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('image authorization with value 123 is not a string')
    )
    
    it('should fail on wrong excursionAuth type' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , 123 , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('excursion authorization with value 123 is not a string')
    )

    it('should fail on empty activity' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , "" , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('activity is empty or blank')
    )

    it('should fail on empty activity' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , 123 , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('activity with value 123 is not a string')
    )

    it('should fail on empty studentId' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , "" , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('student id is empty or blank')
    )

    it('should fail on empty studentId' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , 123 , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('student id with value 123 is not a string')
    )

    it('should fail on empty weekOption1' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , "", morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('week option 1 is empty or blank')
    )

    it('should fail on empty weekOption1' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , 123, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('week option 1 with value 123 is not a string')
    )

    it('should fail on wrong morningPerm1 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, 123 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('morning permanence 1 with value 123 is not a string')
    )

    it('should fail on wrong afternoonPerm1 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , 123 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('afternoon permanence 1 with value 123 is not a string')
    )

    it('should fail on wrong lunch1 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , 123 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('lunch 1 with value 123 is not a string')
    )

    it('should fail on empty weekOption2' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , "" , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('week option 2 is empty or blank')
    )

    it('should fail on empty weekOption2' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , 123 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('week option 2 with value 123 is not a string')
    )

    it('should fail on wrong morningPerm2 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , 123 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('morning permanence 2 with value 123 is not a string')
    )

    it('should fail on wrong afternoonPerm2 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , 123 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('afternoon permanence 2 with value 123 is not a string')
    )

    it('should fail on wrong lunch2 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , 123 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('lunch 2 with value 123 is not a string')
    )

    it('should fail on empty weekOption3' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , "" , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('week option 3 is empty or blank')
    )

    it('should fail on empty weekOption3' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , 123 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('week option 3 with value 123 is not a string')
    )

    it('should fail on wrong morningPerm3 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , 123 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('morning permanence 3 with value 123 is not a string')
    )

    it('should fail on wrong afternoonPerm3 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , 123 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('afternoon permanence 3 with value 123 is not a string')
    )

    it('should fail on wrong lunch3 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , 123 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('lunch 3 with value 123 is not a string')
    )

    it('should fail on empty weekOption4' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , "" , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('week option 4 is empty or blank')
    )

    it('should fail on empty weekOption4' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , 123 , morningPerm4 , afternoonPerm4 , lunch4) ).toThrow('week option 4 with value 123 is not a string')
    )

    it('should fail on wrong morningPerm4 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , 123 , afternoonPerm4 , lunch4) ).toThrow('morning permanence 4 with value 123 is not a string')
    )

    it('should fail on wrong afternoonPerm4 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , 123 , lunch4) ).toThrow('afternoon permanence 4 with value 123 is not a string')
    )

    it('should fail on wrong lunch4 data' , () =>
        expect(() => logic.registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , 123) ).toThrow('lunch 4 with value 123 is not a string')
    )

    afterAll(database.disconnect())
})