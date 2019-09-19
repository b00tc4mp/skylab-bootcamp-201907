require('dotenv').config()
const { env : { DB_URL_TEST } } = process
const bcrypt = require('bcryptjs')
const { expect } = require('chai')

const { database , models : { Course , Enrollment , Student , Tutor , Activity , Week} } = require('data')
const { random : { value } , formatDate} = require('utils')
const registerEnrollment = require('.')


describe('logic - register enrollment' , ()=>{
    before( () => database.connect(DB_URL_TEST))

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
        group = value("P3" , "P4" , "P5", "1EP" , "2EP" , "3EP" , "4EP" , "5EP" , "6EP" , "1ESO" , "2ESO" , "3ESO" , "4ESO")
        shirt = value("4" , "6" , "8", "10" , "12" , "XS" , "S" , "M" , "L" , "XL")
        allergy = `allergy-${Math.random()}`
        illness = `illness-${Math.random()}`
        medication = `medication-${Math.random()}`
        observations = `observations-${Math.random()}`
        imageAuth = value("true" , "false")
        excursionAuth = value("true" , "false")
        activity = value("Casalet INF" , "Casalet EP" , "Casal EP" , "Casal ESO" , "Campus Futbol" , "Campus Bàsquet" , "Campus Judo")

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
        morningPerm1 = value("true" , "false")
        afternoonPerm1 = value("true" , "false")
        lunch1 = value("true" , "false")
        
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
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).to.equal(currentYear)
        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth.toString()).to.equal(imageAuth)
        expect(enrollment.excursionAuth.toString()).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence.toString()).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch.toString()).to.equal(lunch1)
    })
    
    it("should succeed on correct data for first and second week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = value("true" , "false")
        afternoonPerm1 = value("true" , "false")
        lunch1 = value("true" , "false")
        
        weekOption2 = "full"
        morningPerm2 = value("true" , "false")
        afternoonPerm2 = value("true" , "false")
        lunch2 = value("true" , "false")
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "empty"
        morningPerm4 = "false"
        afternoonPerm4 = "false"
        lunch4 = "false"
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).to.equal(currentYear)
        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth.toString()).to.equal(imageAuth)
        expect(enrollment.excursionAuth.toString()).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence.toString()).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch.toString()).to.equal(lunch1)
        
        expect(enrollment.weeks[1].number).to.equal(2)
        expect(enrollment.weeks[1].category).to.equal(weekOption2)
        expect(enrollment.weeks[1].morningPermanence.toString()).to.equal(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence.toString()).to.equal(afternoonPerm2)
        expect(enrollment.weeks[1].lunch.toString()).to.equal(lunch2)
    })

    it("should succeed on correct data for first, second and third week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = value("true" , "false")
        afternoonPerm1 = value("true" , "false")
        lunch1 = value("true" , "false")
        
        weekOption2 = "full"
        morningPerm2 = value("true" , "false")
        afternoonPerm2 = value("true" , "false")
        lunch2 = value("true" , "false")
       
        weekOption3 = "full"
        morningPerm3 = value("true" , "false")
        afternoonPerm3 = value("true" , "false")
        lunch3 = value("true" , "false")
        
        weekOption4 = "empty"
        morningPerm4 = "false"
        afternoonPerm4 = "false"
        lunch4 = "false"
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).to.equal(currentYear)
        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth.toString()).to.equal(imageAuth)
        expect(enrollment.excursionAuth.toString()).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence.toString()).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch.toString()).to.equal(lunch1)
        
        expect(enrollment.weeks[1].number).to.equal(2)
        expect(enrollment.weeks[1].category).to.equal(weekOption2)
        expect(enrollment.weeks[1].morningPermanence.toString()).to.equal(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence.toString()).to.equal(afternoonPerm2)
        expect(enrollment.weeks[1].lunch.toString()).to.equal(lunch2)
        
        expect(enrollment.weeks[2].number).to.equal(3)
        expect(enrollment.weeks[2].category).to.equal(weekOption3)
        expect(enrollment.weeks[2].morningPermanence.toString()).to.equal(morningPerm3)
        expect(enrollment.weeks[2].afternoonPermanence.toString()).to.equal(afternoonPerm3)
        expect(enrollment.weeks[2].lunch.toString()).to.equal(lunch3)
    })

    it("should succeed on correct data for first, second, third and fourth week enrollment" , async ()=> {
        weekOption1 = "part"
        morningPerm1 = value("true" , "false")
        afternoonPerm1 = value("true" , "false")
        lunch1 = value("true" , "false")
        
        weekOption2 = "full"
        morningPerm2 = value("true" , "false")
        afternoonPerm2 = value("true" , "false")
        lunch2 = value("true" , "false")
       
        weekOption3 = "full"
        morningPerm3 = value("true" , "false")
        afternoonPerm3 = value("true" , "false")
        lunch3 = value("true" , "false")
        
        weekOption4 = "part"
        morningPerm4 = value("true" , "false")
        afternoonPerm4 = value("true" , "false")
        lunch4 = value("true" , "false")
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).to.equal(currentYear)
        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth.toString()).to.equal(imageAuth)
        expect(enrollment.excursionAuth.toString()).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)

        expect(enrollment.weeks[0].number).to.equal(1)
        expect(enrollment.weeks[0].category).to.equal(weekOption1)
        expect(enrollment.weeks[0].morningPermanence.toString()).to.equal(morningPerm1)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).to.equal(afternoonPerm1)
        expect(enrollment.weeks[0].lunch.toString()).to.equal(lunch1)
        
        expect(enrollment.weeks[1].number).to.equal(2)
        expect(enrollment.weeks[1].category).to.equal(weekOption2)
        expect(enrollment.weeks[1].morningPermanence.toString()).to.equal(morningPerm2)
        expect(enrollment.weeks[1].afternoonPermanence.toString()).to.equal(afternoonPerm2)
        expect(enrollment.weeks[1].lunch.toString()).to.equal(lunch2)
        
        expect(enrollment.weeks[2].number).to.equal(3)
        expect(enrollment.weeks[2].category).to.equal(weekOption3)
        expect(enrollment.weeks[2].morningPermanence.toString()).to.equal(morningPerm3)
        expect(enrollment.weeks[2].afternoonPermanence.toString()).to.equal(afternoonPerm3)
        expect(enrollment.weeks[2].lunch.toString()).to.equal(lunch3)
        
        expect(enrollment.weeks[3].number).to.equal(4)
        expect(enrollment.weeks[3].category).to.equal(weekOption4)
        expect(enrollment.weeks[3].morningPermanence.toString()).to.equal(morningPerm4)
        expect(enrollment.weeks[3].afternoonPermanence.toString()).to.equal(afternoonPerm4)
        expect(enrollment.weeks[3].lunch.toString()).to.equal(lunch4)
    })

    it("should succeed on correct data for only second week enrollment" , async ()=> {
        weekOption1 = "empty"
        morningPerm1 = "false"
        afternoonPerm1 = "false"
        lunch1 = "false"
        
        weekOption2 = "full"
        morningPerm2 = value("true" , "false")
        afternoonPerm2 = value("true" , "false")
        lunch2 = value("true" , "false")
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "empty"
        morningPerm4 = "false"
        afternoonPerm4 = "false"
        lunch4 = "false"
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).to.equal(currentYear)
        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth.toString()).to.equal(imageAuth)
        expect(enrollment.excursionAuth.toString()).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)
        
        expect(enrollment.weeks[0].number).to.equal(2)
        expect(enrollment.weeks[0].category).to.equal(weekOption2)
        expect(enrollment.weeks[0].morningPermanence.toString()).to.equal(morningPerm2)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).to.equal(afternoonPerm2)
        expect(enrollment.weeks[0].lunch.toString()).to.equal(lunch2)
    })

    it("should succeed on correct data for only second and fourth week enrollment" , async ()=> {
        weekOption1 = "empty"
        morningPerm1 = "false"
        afternoonPerm1 = "false"
        lunch1 = "false"
        
        weekOption2 = "full"
        morningPerm2 = value("true" , "false")
        afternoonPerm2 = value("true" , "false")
        lunch2 = value("true" , "false")
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "full"
        morningPerm4 = value("true" , "false")
        afternoonPerm4 = value("true" , "false")
        lunch4 = value("true" , "false")
        
        const newEnrollment = await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)

        expect(newEnrollment).to.exist

        const enrollment = await Enrollment.findOne({ student : studentId })

        expect(enrollment.year).to.equal(currentYear)
        expect(enrollment.school).to.equal(school)
        expect(enrollment.group).to.equal(group)
        expect(enrollment.shirt).to.equal(shirt)
        expect(enrollment.allergy).to.equal(allergy)
        expect(enrollment.illness).to.equal(illness)
        expect(enrollment.medication).to.equal(medication)
        expect(enrollment.observations).to.equal(observations)
        expect(enrollment.imageAuth.toString()).to.equal(imageAuth)
        expect(enrollment.excursionAuth.toString()).to.equal(excursionAuth)
        expect(enrollment.student.toString()).to.equal(studentId)
        expect(enrollment.activity.toString()).to.equal(activityId)
        
        expect(enrollment.weeks[0].number).to.equal(2)
        expect(enrollment.weeks[0].category).to.equal(weekOption2)
        expect(enrollment.weeks[0].morningPermanence.toString()).to.equal(morningPerm2)
        expect(enrollment.weeks[0].afternoonPermanence.toString()).to.equal(afternoonPerm2)
        expect(enrollment.weeks[0].lunch.toString()).to.equal(lunch2)
        
        expect(enrollment.weeks[1].number).to.equal(4)
        expect(enrollment.weeks[1].category).to.equal(weekOption4)
        expect(enrollment.weeks[1].morningPermanence.toString()).to.equal(morningPerm4)
        expect(enrollment.weeks[1].afternoonPermanence.toString()).to.equal(afternoonPerm4)
        expect(enrollment.weeks[1].lunch.toString()).to.equal(lunch4)
    })

    it("should fail if student is already registered" , async ()=> {
        weekOption1 = "empty"
        morningPerm1 = "false"
        afternoonPerm1 = "false"
        lunch1 = "false"
        
        weekOption2 = "full"
        morningPerm2 = value("true" , "false")
        afternoonPerm2 = value("true" , "false")
        lunch2 = value("true" , "false")
       
        weekOption3 = "empty"
        morningPerm3 = "false"
        afternoonPerm3 = "false"
        lunch3 = "false"
        
        weekOption4 = "full"
        morningPerm4 = value("true" , "false")
        afternoonPerm4 = value("true" , "false")
        lunch4 = value("true" , "false")
        
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
            await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)
        }catch({ message }){
            expect(message).to.be.equal(`this student has already registered an enrollemnt for current year`)
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
            await registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4)
        }catch({ message }){
            expect(message).to.be.equal(`no week selected`)
        }
    })

    it('should fail on empty school' , () =>
        expect(() => registerEnrollment("" , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('school is empty or blank')
    )
    
    it('should fail on wrong school type' , () =>
        expect(() => registerEnrollment(123 , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('school with value 123 is not a string')
    )
    
    it('should fail on empty group' , () =>
        expect(() => registerEnrollment(school , "" , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('group is empty or blank')
    )
    
    it('should fail on wrong group type' , () =>
        expect(() => registerEnrollment(school , 123 , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('group with value 123 is not a string')
    )

    it('should fail on empty shirt' , () =>
        expect(() => registerEnrollment(school , group , "" , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('shirt is empty or blank')
    )

    it('should fail on wrong shirt data type' , () =>
        expect(() => registerEnrollment(school , group , 123 , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('shirt with value 123 is not a string')
    )

    it('should fail on wrong allergy data type' , () =>
        expect(() => registerEnrollment(school , group , shirt , 123 , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('allergy is not a valid string')
    )

    it('should fail on wrong illness data type' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , 123 , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('illness is not a valid string')
    )

    it('should fail on wrong medication data type' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , 123 ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('medication is not a valid string')
    )

    it('should fail on wrong observations data type' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  123 , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('observations is not a valid string')
    )

    it('should fail on wrong imageAuth type' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , 123 , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('image authorization with value 123 is not a string')
    )
    
    it('should fail on wrong excursionAuth type' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , 123 , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('excursion authorization with value 123 is not a string')
    )

    it('should fail on empty activity' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , "" , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('activity is empty or blank')
    )

    it('should fail on empty activity' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , 123 , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('activity with value 123 is not a string')
    )

    it('should fail on empty studentId' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , "" , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('student is empty or blank')
    )

    it('should fail on empty studentId' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , 123 , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('student with value 123 is not a string')
    )

    it('should fail on empty weekOption1' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , "", morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 1 is empty or blank')
    )

    it('should fail on empty weekOption1' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , 123, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 1 with value 123 is not a string')
    )

    it('should fail on wrong morningPerm1 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, 123 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('morning perm 1 with value 123 is not a string')
    )

    it('should fail on wrong afternoonPerm1 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , 123 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('afternoon perm 1 with value 123 is not a string')
    )

    it('should fail on wrong lunch1 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , 123 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('lunch 1 with value 123 is not a string')
    )

    it('should fail on empty weekOption2' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , "" , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 2 is empty or blank')
    )

    it('should fail on empty weekOption2' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , 123 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 2 with value 123 is not a string')
    )

    it('should fail on wrong morningPerm2 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , 123 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('morning perm 2 with value 123 is not a string')
    )

    it('should fail on wrong afternoonPerm2 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , 123 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('afternoon perm 2 with value 123 is not a string')
    )

    it('should fail on wrong lunch2 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , 123 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('lunch 2 with value 123 is not a string')
    )

    it('should fail on empty weekOption3' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , "" , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 3 is empty or blank')
    )

    it('should fail on empty weekOption3' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , 123 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 3 with value 123 is not a string')
    )

    it('should fail on wrong morningPerm3 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , 123 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('morning perm 3 with value 123 is not a string')
    )

    it('should fail on wrong afternoonPerm3 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , 123 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('afternoon perm 3 with value 123 is not a string')
    )

    it('should fail on wrong lunch3 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , 123 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('lunch 3 with value 123 is not a string')
    )

    it('should fail on empty weekOption4' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , "" , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 4 is empty or blank')
    )

    it('should fail on empty weekOption4' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , 123 , morningPerm4 , afternoonPerm4 , lunch4) ).to.throw('week option 4 with value 123 is not a string')
    )

    it('should fail on wrong morningPerm4 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , 123 , afternoonPerm4 , lunch4) ).to.throw('morning perm 4 with value 123 is not a string')
    )

    it('should fail on wrong afternoonPerm4 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , 123 , lunch4) ).to.throw('afternoon perm 4 with value 123 is not a string')
    )

    it('should fail on wrong lunch4 data' , () =>
        expect(() => registerEnrollment(school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , 123) ).to.throw('lunch 4 with value 123 is not a string')
    )

    after(database.disconnect())
})