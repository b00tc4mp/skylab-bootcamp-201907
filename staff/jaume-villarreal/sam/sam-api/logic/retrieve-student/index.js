const {validate} = require('utils')
const { models : { Student } } = require('data')

/**
 * Retrieves a student by its id.
 * 
 * @param {string} tutorId 
 * 
 * @returns {Promise}
 */
module.exports = function (studentId) {

    validate.string(studentId , 'student id')

    return(async ()=>{
        const student = await Student.findOne({ _id : studentId }, { _id: 0, __v:0 }).lean()
        
        if (!student) throw new Error(`student with id ${studentId} not found`)

        student.id = studentId

        return student
    })() 
}