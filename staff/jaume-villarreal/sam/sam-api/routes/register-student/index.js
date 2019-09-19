const logic = require('../../logic')

module.exports = function(req , res){
    const { userId , body : { name , surname , birthdate , healthcard } } = req

    try{
        logic.registerStudent(name , surname , birthdate , healthcard , userId)
            .then( id => res.status(200).json({ message : "student correctly registered" , id}))
            .catch(({ message }) => res.status(401).json({ error : message }))
    }catch({ message }){
        res.status(401).json({ error : message })
    }
}