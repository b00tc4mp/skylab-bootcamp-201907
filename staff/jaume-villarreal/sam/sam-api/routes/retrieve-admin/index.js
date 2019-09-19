const logic = require('../../logic')

/**
 * Returns admin.
 * 
 * @param {string} req 
 * @param {string} res 
 * 
 * @returns {Promise}
 */

module.exports = function(req , res){
    const { userId } = req

    try{
        logic.retrieveAdmin( userId )
            .then( user => res.status(200).json({ message : "user correctly retrieved" , user}))
            .catch(({ message }) => res.status(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }

}