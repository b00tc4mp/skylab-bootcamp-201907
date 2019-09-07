const { models: {User, Subject, Exam, Note} } = require('classty-data')
const { validate, convertDate } = require('classty-utils')

module.exports = function (idSub, idEx, name, surname, valor) {
    
    // validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        debugger
        const subject = await Subject.findById(idSub)

        if (!subject) throw new Error(`subject with id ${id} not exists.`)
debugger
        const student = await User.findOne({name, surname})
        debugger
        if(!student) throw Error(`student with name ${name} ${surname} does not exist`)
        if(student.type != 'student') throw Error('user is not student')

        let existStudent = subject.students.find( async student =>student.toString() == student._id.toString())

        if (!existStudent) throw new Error(`student with name ${name} does not exist in subject.`)

        let existExam = subject.exams.find(exam => exam._id.toString() == idEx)
        
        if (!existExam) throw new Error(`exam with id ${idEx} does not exist.`)

        const note = new Note({student: existStudent, note: valor})
        debugger
        existExam.notes.push(note)
        
        debugger
        await subject.save()
        debugger
        return subject.exams
    })()
}