const { models:{ Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id, idH, idS) {
    validate.string(id, 'id')
    validate.string(idH, 'idH')
    validate.string(idS, 'idS')
    let count=0
    return ( async ()=>{

        const student = await User.findOne({ _id: idS })
        if(!student) throw Error(`student with id ${idS} does not exist`)
        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)


        subject.homeworks.forEach(homework => {
            if(homework._id.toString() == idH ){
                homework.delivery.push(idS)
                count ++
            }
        }) 

        if (count==0 && count > 1) throw Error(`homework with id ${idH} dont exist`)
        
        await subject.save()


        return subject
    })()
}