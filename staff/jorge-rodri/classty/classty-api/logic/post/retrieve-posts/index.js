const { models: { Subject } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id) {
    
    validate.string(id, 'id')
    // validate.object(body, 'body')
    return (async () => {
        
        const subject = await Subject.findById(id)
debugger
        if (!subject) throw new Error(`subject with id ${id} not exists.`)
debugger
        return subject.post
    })()
}