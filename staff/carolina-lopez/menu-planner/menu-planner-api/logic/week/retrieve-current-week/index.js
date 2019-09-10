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

        if (week) return sanitize(week._doc) // NOTE ._doc is the clean data (not connected to mongoose)

        week = new Week({ date })

        user.weeks.push(week)

        await user.save()

        return sanitize(week._doc)
    })()
}

function sanitize(week) {
    week.id = week._id.toString()
    delete week._id

    week.monday = week.monday._doc
    week.tuesday = week.tuesday._doc
    week.wednesday = week.wednesday._doc
    week.thursday = week.thursday._doc
    week.friday = week.friday._doc
    week.saturday = week.saturday._doc
    week.sunday = week.sunday._doc

    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = week

    if (monday) {
        monday.id = monday._id.toString()
        delete monday._id

        monday.breakfast = monday.breakfast.toString()
        monday.lunch = monday.lunch.toString()
        monday.snack = monday.snack.toString()
        monday.dinner = monday.dinner.toString()
    }

    if (tuesday) {
        tuesday.id = tuesday._id.toString()
        delete tuesday._id

        tuesday.breakfast = tuesday.breakfast.toString()
        tuesday.lunch = tuesday.lunch.toString()
        tuesday.snack = tuesday.snack.toString()
        tuesday.dinner = tuesday.dinner.toString()
    }

    if (wednesday) {
        wednesday.id = wednesday._id.toString()
        delete wednesday._id

        wednesday.breakfast = wednesday.breakfast.toString()
        wednesday.lunch = wednesday.lunch.toString()
        wednesday.snack = wednesday.snack.toString()
        wednesday.dinner = wednesday.dinner.toString()
    }

    if (thursday) {
        thursday.id = thursday._id.toString()
        delete thursday._id

        thursday.breakfast = thursday.breakfast.toString()
        thursday.lunch = thursday.lunch.toString()
        thursday.snack = thursday.snack.toString()
        thursday.dinner = thursday.dinner.toString()
    }

    if (friday) {
        friday.id = friday._id.toString()
        delete friday._id

        friday.breakfast = friday.breakfast.toString()
        friday.lunch = friday.lunch.toString()
        friday.snack = friday.snack.toString()
        friday.dinner = friday.dinner.toString()
    }

    if (saturday) {
        saturday.id = saturday._id.toString()
        delete saturday._id

        saturday.breakfast = saturday.breakfast.toString()
        saturday.lunch = saturday.lunch.toString()
        saturday.snack = saturday.snack.toString()
        saturday.dinner = saturday.dinner.toString()
    }

    if (sunday) {
        sunday.id = sunday._id.toString()
        delete sunday._id

        sunday.breakfast = sunday.breakfast.toString()
        sunday.lunch = sunday.lunch.toString()
        sunday.snack = sunday.snack.toString()
        sunday.dinner = sunday.dinner.toString()
    }

    return week
}