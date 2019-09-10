const { models:{ Subject } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id) {
    validate.string(id, 'id')

    return ( async ()=>{

        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)

        const exams = subject.exams.map(_exam => {
            debugger
            let exam ={
                id: _exam._id.toString(),
                title: _exam.title,
                date: _exam.date,
                presented: _exam.presented,
                note: _exam.notes  
            } 
            return exam
        });

        return exams
    })()
}