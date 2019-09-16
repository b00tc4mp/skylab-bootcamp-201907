const { models: { Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')
const retrieveT = require('../retrieve-subject-user')

/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    return (async () => {
        const subjects = await retrieveT(id)
        const users = await User.find({ type: 'teacher' })
        return subjects.map(subject => {
            const teachers = subject.teachers.map( teacher => {
                let _users = users.find(user => user.id == teacher.toString())
                return { name: _users.name, surname: _users.surname }
            })
            return { title:subject.title, teachers }
        })
}) ()
}