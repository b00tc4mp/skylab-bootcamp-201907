const { validate } = require('menu-planner-utils')
const { models } = require('menu-planner-data')
const { User, Week } = models
/**
 * Retrieve a day by ID
 * 
 * @param {string} category 
 * 
 * @returns {Promise}
*/
module.exports = function (userId) { 

    validate.string(userId, 'userId')

    return (async () => { 
        let user = await User.findById(userId)

        // calculate current week monday exact date
        const day = moment().date() - moment().day() + 1,
        month = moment().month(),
        year = moment().year()

        const date = new Date(year, month, day)

        const { weeks } = user

        let week = weeks.find(week => moment(week.date).isSame(date))

        if (week) return sanitizeWeek(week)

        week = new Week({ date })

        user = await User.findById(userId)

        user.weeks.push(week)

        await user.save()

        // const day = days.find(day => {
        //     if(day._id.toString() === id)
        //     return day
        // })
        // if (!day) throw Error(`No days found with id ${id}`)
        // return day
    })()
}