const { models: {User, Subject, Note} } = require('classty-data')

module.exports = function (idSub, idEx, name, surname, valor) {
    
    // validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        
        const subject = await Subject.findById(idSub)

        if (!subject) throw new Error(`subject with id ${id} not exists.`)

        const student = await User.findOne({name, surname})
        
        if(!student) throw Error(`student with name ${name} ${surname} does not exist`)
        if(student.type != 'student') throw Error('user is not student')

        let existStudent = subject.students.find( async student =>student.toString() == student._id.toString())

        if (!existStudent) throw new Error(`student with name ${name} does not exist in subject.`)

        let existExam = subject.exams.find(exam => exam._id.toString() == idEx)
        
        if (!existExam) throw new Error(`exam with id ${idEx} does not exist.`)

        const note = new Note({student: existStudent, note: valor})
        
        existExam.notes.push(note)
        
        
        await subject.save()
        
        return subject.exams

    })()
}