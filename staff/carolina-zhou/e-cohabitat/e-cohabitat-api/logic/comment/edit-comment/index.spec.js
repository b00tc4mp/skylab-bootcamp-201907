require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Task, Comment } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - edit comment', () => {

    before(() => database.connect(DB_URL_TEST))

    let author, posted, text, taskId
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

        const taskTypeArray = ['particular', 'collective', 'maintenance']
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        description = `description-${Math.random()}`
        date = new Date

        const task = await Task.create({ taskName, taskType, description, date, taskSpace, companions, comments })

        author = userId
        posted = new Date
        text = `comment-${Math.random()}`
        taskId = task._id.toString()

        body = {
            text: `newComment-${Math.random()}`
        }
        
        await Comment.deleteMany()

        const newComment = await Comment.create({ author, posted, text, taskId })
        id = newComment._id.toString()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.editComment(id, body)
        expect(result).not.to.exist

        const comment = await Comment.findById(id)
        expect(comment).to.exist
        expect(comment.author.toString()).to.equal(author)
        expect(comment.posted).to.deep.equal(posted) 
        expect(comment.text).to.equal(body.text)
    })

     it('should fail on non-existent comment', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await logic.editComment(id, body)

            throw new Error('should not reach this point')
        } catch({ message }) {
            expect(message).to.equal(`comment with id ${id} does not exist`)
        }
    }) 

    it('should fail on empty comment id', async () => {
        id = ''

        try{
            await logic.editComment(id, body)
        } catch({ message }) {
            expect(message).to.equal('comment id is empty or blank')
        }
    })

    it('should fail on undefined comment id', async () => {
        id = undefined

        try{
            await logic.editComment(id, body)
        } catch({ message }) {
            expect(message).to.equal("comment id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong comment id data type', async() => {
        id = 123

        try{
            await logic.editComment(id, body)
        } catch({ message }) {
            expect(message).to.equal("comment id with value 123 is not a string")
        }
    })

    it('should fail on empty body', async () => {
        body = ''

        try{
            await logic.editComment(id, body)
        } catch({ message }) {
            expect(message).to.equal('body is empty or blank')
        }
    })

    it('should fail on undefined body', async () => {
        body = undefined

        try{
            await logic.editComment(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value undefined is not an object")
        }
    })
     
    it('should fail on wrong body data type', async() => {
        body = 123

        try{
            await logic.editComment(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value 123 is not an object")
        }
    })

    after(() => database.disconnect())
})