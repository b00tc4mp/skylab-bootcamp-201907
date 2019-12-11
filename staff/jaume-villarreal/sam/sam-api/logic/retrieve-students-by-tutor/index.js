const { models : { Tutor , Student } } = require('data')
const { validate } = require('utils')

/**
 * Retrieves all students by tutor id.
 * 
 * @param {string} tutorId 
 * 
 * @returns {Promise}
 */

 module.exports = function( tutorId ){
    validate.string(tutorId , "tutor id")

    let _students = []

    return(async () => {
        const tutor = Tutor.findOne({ _id : tutorId })

        if(!tutor) throw new Error (`tutor with id ${tutorId} does not exist`)

        const students = await Student.find({ tutor : tutorId } , { __v : 0 })

        students.forEach(student => {
            student.id = student._id.toString()
            _students.push({"id" : student.id, "name" : student.name, "surname" : student.surname , "birthdate" : student.birthdate, "healthcard" : student.healthcard})
        })

        return _students
    })()
 }

 /*Anna Nolla 11:46 AM

let pet = []
   return (async () => {
       const user = await User.findById(id)
           if (!user) throw Error(This user does not exist.)
           else {
               if (user.pets.length === 0) throw Error(This user does not have pets)
               else {
                   user.pets.forEach((item) => {
                       pet.push({ 'name': item.name, 'age': item.age, 'gender': item.gender, 'size': item.size, 'characteristics': item.characteristics, 'petId': item.id })
                   })
                   return pet
               }
           }
   })()

}*/


