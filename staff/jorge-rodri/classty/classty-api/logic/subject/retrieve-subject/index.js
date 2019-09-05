const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    validate.string(id, 'id')
    return (async () => {
        
        const subject = await Subject.findOne({ _id: id }).lean()

        if (!subject) throw Error(`user with id ${id} not found`)
    
        let getSubject = {
            id:subject.id,
            name: subject.name,
            students: subject.students,
            teachers: subject.teachers,
            homeworks: subject.homeworks,
            exams: subject.exams,
            posts: subject.posts
        }

        return getSubject
    })()
}