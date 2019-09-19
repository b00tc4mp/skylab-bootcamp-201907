const logic = require('../../logic')

module.exports = function (req, res){
    const { params : {id} } = req

    try{
        logic.retrieveStudent(id)
            .then( student => res.status(200).json({ message: "student correctly retrieved" , student }))
            .catch(({ message }) => res.status(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}