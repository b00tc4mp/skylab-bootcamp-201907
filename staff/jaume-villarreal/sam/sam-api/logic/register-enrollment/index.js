const { validate } = require('utils')
const { models : { Activity , Course , Enrollment , Student , Week } } = require('data')

/**
 * Register a enrollment
 * 
 * @param {String} school 
 * @param {String} group 
 * @param {String} shirt 
 * @param {String} allergy 
 * @param {String} illness 
 * @param {String} medication 
 * @param {String} observations 
 * @param {String} imageAuth 
 * @param {String} excursionAuth 
 * @param {String} activity 
 * @param {String} studentId 
 * @param {String} weekOption1 
 * @param {String} morningPerm1 
 * @param {String} afternoonPerm1 
 * @param {String} lunch1 
 * @param {String} weekOption2 
 * @param {String} morningPerm2 
 * @param {String} afternoonPerm2 
 * @param {String} lunch2 
 * @param {String} weekOption3 
 * @param {String} morningPerm3 
 * @param {String} afternoonPerm3 
 * @param {String} lunch3
 * @param {String} weekOption4 
 * @param {String} morningPerm4 
 * @param {String} afternoonPerm4 
 * @param {String} lunch4 
 * 
 * @returns {Promise} 
 */
module.exports =function( school , group , shirt , allergy , illness , medication ,  observations , imageAuth , excursionAuth , activity , studentId , weekOption1, morningPerm1 , afternoonPerm1 , lunch1 , weekOption2 , morningPerm2 , afternoonPerm2 , lunch2 , weekOption3 , morningPerm3 , afternoonPerm3 , lunch3 , weekOption4 , morningPerm4 , afternoonPerm4 , lunch4){
    debugger
    validate.string(school , "school")
    validate.string(school , "school")
    validate.string(group , "group")
    validate.string(shirt , "shirt")
    validate.alphabetic(allergy , "allergy")
    validate.alphabetic(illness , "illness")
    validate.alphabetic(medication , "medication")
    validate.alphabetic(observations , "observations")
    validate.string(activity , "activity")
    validate.string(imageAuth , "image authorization")
    validate.string(excursionAuth , "excursion authorization")
    validate.string(studentId , "student")
    validate.string(weekOption1 , "week option 1")
    validate.string(morningPerm1 , "morning perm 1")
    validate.string(afternoonPerm1 , "afternoon perm 1")
    validate.string(lunch1 , "lunch 1")
    validate.string(weekOption2 , "week option 2")
    validate.string(morningPerm2 , "morning perm 2")
    validate.string(afternoonPerm2 , "afternoon perm 2")
    validate.string(lunch2 , "lunch 2")
    validate.string(weekOption3 , "week option 3")
    validate.string(morningPerm3 , "morning perm 3")
    validate.string(afternoonPerm3 , "afternoon perm 3")
    validate.string(lunch3 , "lunch 3")
    validate.string(weekOption4 , "week option 4")
    validate.string(morningPerm4 , "morning perm 4")
    validate.string(afternoonPerm4 , "afternoon perm 4")
    validate.string(lunch4 , "lunch 4")

    return( async ()=>{
        const _activity = await Activity.findOne({ name : activity })
        if(!_activity) throw new Error (`activity with value ${activity} does not exist`)
        const activityId = _activity.id

        const student = await Student.findOne({ _id : studentId })
        if(!student) throw new Error (`student with id ${studentId} does not exist`)

        const date = new Date()
        const year = date.getFullYear()

        const checkEnrollemnt = await Enrollment.findOne({ year : year , student : studentId})
        if(checkEnrollemnt) throw new Error(`this student has already registered an enrollemnt for current year`)
        
        const enrollment = await new Enrollment({ year , school , group , shirt , allergy , illness , medication , observations , imageAuth , excursionAuth , activity : activityId , student : studentId })
        
        if(weekOption1 === "empty" && weekOption2 === "empty" && weekOption3 === "empty" && weekOption4 === "empty") throw new Error('no week selected')

        excursionAuth = excursionAuth === "true" ? true : false
        imageAuth = imageAuth === "true" ? true : false

        morningPerm1 = morningPerm1 === "true" ? true : false
        afternoonPerm1 = afternoonPerm1 === "true" ? true : false
        lunch1 = lunch1 === "true" ? true : false

        morningPerm2 = morningPerm2 === "true" ? true : false
        afternoonPerm2 = afternoonPerm2 === "true" ? true : false
        lunch2 = lunch2 === "true" ? true : false

        morningPerm3 = morningPerm3 === "true" ? true : false
        afternoonPerm3 = afternoonPerm3 === "true" ? true : false
        lunch3 = lunch3 === "true" ? true : false

        morningPerm4 = morningPerm4 === "true" ? true : false
        afternoonPerm4 = afternoonPerm4 === "true" ? true : false
        lunch4 = lunch4 === "true" ? true : false

        if(weekOption1 !== "empty") {
            const week = await new Week({number : 1 , category : weekOption1 , morningPermanence : morningPerm1 , afternoonPermanence : afternoonPerm1 , lunch : lunch1 })
            enrollment.weeks.push(week)
        }

        if(weekOption2 !== "empty") {
            const week = await new Week({number : 2 , category : weekOption2 , morningPermanence : morningPerm2 , afternoonPermanence : afternoonPerm2 , lunch : lunch2 })
            enrollment.weeks.push(week)
        }
        
        if(weekOption3 !== "empty") {
            const week = await new Week({number : 3 , category : weekOption3 , morningPermanence : morningPerm3 , afternoonPermanence : afternoonPerm3 , lunch : lunch3 })
            enrollment.weeks.push(week)
        }
        
        if(weekOption4 !== "empty") {
            const week = await new Week({number : 4 , category : weekOption4 , morningPermanence : morningPerm4 , afternoonPermanence : afternoonPerm4 , lunch : lunch4 })
            enrollment.weeks.push(week)
        }

        await enrollment.save()
        
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() 
        const course = await Course.findOne({ year : currentYear})
        
        course.enrollments.push(enrollment.id)
        
        await course.save()

        return enrollment.id
    })()
}