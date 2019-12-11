module.exports = {
    registerStudent : require('./register-student'),
    retrieveStudent : require('./retrieve-student'),
    updateStudent : require('./update-student'),

    registerAdmin : require('./register-admin'),
    retrieveAdmin : require('./retrieve-admin'),
    authenticateAdmin : require('./authenticate-admin'),
    updateAdmin : require('./update-admin'),

    registerTutor : require('./register-tutor'),
    retrieveTutor : require('./retrieve-tutor'),
    updateTutor : require('./update-tutor'),
    authenticateTutor : require('./authenticate-tutor'),
    retrieveStudentsByTutor : require('./retrieve-students-by-tutor'),
    
    registerEnrollment : require('./register-enrollment'),
    retrieveCurrentEnrollment : require('./retrieve-current-enrollment'),
    retrieveEnrollmentsByYear : require('./retrieve-enrollments-by-year')
}
