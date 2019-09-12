const { validate } = require('menu-planner-utils')
const { models, sanitize } = require('menu-planner-data')
const moment = require('moment')
const { User, Recipe } = models
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
        if (!user) throw new Error(`user whith id ${userId} not found`)

        // calculate current week monday exact date
        const _day = moment().date() - moment().day() + 1,
            month = moment().month(),
            year = moment().year()

        const date = new Date(year, month, _day)

        const { weeks } = user

        let week = weeks.find(week => moment(week.date).isSame(date))

        if (!week) throw Error(`week does not exist for user with id ${userId}`)

        const dayOftheWeek = moment().day()

        let day
        switch (dayOftheWeek) {
            case 0:
                day = week.sunday
                break
            case 1:
                day = week.monday
                break
            case 2:
                day = week.tuesday
                break
            case 3:
                day = week.wednesday
                break
            case 4:
                day = week.thursday
                break
            case 5:
                day = week.friday
                break
            case 6:
                day = week.saturday
                break
            default:
                day = week.monday
                break
        }

        const { breakfast: breakfastId, lunch: lunchId, snack: snackId, dinner: dinnerId } = day

        const breakfast = await Recipe.findById(breakfastId).lean()
        if (!breakfast) throw Error(`recipe with id ${breakfastId} not found`)
        sanitize.id(breakfast)

        const lunch = await Recipe.findById(lunchId).lean()
        if (!lunch) throw Error(`recipe with id ${lunchId} not found`)
        sanitize.id(lunch)

        const snack = await Recipe.findById(snackId).lean()
        if (!snack) throw Error(`recipe with id ${snackId} not found`)
        sanitize.id(snack)

        const dinner = await Recipe.findById(dinnerId).lean()
        if (!dinner) throw Error(`recipe with id ${dinnerId} not found`)
        sanitize.id(dinner)
        
        return { breakfast, lunch, snack, dinner }
    })()
}