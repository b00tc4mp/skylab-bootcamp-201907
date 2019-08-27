const logic = require('../logic/index')

module.exports = function(req, res){
    const { params: { id }, body } = req
    /* const token = authorization.slice(authorization.indexOf(' ') + 1) */
    //body es name, surname..
    try{
       /*  jwt.verify(token, secret) */

        logic.updateUser(id, body)
        .then(user => res.json({message: 'update user correctly'}))
        .catch(({message})=> res.status(404).json({error: message}))
    }catch({message}){
        res.status().json({error: message})
    }
}