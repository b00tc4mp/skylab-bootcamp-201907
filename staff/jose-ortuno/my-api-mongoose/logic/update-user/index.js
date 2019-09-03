const validate = require('../../utils/validate')
const { User } = require('../../data')

module.exports =
    /**
     * Update user
     * Uopdate a user through the ID
     * 
     * @param {string} id: User id
     * @param {object} update: update data user
     * @return {promise}
     * @return {string} Error message: in case that user not exist os is not find
     * @return {number} updateCount: should correct succes in case that user not exist os is not find (range max 1)
     * 
     */
    function (id, update) {
        validate.string(id, 'id')
        if (!(update instanceof Object) || update === undefined) throw Error('second param is empty or is not object')
        if (Object.keys(update).length === 0) throw Error('update object is empty')

        return User.updateOne({ _id: id }, { $set: update })
            .then(({ nModified, ok }) => {
                if (!nModified && !ok) throw Error('user data has already been modified')

            }).then(() => { })
    }