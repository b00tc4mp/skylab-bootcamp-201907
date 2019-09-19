const {validate} = require('utils')
const { models : { Admin } } = require('data')

/**
 * Retrieves an admin by its id.
 * 
 * @param {string} adminId 
 * 
 * @returns {Promise}
 */
module.exports = function (adminId) {

    validate.string(adminId , 'admin id')

    return(async ()=>{
        const admin = await Admin.findOne({ _id : adminId }, { _id: 0, __v:0, password: 0 }).lean()
        
        if (!admin) throw new Error(`admin with id ${adminId} not found`)

        admin.id = adminId

        return admin
    })() 
}