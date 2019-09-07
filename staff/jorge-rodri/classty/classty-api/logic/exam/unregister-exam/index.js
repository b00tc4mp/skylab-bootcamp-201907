const { models:{ Subject } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, idEx) {
    validate.string(id, 'id')
    validate.string(idEx, 'idH')

    return ( async ()=>{

        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)

        const exam = subject.exams.find(exam => exam._id.toString()==idEx) 
        
        return exam
    })()
}