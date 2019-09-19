const logic = require('../../logic')

module.exports = function(req , res){
    const { params : { id } , body } = req

    try{
        logic.updateStudent(id , body)
            .then(() => res.status(200).json({ message : "student updated correctly" }))
            .catch(({ message }) => res.statsu(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}