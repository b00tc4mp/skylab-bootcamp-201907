const mongoose = require('mongoose')

const { 
        student, 
        enrollment, 
        tutor, 
        user, 
        activity, 
        shirt, 
        week,
        course
} = require('./schemas')

module.exports = {
    Student : mongoose.model('Student', student),
    Tutor : mongoose.model('Tutor', tutor),
    Enrollment : mongoose.model('Enrollment', enrollment),
    User : mongoose.model('User', user),
    Activity : mongoose.model('Activity', activity),
    Shirt : mongoose.model('Model', shirt),
    Week : mongoose.model('Week', week),
    Course : mongoose.model('Course', course)
}