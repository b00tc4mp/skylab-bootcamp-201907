const { ObjectId } = require('mongodb')

module.exports = {
    retrieveUser(id){
        return this.__users__.findOne({ _id: ObjectId(id) }, {projection: { _id: 0, password:0}})
        .then(user =>{
            user.id = id
            return user
        })
    }
}