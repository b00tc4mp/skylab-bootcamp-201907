const validate = require('../../utils/validate')
const {User} = require('../../models')

 /**
     * 
     * @param {*} id 
     * @param {*} token 
     * 
     * @returns {Promise}
     */
    module.exports = function(id){
        validate.string(id, 'id')
       
        return User.findOne({ _id: id }, {  _id: 0, password: 0  }).lean()
            .then(user => {
                if(!user) throw new Error(`user with id ${id} not found`)
                user.id = id

                return user
            }) 

    

}