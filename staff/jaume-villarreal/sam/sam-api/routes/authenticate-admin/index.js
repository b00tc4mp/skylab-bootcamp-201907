const logic = require('../../logic')
const jwt = require('jsonwebtoken')
const { env : { JWT_SECRET } } = process

/**
 * Returns tutor id and token.
 * 
 * @param {string} req 
 * @param {string} res 
 * 
 * @returns {Promise}
 */

module.exports = function(req , res){
    const { body : { email , password } } = req

    try{
        logic.authenticateAdmin(email , password)
            .then( adminId => {
                const token = jwt.sign({ sub : adminId } , JWT_SECRET)
                res.status(200).json({ message : "admin correctly authenticated" , adminId , token})
            })
            .catch(({ message }) => res.status(401).json({ error : message}))
    }catch({ message }){
        res.status(401).json({ error : message })
    }
}