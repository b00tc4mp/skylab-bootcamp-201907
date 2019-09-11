const validate = require('../../../utils/validate')
const { Instrument } = require('../../../data')
const mongoose = require('mongoose')

/**
 * Retrieves instrument by its id.
 * 
 * @param {string} id 
 * 
 * @returns {Promise}
 */
module.exports = function (id) {
    validate.string(id, 'id')

    return (async () => {
        const instrument = await Instrument.findOne({ _id: id }).lean()
        if (!instrument) throw new Error(`instrument with id ${id} not found`)
        instrument.id = id
        return instrument

    })()
}