const logic = require('../../logic')

module.exports = function(req , res){
    const { params : { id }} = req

    try{
        logic.retrieveCurrentEnrollment(id)
            .then(enrollment => res.status(200).json({ message : "enrollment retrieved correctly" , enrollment}))
            .catch(({ message }) => res.status(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}