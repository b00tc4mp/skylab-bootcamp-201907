const { models: { User } } = require('vltra-data')
const { validate} = require('vltra-utils')

/**
 * Updates a user.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    validate.string(id, 'id')
    validate.object(data, 'body')

    // Inadequate solution
    /* return this.__users__.updateOne({ _id: ObjectId(id) }, { $set: data })
        .then(result => {
            if (!result.result.nModified) throw new Error(`user with id ${id} does not exist`)
        }) */
        return(async ()=>{
            const result = await User.findByIdAndUpdate(id, { $set: data })
            if (!result) throw new Error(`user with id ${id} does not exist`)
        })()
}

// Alternative function
/* updateUser(email, name, surname, password) {

    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.string(password, 'password')

    return this.__users__.findOneAndUpdate({ email }, { $set: { name, surname, password } })
      .then((response) =>{
          if(response.value == null) throw new Error (`error`)
          else
          return response
      })
      
  } */