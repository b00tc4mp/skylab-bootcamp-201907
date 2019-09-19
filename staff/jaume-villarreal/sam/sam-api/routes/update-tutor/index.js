const logic = require('../../logic')

/**
 * Returns tutor id and token.
 * 
 * @param {string} req 
 * @param {string} res 
 * 
 * @returns {Promise}
 */

module.exports = function(req , res){
    const { userId , body } = req

    try{
        logic.updateTutor(userId , body)
            .then(() => res.status(200).json({ message : "tutor correctly updated"}))
            .catch(({ message }) => res.status(404).json({ error : message}))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}