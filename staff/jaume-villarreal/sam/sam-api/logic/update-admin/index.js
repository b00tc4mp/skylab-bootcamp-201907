const { models : { Admin , Activity } } = require('data')
const bcrypt = require('bcryptjs')
const { validate } = require('utils')

/**
 * Updates an admin.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, body) {
    validate.string(id , 'id')

    return(async ()=>{
        const { name : _name , surname : _surname , dni : _dni , accreditation : _accreditation , age : _age , role : _role , activity :_activity  , email  , password } = body
        let activityId , hash
debugger
        const admin = await Admin.findById(id)
    
        if (!admin) throw new Error(`admin with id ${id} does not exist`)

        if(_activity) {
            const act = await Activity.findOne({ name : _activity})
            activityId = act.id
        }

        if(password) hash = await bcrypt.hash(password,10)
    
        return await Admin.updateOne({ _id : id } , { $set:  {name : _name , surname : _surname , dni : _dni , accreditation : _accreditation, age : _age , role : _role , activity : activityId , email , password : hash} })
    })()
}