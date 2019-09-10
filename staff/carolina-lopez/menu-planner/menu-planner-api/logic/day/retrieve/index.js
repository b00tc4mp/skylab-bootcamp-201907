const { validate } = require('menu-planner-utils')
const { models } = require('menu-planner-data')
const { Day } = models
/**
 * Retrieve a day by ID
 * 
 * @param {string} category 
 * 
 * @returns {Promise}
*/
module.exports = function (id) {
    
    //validate.string(id, 'id')

    return (async () => {
        const day = await Day.findById({ _id: id.id} , { __v: 0 }).lean()
        if (!day) throw Error(`No days found with id ${id}`)

        day.id = id
        return day
    })()
}