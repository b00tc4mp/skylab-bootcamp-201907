const validate = require('../../../utils/validate')
 const { Instrument } = require('../../../data')

/**
 * Updates an instrument.
 * 
 * @param {string} id
 * @param {Object} data
 * 
 * @returns {Promise}
 */
module.exports = function (id, data) {
    validate.string(id, 'id')
    validate.object(data, 'body')

        return Instrument.findByIdAndUpdate(id, { $set: data })
        .then(instrument => {
            if (!instrument) throw new Error(`instrument with id ${id} does not exist`)
        })
}

