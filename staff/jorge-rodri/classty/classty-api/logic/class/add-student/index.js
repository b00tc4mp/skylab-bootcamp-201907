const { models: {  Classroom, User } } = require('classty-data')
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
debugger
        const student = await User.findOne({name, surname})
        debugger
        if(!student) throw Error(`student with name ${name} don´t exists`)
debugger
        const klass = await Classroom.findOne({_id: id})
debugger
        if(!klass) throw Error(`class with id ${id} don´t exits`)
debugger
        klass.students.push(student)
       debugger 
        await klass.save()
        
        
    })()
    
}