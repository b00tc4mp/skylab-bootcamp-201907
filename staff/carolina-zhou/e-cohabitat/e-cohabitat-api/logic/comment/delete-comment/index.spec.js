require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space, Task, Comment } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - delete comment', () => {

    before(() => database.connect(DB_URL_TEST))

    let authorId, author, posted, text, taskId
    let title, type, picture, address, passcode
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

        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        const space = await Space.create({ title, type, picture, address, passcode })
        spaceId = space.id.toString()

        const taskTypeArray = ['particular', 'collective', 'maintenance']
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        description = `description-${Math.random()}`
        date = new Date
        taskSpace = space.id

        const task = await Task.create({ taskName, taskType, description, date, taskSpace, companions, comments })

        authorId = userId
        author = username
        posted = new Date
        text = `comment-${Math.random()}`
        taskId = task._id.toString()
        taskSpace = space.id

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

    it('should fail on if the comment does not match the task', async () => {
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        const space = await Space.create({ title, type, picture, address, passcode })
        spaceId = space.id.toString()

        const taskTypeArray = ['particular', 'collective', 'maintenance']
        taskName = `taskName2-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        description = `description2-${Math.random()}`
        date = new Date
        taskSpace = space.id

        const task2 = await Task.create({ taskName, taskType, description, date, taskSpace, companions, comments })
        const task2Id = task2._id.toString()

        try {
            await logic.deleteComment(userId, task2Id, commentId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('this comment was not found in the task introduced')
        }
    })

    it('should fail on if the user is not the author of the comment', async () => {
        username = `username2-${Math.random()}`
        name = `name2-${Math.random()}`
        surname = `surname2-${Math.random()}`
        email = `email2-${Math.random()}@email.com`
        password = `0123-${Math.random()}`

        const user2 = await User.create({ username, name, surname, email, password, spaces, tasks })
        const user2Id = user2._id.toString()

        try {
            await logic.deleteComment(user2Id, taskId, commentId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('this user is not the author of the comment to delete')
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