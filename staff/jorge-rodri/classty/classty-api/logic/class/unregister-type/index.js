const { models: { Classroom, User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * Unregisters a user.
 * 
 * @param {string} id
 * @param {string} password
 * 
 * @returns {Promise}
 */
module.exports = function (id, nameClass) {
    validate.string(id, 'id')
    validate.string(nameClass, 'nameClass')
    
        return (async () => {
        
        const _class = await Classroom.findOne({name: nameClass})
        debugger
        const i = _class.students.findIndex(student => student._id==id)
        debugger
        if(i == -1) throw Error(`student with id: ${id} not found.`)
        debugger
        _class.students.splice(i, 1)
        debugger
        await _class.save()

    })()
}