const { Router } = require('express')
const bodyParser = require('body-parser')
const tokenMiddleware = require('../helpers/token-middleware')
const { registerUser, retrieveUser, unregisterUser, updateUser, authenticateUser, retrieveAll } = require('./user')
const { registerClass, retrieveClass, addStudent, unregisterClass, unregisterType } = require('./class')
const { registerSubject, retrieveSubject, retrieveAllSubjectToStudent, addTeacher, addStudentSub, unregisterSubject } = require('./subject')
const { registerHomework, retrieveHomework, retrieveAllHomework, delivery, unregisterHomework } = require('./homework')
const { registerExam, retrieveAllExam, addNote, unregisterExam } = require('./exam')
const { createPost, retrievePost, removePost } = require('./post')
const { createConversation, addMessage, consultSend } = require('./conversation')

const router = Router()

const jsonBodyParser = bodyParser.json()

//USERS
router.post('/users', jsonBodyParser, registerUser)

router.post('/auth', jsonBodyParser, authenticateUser)

router.get('/users', [tokenMiddleware, jsonBodyParser], retrieveUser)

router.get('/users-all', [tokenMiddleware, jsonBodyParser], retrieveAll)

router.patch('/users/', [tokenMiddleware, jsonBodyParser], updateUser)

router.delete('/users/', [tokenMiddleware, jsonBodyParser], unregisterUser)

//CLASSES
router.post('/class', [tokenMiddleware, jsonBodyParser], registerClass)

router.get('/class', [tokenMiddleware, jsonBodyParser], retrieveClass)

router.post('/addStudent', [tokenMiddleware, jsonBodyParser], addStudent)

router.delete('/class', [tokenMiddleware, jsonBodyParser], unregisterClass)

router.delete('/classStu', [tokenMiddleware, jsonBodyParser], unregisterType)

//SUBJECTS
router.post('/subject', [tokenMiddleware, jsonBodyParser], registerSubject)

router.get('/subject', [tokenMiddleware, jsonBodyParser], retrieveSubject)

router.get('/subjectStu', [tokenMiddleware, jsonBodyParser], retrieveAllSubjectToStudent)

router.post('/addTeacher', [tokenMiddleware, jsonBodyParser], addTeacher)

router.post('/addSubStudent', [tokenMiddleware, jsonBodyParser], addStudentSub)

router.delete('/subject', [tokenMiddleware, jsonBodyParser], unregisterSubject)

//HOMEWORK
router.post('/homeworks', [tokenMiddleware, jsonBodyParser], registerHomework)

router.get('/homeworks', [tokenMiddleware, jsonBodyParser], retrieveHomework)

router.get('/homeworksAll', [tokenMiddleware, jsonBodyParser], retrieveAllHomework)

router.post('/delivery', [tokenMiddleware, jsonBodyParser], delivery)

router.delete('/homeworks', [tokenMiddleware, jsonBodyParser], unregisterHomework)

//EXAM
router.post('/exams', [tokenMiddleware, jsonBodyParser], registerExam)

router.get('/exams', [tokenMiddleware, jsonBodyParser], retrieveAllExam)

router.post('/addNote', [tokenMiddleware, jsonBodyParser], addNote)

router.delete('/exam', [tokenMiddleware, jsonBodyParser], unregisterExam)

//POST
router.post('/post', [tokenMiddleware, jsonBodyParser], createPost)

router.get('/post', [tokenMiddleware, jsonBodyParser], retrievePost)

router.delete('/post', [tokenMiddleware, jsonBodyParser], removePost)

//CONVERSATION
router.post('/conversation', [tokenMiddleware, jsonBodyParser], createConversation)

router.post('/addMessage', [tokenMiddleware, jsonBodyParser], addMessage)

router.get('/consult', [tokenMiddleware, jsonBodyParser], consultSend)


module.exports = router