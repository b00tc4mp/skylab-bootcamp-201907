const validate = require('../../utils/validate')
const { ObjectId } = require('mongodb')

module.exports = {
    /**
     * Unregisters an existing user account.
     * 
     * @param {*} id
     * 
     * @returns {Promise}
     */ 

    unregisterUser(id) {
      validate.string(id, 'id')

      return this.__users__.findOne({ _id: ObjectId(id) }, { projection: { _id: 0, password: 0 } })
          .then(user => {
              if (!user) throw new Error(`user does not exist`)

              return this.__users__.deleteOne({ _id: ObjectId(id) })
          })
  }
}