const mongoose = require('mongoose')
const { user, subject, classroom, conversation, documents, homework, message, post, exam, note } = require('./schemas')

module.exports = {

    User: mongoose.model('User', user),
    Subject: mongoose.model('Subject', subject),
    Classroom: mongoose.model('Classroom', classroom),
    Conversation: mongoose.model('Conversation', conversation),
    Documents: mongoose.model('Documents', documents),
    Homework: mongoose.model('Homework', homework),
    Message: mongoose.model('Message', message),
    Post: mongoose.model('Post', post),
    Exam: mongoose.model('Exam', exam),
    Note: mongoose.model('Note', note)

 }