const logic = require('../logic')

  module.exports = function(req, res) {

            const {params:{id}, body:{email, password}} = req
    
            // const token = authorization.slice(authorization.indexOf(' ') +1)
    
            try{
                // jwt.verify(token, secret)
                logic.unregisterUser(id, email, password)
                 .then(() => res.json({message: 'user uregistered correctly'}))
                 .catch(({message})=> res.status(404).json({error:message}))
    
            }catch({message}){
                res.status(404).json({error:message})
    
            }
    
        }