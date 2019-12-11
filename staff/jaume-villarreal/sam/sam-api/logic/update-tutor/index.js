const { models : { Tutor } } = require('data')
const bcrypt = require('bcryptjs')
const { validate } = require('utils')

/**
 * Updates a tutor.
 * 
 * @param {string} id
 * @param {Object} body
 * 
 * @returns {Promise}
 */
module.exports = function (id, body) {
    validate.string(id , 'id')

    return(async ()=>{
        const { name : _name , surname : _surname , dni : _dni , phone1 : _phone1 , email : _email , password } = body
        let hash
        
        const tutor = await Tutor.findById(id)

        if (!tutor) throw new Error(`tutor with id ${id} does not exist`)
 
        if(password) hash = await bcrypt.hash(password,10)
        
        return await Tutor.updateOne({ _id : id } , { $set:  {name : _name , surname : _surname , dni : _dni , phone1 : _phone1 , email : _email , password : hash} })
    })()
}