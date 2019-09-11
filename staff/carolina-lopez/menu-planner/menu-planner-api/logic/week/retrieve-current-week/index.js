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
        let user = await User.findById(userId).populate('weeks.monday.breakfast weeks.monday.lunch weeks.monday.snack weeks.monday.dinner weeks.tuesday.breakfast weeks.tuesday.lunch weeks.tuesday.snack weeks.tuesday.dinner weeks.wednesday.breakfast weeks.wednesday.lunch weeks.wednesday.snack weeks.wednesday.dinner weeks.thursday.breakfast weeks.thursday.lunch weeks.thursday.snack weeks.thursday.dinner weeks.friday.breakfast weeks.friday.lunch weeks.friday.snack weeks.friday.dinner weeks.saturday.breakfast weeks.saturday.lunch weeks.saturday.snack weeks.saturday.dinner weeks.sunday.breakfast weeks.sunday.lunch weeks.sunday.snack weeks.sunday.dinner').lean()

        // TODO check user is defined, otherwise error (user not found)

        debugger

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

        return sanitizeWeek(week._doc) // NOTE ._doc is the clean object (not connected to db)
    })()
}

function sanitizeWeek(week) {
    sanitizeId(week)

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week

    if (monday) sanitizeDay(monday)
    if (tuesday) sanitizeDay(tuesday)
    if (wednesday) sanitizeDay(wednesday)
    if (thursday) sanitizeDay(thursday)
    if (friday) sanitizeDay(friday)
    if (saturday) sanitizeDay(saturday)
    if (sunday) sanitizeDay(sunday)

    return week
}

function sanitizeDay(day) {
    sanitizeId(day)

    const { breakfast, lunch, snack, dinner } = day

    sanitizeId(breakfast)
    sanitizeId(lunch)
    sanitizeId(snack)
    sanitizeId(dinner)
}

function sanitizeId(object) {
    object.id = object._id.toString()
    delete object._id
}