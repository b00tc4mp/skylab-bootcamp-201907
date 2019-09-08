const { models: {Subject, Post} } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, post) {
    
    validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        
        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`subject with id ${id} not exists.`)

        const student = subject.students.find(student => student.toString() == post.user ) 
        
        if (!student) throw Error(`error to student`)

        let exist = subject.post.find(_post => _post.title == post.title)

        if (exist) throw new Error(`homework with title ${homework.title} exist.`)
        
        const _post = new Post(post)

        subject.post.push(_post)
        
        await subject.save()
        
        return subject
    })()
}