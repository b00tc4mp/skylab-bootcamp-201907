const logic = require('../../logic')

/**
 * Returns a tutor.
 * 
 * @param {string} req 
 * @param {string} res 
 * 
 * @returns {Promise}
 */

module.exports = function(req , res){
    const { userId } = req

    try{
        logic.retrieveTutor(userId)
            .then(tutor => res.status(200).json({ message : "tutor retrieved correctly" , tutor}))
            .catch(({ message }) => res.status(404).json({ error : message }))
    }
    catch({ message }){
        res.status(404).json({ error : message})
    }
}