const { models:{ Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, idH, idS) {
    validate.string(id, 'id')
    validate.string(idH, 'idH')
    validate.string(idS, 'idS')
    let count=0
    return ( async ()=>{

        const subject = await Subject.findById(id)
debugger
        if (!subject) throw new Error(`wrong credentials`)
debugger
        subject.homeworks.forEach(homework => {
            if(homework._id.toString() == idH ){
                homework.delivery.push(idS)
                count ++
            }
        }) 
debugger
        if (count==0 && count > 1) throw Error(`homework with id ${idH} dont exist`)
        debugger
        await subject.save()
debugger
        return subject
    })()
}