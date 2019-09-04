const { models: { Subject, User } } = require('classty-data')
const { validate } = require('classty-utils')
/**
 * 
 * @param {string} id of subject
 * @param {Array} name is array of ids 
 * @param {Array} surname is array of ids 
 * 
 */
module.exports = (name, surname, id) => {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(id, 'idSubject')
    
    return ( async() => {

        const student = await User.findOne({name, surname})
        
        if(!student) throw Error(`student with name ${name} don´t exists`)

        let subject = await Subject.findById(id)

        if(!subject) throw Error(`subject with id ${id} don´t exits`)

        subject.students.push(student)
        
        await subject.save()
        
        
    })()
    
}