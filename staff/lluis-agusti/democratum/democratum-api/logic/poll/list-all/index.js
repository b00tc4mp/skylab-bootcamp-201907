const validate = require('../../../utils/validate')
const { models } = require('democratum-data')
const { Poll } = models

/**
 * 
 * @param {String} cityId
 *
 * 
 * @returns {Promise}
 */

module.exports = function(cityId, ) {

    validate.string(cityId ,'cityId')

    return (async () => { 

        const polls = await Poll.find({owner :cityId},{ __v: 0 }).lean();
            if (!polls) throw Error(`There are no polls to show`)
            else {
                return polls
            }
    })()
}

/*

 module.exports = function() {
    
    return (async () => {
        const polls = await Poll.find( {},{ __v: 0 }).sort({_id:1}).lean() 
        if (!polls) throw Error(`there are no polls`)   
        
        return polls
    })()

*/