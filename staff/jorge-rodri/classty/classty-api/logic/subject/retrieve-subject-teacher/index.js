const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Retrieves a user by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (userId) {
    return (async () => {
        
        const subjects = await Subject.find({}).lean()
debugger
        if (!subjects) throw Error(`user with id ${subjects.id} not found`)
        
        const result =subjects.map(subject => { debugger
            const sub = subject.teachers.findIndex(teacher => {debugger;return teacher.toString()==userId;debugger})
            debugger
            if(sub>-1) {debugger;return subject}
        });
        debugger
        return result
    })()
}