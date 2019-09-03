const validate = require('../../../../footcamp-utils/validate')
const { League } = require('../../../../footcamp-data')

 /**
 * 
 * @param {*} id 
 * @param {*} name 
 * @param {*} code 
 * 
 * @returns {Promise}
*/

module.exports = function(id, name, code) {
   
    validate.number(id, 'id')
    validate.name(name, 'name')
    validate.number(code, 'code')    

    return (async () => {
        const league = await League.findOne({ name, code })
        if (!league) throw Error('Wrong credentials.')
        return league
    })()
}
