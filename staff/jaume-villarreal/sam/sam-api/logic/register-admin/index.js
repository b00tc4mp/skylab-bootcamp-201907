const { validate } = require('utils')
const { models : { Admin , Activity }} = require('data')
const bcrypt = require('bcryptjs')

/**
 * Register an admin
 * 
 * @param {string} name 
 * @param {string} surname 
 * @param {string} dni 
 * @param {string} accreditation 
 * @param {Number} age 
 * @param {Number} role 
 * @param {string} activity
 * @param {string} email 
 * @param {string} password
 * 
 * @returns {Promise}
 */

 module.exports = function(name , surname , dni , accreditation , age , role , activity , email , password) {
     validate.string(name , "name")
     validate.string(surname , "surname")
     validate.string(dni , "dni")
     validate.string(accreditation , "accreditation")
     validate.number(age , "age")
     validate.number(role , "role")
     validate.string(activity , "activity")
     validate.string(email , "email")
     validate.email(email , "email")
     validate.string(password , "password")

     return(async ()=> {
         const user = await Admin.findOne({ email })

         if(user) throw new Error (`admin with email ${email} already exists`)

         const _activity = await Activity.findOne({ name : activity })

         if (!_activity) throw new Error (`activity ${activity} does not exist`)

         const activityId = _activity.id

         const hash = await bcrypt.hash(password ,10)

         await Admin.create({ name , surname , dni , accreditation , age , role , activity : activityId , email , password : hash })

         return { } 
     })()
 }