const logic = require('../../logic')

module.exports = function(req , res){
    const {body : { year } } = req

    try{
        logic.retrieveEnrollmentsByYear(year)
            .then(enrollmentsArray => res.status(200).json({ message : "enrollments correctly retrieved" , enrollmentsArray}))
            .catch(({ message }) => res.status(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}