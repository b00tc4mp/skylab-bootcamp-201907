const { models:{ Subject } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, idh) {
    validate.string(id, 'ids')
    validate.string(idh, 'idh')
    return ( async ()=>{
debugger
        const subject = await Subject.findById(id)
        debugger
        if (!subject) throw new Error(`wrong credentials`)
    debugger
        const i = subject.homeworks.findIndex(homework => homework._id.toString()==idh) 
        debugger
        if(i==-1) throw new Error(`wrong id of card`)
        
        subject.homeworks.splice(i,1)
        
        await subject.save()

        return subject
    })()
}