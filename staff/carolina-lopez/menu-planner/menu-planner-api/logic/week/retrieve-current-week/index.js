const { validate } = require('menu-planner-utils')
const { models } = require('menu-planner-data')
const { User, Week } = models
const moment = require('moment')

/**
 * Retrieves the current week for a given user id
 * 
 * @param {string} userId
 * 
 * @returns {Promise}
*/
module.exports = function (userId) {
    validate.string(userId, 'userId')

    return (async () => {
        const user = await User.findById(userId)

        // calculate current week monday exact date
        const day = moment().date() - moment().day() + 1,
            month = moment().month(),
            year = moment().year()

        const date = new Date(year, month, day)

        const { weeks } = user

        let week = weeks.find(week => moment(week.date).isSame(date))

        if (week) return week

        week = new Week({ date })

        user.weeks.push(week)

        await user.save()

        return week
    })()
}

// falta mirar que sea current week...