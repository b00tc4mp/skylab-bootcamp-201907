const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (name) {
    return (async () => {
        
        const subject = await Subject.findOne({ name: name }).lean()

        if (!subject) throw Error(`user with id ${subject.id} not found`)
        debugger
        let getSubject = {
            id:subject._id.toString(),
            name: subject.name,
            students: subject.students,
            teachers: subject.teachers,
            homeworks: subject.homeworks,
            exams: subject.exams,
            posts: subject.post
        }

        return getSubject
    })()
}