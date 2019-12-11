const { validate , formatDate } = require('utils')
const { models : { Student , Tutor }} = require('data')


/**
 * Register an admin
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} birthdate 
 * @param {string} healthcard 
 * @param {Number} tutorId
 * 
 * @returns {Promise}
 */

 module.exports = function(name , surname , birthdate , healthcard , tutorId) {
     validate.string(name , "name")
     validate.string(surname , "surname")
     validate.string(birthdate , "birth date")
     validate.string(healthcard , "health card")
     validate.string(tutorId , "tutor id")

     return(async ()=> {
         const student = await Student.findOne({ healthcard })

         if(student) throw new Error (`this student already exists`)

         const tutor = await Tutor.findOne({ _id : tutorId })
         if (!tutor)  throw new Error (`tutor with id ${tutorId} does not exist`)
         tutorId = tutor.id

         const newStudent = await Student.create({ name , surname , birthdate , healthcard , tutor : tutorId })

         return newStudent.id
     })()
 }