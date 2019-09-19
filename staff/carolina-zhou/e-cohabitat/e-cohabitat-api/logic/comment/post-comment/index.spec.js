require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space, Task, Comment } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - post comment', () => {

    before(() => database.connect(DB_URL_TEST))
    
    let author, posted, text, taskId
    let title, type, picture, address, passcode
    let username, name, surname, email, password, userId
    let taskName, taskType, description, date, taskSpace, companions, comments

    beforeEach(async() => {   
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password })
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
    })

    it('should succeed on correct data', async () => {
        const commentId = await logic.postComment(authorId, author, posted, text, taskId)
        expect(commentId).to.exist

        const comment = await Comment.findOne({ _id: commentId })
        expect(comment).to.exist
        expect(comment.id).to.equal(commentId)
        expect(comment.authorId.toString()).to.equal(authorId)
        expect(comment.author).to.equal(author)
        expect(comment.posted).to.deep.equal(posted)
        expect(comment.text).to.equal(text)
    })

    it('should fail on unexistent user', async () => {
        try {
            await logic.postComment('5d5d5530531d455f75da9fF9', author, posted, text, taskId)

            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('user does not exist')
        }
    })

    it('should fail on unexistent task', async () => {
        try {
            await logic.postComment(authorId, author, posted, text, '5d5d5530531d455f75da9fF9')
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('task does not exist')
        }
    })

    // author id
    it('should fail on empty author id', async () => {
        authorId = ''

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('author id is empty or blank')
        }
    })

    it('should fail on undefined author id', async () => {
        authorId = undefined

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('author id with value undefined is not a string')
        }
    })

    it('should fail on wrong author id data type', async () => {
        authorId = 123

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('author id with value 123 is not a string')
        }
    })

    // author username
    it('should fail on empty author id', async () => {
        author = ''

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('author username is empty or blank')
        }
    })

    it('should fail on undefined author id', async () => {
        author = undefined

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('author username with value undefined is not a string')
        }
    })

    it('should fail on wrong author id data type', async () => {
        author = 123

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('author username with value 123 is not a string')
        }
    })

    // post date
    it('should fail on empty comment date', async () => {
        posted = ''

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('comment date is empty or blank')
        }
    })

    it('should fail on undefined comment date', async () => {
        posted = undefined

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('comment date with value undefined is not a date')
        }
    })

    it('should fail on wrong comment date data type', async () => {
        posted = 123

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('comment date with value 123 is not a date')
        }
    })

    // text
    it('should fail on empty comment text', async () => {
        text = ''

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('comment text is empty or blank')
        }
    })

    it('should fail on undefined comment text', async () => {
        text = undefined

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('comment text with value undefined is not a string')
        }
    })

    it('should fail on wrong comment text data type', async () => {
        text = 123

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('comment text with value 123 is not a string')
        }
    })

    // task id
    it('should fail on empty task id', async () => {
        taskId = ''

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('task id is empty or blank')
        }
    })

    it('should fail on undefined task id', async () => {
        taskId = undefined

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('task id with value undefined is not a string')
        }
    })

    it('should fail on wrong task id data type', async () => {
        taskId = 123

        try {
            await logic.postComment(authorId, author, posted, text, taskId)
        } catch({message}) {
            expect(message).to.equal('task id with value 123 is not a string')
        }
    })


    after(() => database.disconnect())
})