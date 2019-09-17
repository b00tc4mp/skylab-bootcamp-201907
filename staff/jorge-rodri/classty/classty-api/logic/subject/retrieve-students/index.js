const { models: { Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a students that don´t are in subject.
 * 
 * @param {string} id of student
 * 
 * @returns {Promise}
 */
module.exports = function (idSub) {
    debugger
    return (async () => {
        debugger
        const subject = await Subject.findOne({ _id: idSub })
        debugger
        let students = await User.find({ type: 'student' }, { password: 0 }).lean()
debugger
        if (!subject) throw Error(`Not subject definedS`)
        debugger
        return subject.students.map(student => {debugger
            const find = students.find(_student => _student._id.toString() == student.toString())
            debugger
            find.id = find._id.toString()
            const { email, name, surname, id  } = find
            if (find) { return { email, name, surname, id } }
        })
    })()
}