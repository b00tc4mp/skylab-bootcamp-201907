const { validate } = require('utils')
const { models : { Enrollment , Course } } = require('data')

module.exports = function(year){
    validate.number(year , 'course')

   return (async ()=>{
        const course = await Course.findOne({ year })

        if(!course) throw new Error (`course ${year} does not exist `)

        const enrollments = await Enrollment.find({ year })

        debugger

        return enrollments
   })()
}
