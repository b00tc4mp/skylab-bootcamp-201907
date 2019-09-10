const { validate } = require('menu-planner-utils')
const { models } = require('menu-planner-data')
const { Week } = models
/**
 * Searches the DB a week by ID
 * 
 * @param {string} category 
 * 
 * @returns {Promise}
*/
module.exports = function (id) {
    
    validate.string(id, 'id')

    return (async () => {
        const week = await Week.findById({ _id: id} , { __v: 0 }).lean()
        if (!week) throw Error(`No week found with id ${id}`)

        week.id = id
        return week
    })()
}