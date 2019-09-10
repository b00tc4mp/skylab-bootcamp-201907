require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space, Task } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - add task', () => {

    before(() => database.connect(DB_URL_TEST))
    
    let taskName, taskType, description, date, spaceId, userId
    let title, type, picture, address, passcode
    let username, name, surname, email, password

    beforeEach(async() => {
        const taskTypeArray = ['particular', 'collective', 'maintenance']
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        description = `description-${Math.random()}`
        date = new Date

        await Task.deleteMany()
        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password })
        userId = user._id.toString()

        const space = await Space.create({ title, type, picture, address, passcode, userId })
        spaceId = space._id.toString()
    })

    it('should succeed on correct data', async () => {
        const taskId = await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        expect(taskId).to.exist

        const task = await Task.findOne({ _id: taskId })
        expect(task).to.exist
        expect(task.id).to.equal(taskId)
        expect(task.taskName).to.equal(taskName)
        expect(task.taskType).to.equal(taskType)
        expect(task.description).to.equal(description)
        expect(task.date).to.deep.equal(date)
        expect(task.taskSpace).to.include(spaceId)
        expect(task.companions).to.include(userId)
    })

    // task name
    it('should fail on empty task name', async () => {
        taskName = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task name is empty or blank')
        }
    })

    it('should fail on undefined task name', async () => {
        taskName = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task name with value undefined is not a string')
        }
    })

    it('should fail on wrong task name data type', async () => {
        taskName = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task name with value 123 is not a string')
        }
    })

    // task type
    it('should fail on empty task type', async () => {
        taskType = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task type is empty or blank')
        }
    })

    it('should fail on undefined task type', async () => {
        taskType = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task type with value undefined is not a string')
        }
    })

    it('should fail on wrong task type data type', async () => {
        taskType = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task type with value 123 is not a string')
        }
    })

    // description
    it('should fail on empty task description', async () => {
        description = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task description is empty or blank')
        }
    })

    it('should fail on undefined task description', async () => {
        description = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task description with value undefined is not a string')
        }
    })

    it('should fail on wrong task description data type', async () => {
        description = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task description with value 123 is not a string')
        }
    })

    // date
    it('should fail on empty task date', async () => {
        date = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task date is empty or blank')
        }
    })

    it('should fail on undefined task date', async () => {
        date = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task date with value undefined is not a date')
        }
    })

    it('should fail on wrong space date data type', async () => {
        date = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('task date with value 123 is not a date')
        }
    })

    // space id
    it('should fail on empty space id', async () => {
        spaceId = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('space id with value undefined is not a string')
        }
    })

    it('should fail on wrong space id data type', async () => {
        spaceId = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('space id with value 123 is not a string')
        }
    })

    // user id
    it('should fail on empty creator-user id', async () => {
        id = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('creator-user id is empty or blank')
        }
    })

    it('should fail on undefined creator-user id', async () => {
        id = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('creator-user id with value undefined is not a string')
        }
    })

    it('should fail on wrong creator-user id data type', async () => {
        id = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId, userId)
        } catch({message}) {
            expect(message).to.equal('creator-user id with value 123 is not a string')
        }
    })

    after(() => database.disconnect())
})