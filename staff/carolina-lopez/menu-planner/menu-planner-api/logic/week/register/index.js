const { models: { Week } } = require('menu-planner-data')
const { validate } = require('menu-planner-utils')

/**
 * 
 * @param {*} monday 
 * @param {*} tuesday
 * @param {*} wednesday
 * @param {*} thursday 
 * @param {*} friday
 * @param {*} saturday
 * @param {*} sunday
 * 
 * @returns {Promise}
 */

module.exports = function(monday, tuesday, wednesday, thursday, friday, saturday, sunday) {

    // validate.objectId(monday, 'monday')
    // validate.objectId(tuesday, 'tuesday')
    // validate.objectId(wednesday, 'wednesday')
    // validate.objectId(thursday, 'thursday')

    return (async () => {
        const response = await Week.find({ monday, tuesday, wednesday, thursday, friday, saturday, sunday })
    
                if (response.length > 0) throw new Error('week already exists.')
                const week = await new Week({ monday, tuesday, wednesday, thursday, friday, saturday, sunday })

                await week.save()
        
            return week._id.toString()
    })()

}    
