const { models:{ Subject } } = require('classty-data')

const { validate } = require('classty-utils')

module.exports = function (id, idH) {
    validate.string(id, 'id')
    validate.string(idH, 'idH')

    return ( async ()=>{

        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)

        const homework = subject.homeworks.find(homework => homework._id.toString()==idH) 

        return homework
    })()
}