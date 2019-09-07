const { models: {User, Subject, Exam, Note} } = require('classty-data')
const { validate, convertDate } = require('classty-utils')

module.exports = function (idSub, idEx, name, surname, valor) {
    
    validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        
        const subject = await Subject.findById(idSub)

        if (!subject) throw new Error(`subject with id ${id} not exists.`)

        let existStudent = subject.students.find(student => (student.name == name) && (student.surname == surname))

        if (existStudent) throw new Error(`student with name ${name} does not exist.`)

        let existExam = subject.exams.find(exam => exam._id.toString() == idEx)
        
        if (existExam) throw new Error(`exam with id ${idEx} does not exist.`)

        const note = new Note(existStudent, valor)
        existExam.push(note)
        subject.exams.push(existExam)
        
        await subject.save()
        
        return subject
    })()
}