const logic = require('../../logic')
const jwt = require('jsonwebtoken')
const { env : {JWT_SECRET} } = process

/**
 * Returns tutor id and token.
 * 
 * @param {string} req 
 * @param {string} res 
 * 
 * @returns {Promise}
 */

module.exports = function(req , res){
    const  {body : { email , password} } = req

    try{
        logic.authenticateTutor(email , password)
            .then(id =>{
                const token = jwt.sign({sub:id} , JWT_SECRET)
                res.status(200).json({ message : "user correctly authenticated" , id , token })
            })
            .catch(({ message }) => res.status(401).json({ error : message }))
    }catch({ message }){
        res.status(401).json({ error : message })
    }
}