const {validate} = require('utils')
const { models : { Enrollment , Student } } = require('data')

/**
 * Retrieves an enrollment by its id.
 * 
 * @param {string} studentId 
 * 
 * @returns {Promise}
 */
module.exports = function (studentId) {

    validate.string(studentId , 'student id')

    const date = new Date()
    const year = date.getFullYear()

    return(async ()=>{
        const student = await Student.findById(studentId)

        if(!student) throw new Error (`student with id ${studentId} does not exist`)

        const enrollment = await Enrollment.findOne({ student : studentId , year : year }, { __v:0 }).populate('activity').lean()

        if (!enrollment) throw new Error(`this enrollment does not exist`)

        const _enrollment = {
            "id": enrollment._id.toString(),
            "year": year,
            "school": enrollment.school,
            "group": enrollment.group,
            "shirt": enrollment.shirt,
            "allergy": enrollment.allergy,
            "illness": enrollment.illness,
            "medication": enrollment.medication,
            "observations": enrollment.observations,
            "imageAuth": enrollment.imageAuth,
            "excursionAuth": enrollment.excursionAuth,
            "activity": enrollment.activity.name,
            "student": enrollment.student,
            "weeks": enrollment.weeks
        }

        return _enrollment
    })() 
}