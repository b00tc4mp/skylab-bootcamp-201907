require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Task, Comment } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - delete comment', () => {

    before(() => database.connect(DB_URL_TEST))

    let authorId, author, posted, text, taskId
    let username, name, surname, email, password, spaces, tasks, userId
    let taskName, taskType, description, date, taskSpace, companions, comments

    beforeEach(async() => {   
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password, spaces, tasks })
        userId = user._id.toString()

        const taskTypeArray = ['particular', 'collective', 'maintenance']
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        description = `description-${Math.random()}`
        date = new Date

        const task = await Task.create({ taskName, taskType, description, date, taskSpace, companions, comments })

        authorId = userId
        author = username
        posted = new Date
        text = `comment-${Math.random()}`
        taskId = task._id.toString()

        const newComment = await Comment.create({ authorId, author, posted, text })
        commentId = newComment._id.toString()

        user.tasks.push(taskId)
        await user.save()

        task.companions.push(userId)
        task.comments.push(newComment)
        await task.save()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.deleteComment(userId, taskId, commentId)
        expect(result).not.to.exist

        const comment = await Comment.findById(commentId)
        expect(comment).not.to.exist
    })

    it('should fail on unexistent user', async () => {
        try {
            await logic.deleteComment('5d5d5530531d455f75da9fF9', taskId, commentId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('there is no user with the provided user id')
        }
    })

    it('should fail on unexistent task', async () => {
        try {
            await logic.deleteComment(userId, '5d5d5566531d455f75da9fF9', commentId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('there is no task with the provided task id')
        }
    })

    it('should fail on unexistent comment', async () => {
        try {
            await logic.deleteComment(userId, taskId, '5d5d5530531d455f75da9fF9')
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('there is no comment with the provided comment id')
        }
    })

    it('should fail on empty user id', async () => {
        userId = ' '

        try {
            await logic.deleteComment(userId, taskId, commentId)
        } catch({ message }) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined user id', async () => {
        userId = undefined

        try {
            await logic.deleteComment(userId, taskId, commentId)
        } catch({ message }) {
            expect(message).to.equal("user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong user id data type', async() => {
        userId = 123

         try {
            await logic.deleteComment(userId, taskId, commentId)
        } catch({ message }) {
            expect(message).to.equal("user id with value 123 is not a string")
        }
       
    })

    it('should fail on empty task id', async () => {
        taskId = ' '

        try {
            await logic.deleteComment(userId, taskId, commentId)
        } catch({ message }) {
            expect(message).to.equal('task id is empty or blank')
        }
    })

    it('should fail on undefined task id', async () => {
        taskId = undefined

        try {
            await logic.deleteComment(userId, taskId, commentId)
        } catch({ message }) {
            expect(message).to.equal("task id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong task id data type', async() => {
        taskId = 123

         try {
            await logic.deleteComment(userId, taskId, commentId)
        } catch({ message }) {
            expect(message).to.equal("task id with value 123 is not a string")
        }
    })

    it('should fail on empty comment id', async () => {
        commentId = ' '

        try {
            await logic.deleteComment(userId, taskId, commentId)
        } catch({ message }) {
            expect(message).to.equal('comment id is empty or blank')
        }
    })

    it('should fail on undefined comment id', async () => {
        commentId = undefined

        try {
            await logic.deleteComment(userId, taskId, commentId)
        } catch({ message }) {
            expect(message).to.equal("comment id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong comment id data type', async() => {
        commentId = 123

         try {
            await logic.deleteComment(userId, taskId, commentId)
        } catch({ message }) {
            expect(message).to.equal("comment id with value 123 is not a string")
        }
    })

    after(() => database.disconnect())
})