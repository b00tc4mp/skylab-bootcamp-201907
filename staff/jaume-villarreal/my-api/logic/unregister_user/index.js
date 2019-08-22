const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports = function(id , password){
        validate.str(id , 'id')
        validate.str(password , 'password')
        
        return this.__users__.findOne({_id: ObjectId(id) })
            .then( user => {
                if(user.password !== password) throw new Error ('wrong credentials')
                return this.__users__.deleteOne({ _id : user._id })
            })
    }
