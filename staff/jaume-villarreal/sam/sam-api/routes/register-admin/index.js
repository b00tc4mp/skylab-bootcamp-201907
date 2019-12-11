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
    const { body : { name , surname , dni , accreditation , age , role , activity , email , password } } = req

    try{
        logic.registerAdmin(name , surname , dni , accreditation , age , role , activity , email , password)
            .then(() => res.status(201).json({ message : "admin correctly registered" } ) )
            .catch(({ message }) => res.status(401).json({ error : message }))
    }catch({ message }){
        res.status(400).json({ error : message })
    }
}
