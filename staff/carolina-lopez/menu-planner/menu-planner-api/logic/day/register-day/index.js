const { models: { User, Day, Recipe } } = require('menu-planner-data')
const { validate } = require('menu-planner-utils')
const moment = require('moment')

/**
 * Registers a day in the week. If day already exists, then it replaces the old one meals.
 * 
 * @param {string} userId 
 * @param {string} day A day of the week ('monday', 'tuesday', 'wednesday', thursday', 'friday', 'saturday', 'sunday')
 * @param {string} breakfast 
 * @param {string} lunch
 * @param {string} snack
 * @param {string} dinner 
 * 
 * @returns {Promise}
 */
module.exports = function (userId, day, breakfast, lunch, snack, dinner) {
    //VALIDATE TODO STRING
    validate.string(userId, 'userId')
    validate.string(day, 'day')

    // TODO find user by id, if not found then error, otherwise proceed
    // TODO check weeks and find matching week with current date (new Date) if no week, then Error, otherwise proceed to create day in that week

    return (async () => {
        const user = await User.findById(userId)
        if(!user) throw new Error(`user with id ${userId} not found`)

        // calculate current week monday exact date
        const __day = moment().date() - moment().day() + 1,
        month = moment().month(),
        year = moment().year()

        const currentWeekMondayDate = new Date(year, month, __day)

        const { weeks } = user

        const week = weeks.find(week => moment(week.date).isSame(currentWeekMondayDate))

        if (!week) throw Error(`current week does not exist for user with id ${userId}`)

        const _breakfast = await Recipe.findById(breakfast)
        if (!_breakfast) throw Error(`recipe with id ${breakfast} not found`)

        const _lunch = await Recipe.findById(lunch)
        if (!_lunch) throw Error(`recipe with id ${lunch} not found`)

        const _snack = await Recipe.findById(snack)
        if (!_snack) throw Error(`recipe with id ${snack} not found`)

        const _dinner = await Recipe.findById(dinner)
        if (!_dinner) throw Error(`recipe with id ${dinner} not found`)

        let _day = week[day]

        if (!_day) {
            _day = new Day()

            week[day] = _day
        }

        _day.breakfast = breakfast
        _day.lunch = lunch
        _day.snack = snack
        _day.dinner = dinner

        await user.save()
    })()
}    
