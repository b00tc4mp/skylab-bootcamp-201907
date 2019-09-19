const logic = require('../../logic')

/**
 * Returns message on updated admin.
 * 
 * @param {string} req 
 * @param {string} res 
 * 
 * @returns {Promise}
 */

 module.exports = function(req ,res){
    const { userId , body } = req

    try{
        logic.updateAdmin(userId , body)
            .then(() => res.status(200).json({ message : "admin correctly updated" }))
            .catch(({ message }) => res.status(404).json({ error : message}))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
 }