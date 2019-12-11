const {validate} = require('utils')
const { models : { Tutor } } = require('data')

/**
 * Retrieves a tutor by its id.
 * 
 * @param {string} tutorId 
 * 
 * @returns {Promise}
 */
module.exports = function (tutorId) {

    validate.string(tutorId , 'tutor id')

    return(async ()=>{
        const tutor = await Tutor.findOne({ _id : tutorId }, { _id: 0, __v:0, password: 0 }).lean()
        
        if (!tutor) throw new Error(`tutor with id ${tutorId} not found`)

        tutor.id = tutorId

        return tutor
    })() 
}