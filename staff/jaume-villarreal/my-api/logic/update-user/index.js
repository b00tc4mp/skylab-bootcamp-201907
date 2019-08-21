const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports = {
    updateUser( id , newName , newSurname , newEmail , newPassword){
        validate.str(newName , 'name')
        validate.str(newSurname , 'surname')
        validate.str(newEmail , 'email')
        validate.email(newEmail , 'email')
        validate.str(newPassword , 'password')

        const query = { _id : ObjectId(id) }
        const newValues = { $set : {name: newName , surname: newSurname , email: newEmail , password: newPassword } }

        return this.__users__.updateOne( query , newValues)
    }
}