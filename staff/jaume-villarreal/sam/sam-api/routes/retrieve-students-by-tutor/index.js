const logic = require('../../logic')

module.exports = function(req , res){
    const { userId : tutorId  } = req

    try{
        logic.retrieveStudentsByTutor(tutorId)
            .then(studentsArray => res.status(200).json({ message : "students correctly retreived" , studentsArray }))
            .catch(({ message }) => res.statsus(404).json({ error : message }))
    }catch({ message }){
        res.status(404).json({ error : message })
    }
}