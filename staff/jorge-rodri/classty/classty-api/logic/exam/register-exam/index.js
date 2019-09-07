const { models: {Subject, Exam} } = require('classty-data')
const { validate, convertDate } = require('classty-utils')

module.exports = function (id, body) {
    
    validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        
        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`subject with id ${id} not exists.`)

        let exist = subject.exams.find(exam => exam.title == body.title)

        if (exist) throw new Error(`homework with title ${homework.title} exist.`)

        const date = convertDate(body.date)
        body.date = date
        
        const exam = new Exam(body)

        subject.exams.push(exam)
        
        await subject.save()
        
        return subject
    })()
}