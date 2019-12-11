const { models : { Student } } = require('data')
const { validate } = require('utils')

/**
 * Updates a student.
 * 
 * @param {string} studentId
 * @param {Object} body
 * 
 * @returns {Promise}
 */
module.exports = function (studentId , body) {
    validate.string(studentId , 'student id')

    return(async ()=>{
        const student = await Student.findById(studentId)

        if (!student) throw new Error(`student with id ${studentId} does not exist`)
 
        return await Student.updateOne({ _id : studentId } , { $set: body })
    })()
}