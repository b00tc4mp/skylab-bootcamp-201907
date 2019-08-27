const logic = require('../../logic')

module.exports = function(req, res){
    const {body: { email, password}} = req

    try {
        logic.authenticateUser(email, password)
        .then(id => {
            res.status(201).json({message:'User authenticated correctly'})
        })
        .catch(({message})=> res.status(400).json({error: message}))
    }catch({message}){
        res.status(400).json({error: message})
    }

}