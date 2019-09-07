const { models:{ Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')

module.exports = function (id) {
    validate.string(id, 'id')

    return ( async ()=>{

        const subject = await Subject.findById(id)

        if (!subject) throw new Error(`wrong credentials`)

        const homeworks = subject.homeworks.map(_homework => {
            let homework ={
                title: _homework.title,
                comment: _homework.comment,
                expiry: _homework.expiry,
                delivery: _homework.delivery  
            } 
            return homework
        });

        return homeworks
    })()
}