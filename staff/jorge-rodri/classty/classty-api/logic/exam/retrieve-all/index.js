const { models:{ Subject } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id) {
    validate.string(id, 'id')

    return ( async ()=>{

        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)

        const exams = subject.exams.map(_exam => {
            let exam ={
                title: _exam.title,
                date: _exam.date,
                presented: _exam.presented,
                note: _exam.note  
            } 
            return exam
        });

        return exams
    })()
}