const { validate } = require('menu-planner-utils')
const { models } = require('menu-planner-data')
const { Week } = models
/**
 * Searches the DB a day by ID
 * 
 * @param {string} category 
 * 
 * @returns {Promise}
*/
module.exports = function (id, userId) { // userId
    
    validate.string(id, 'id')
    validate.string(userId, 'userId')

    return (async () => {
        const user = await User.findOne({_id: userId}, {_id: 0, _v: 0 }).lean()
        const { weeks } = user
        const week = weeks.find(week => {
            if(week._id.toString() === id)
            return week })
        if (!week) throw new Error(`no week found with id ${id}`)

        return week
    })()
}

// falta mirar que sea current week...