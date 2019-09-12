const validate = require('../../../utils/validate')
const { Instrument } = require('../../../data')

/**
 * Registers an instrument.
 * 
 * @param {string} name 
 * @param {string} style
 * @param {string} audio 
 * 
 * @returns {Promise}
 */


module.exports = function (name, style, audio) {

    console.log("ffff " + name);

    validate.string(name, 'name')
    validate.string(style, 'style')
    validate.string(audio, 'audio')

    
    return Instrument.findOne({ name })
        .then(instrument => {
            if (instrument) throw new Error(`instrument with name ${name} already exists`)

          

            return Instrument.create({ name, style, audio })
        })
        .then(() => { })
}