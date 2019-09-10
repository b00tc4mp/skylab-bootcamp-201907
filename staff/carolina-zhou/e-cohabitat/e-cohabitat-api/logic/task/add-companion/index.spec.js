require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space, Task } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - add task companion', () => {

    before(() => database.connect(DB_URL_TEST))

    let taskName, taskType, description, date, taskSpace, companions
    let title, type, picture, address, passcode, cousers
    let username, name, surname, email, password, spaces, tasks
    let username2, name2, surname2, email2, password2
    let spaceId, companionId, existentUserId

    beforeEach(async() => {
        const taskTypeArray = ['particular', 'collective', 'maintenance']
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        description = `description-${Math.random()}`
        date = new Date
        taskSpace = []
        companions = []

        await Task.deleteMany()
        title = `title-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`
        cousers = []

        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        spaces = []
        tasks = []

        username2 = `username-${Math.random()}`
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        email2 = `email-${Math.random()}@email.com`
        password2 = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password, spaces, tasks })
        companionId = user._id.toString()

        const existentUser = await User.create({ username: username2, name: name2, surname: surname2, email: email2, password: password2, spaces, tasks })
        existentUserId = existentUser._id.toString()

        const space = await Space.create({ title, type, picture, address, passcode, cousers })
        spaceId = space._id.toString()

        const task = await Task.create({ taskName, taskType, description, date, taskSpace, companions })
        taskId = task._id.toString()

        user.spaces.push(spaceId)
        await user.save()

        existentUser.spaces.push(spaceId)
        existentUser.tasks.push(taskId)
        await existentUser.save()

        space.cousers.push(existentUserId, companionId)
        await space.save()

        task.taskSpace.push(spaceId)
        task.companions.push(existentUserId)
        await task.save()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.addTaskCompanion(taskId, spaceId, companionId)

        expect(result).to.exist
        expect(result.id).to.equal(taskId)
        expect(result.taskName).to.equal(taskName)
        expect(result.taskType).to.equal(taskType)
        expect(result.description).to.equal(description)
        expect(result.date).to.deep.equal(date)
        expect(result.taskSpace).to.include(spaceId)
        expect(result.companions).to.include(existentUserId, companionId)

    })

    it('should fail if the companion was already added to the task', async () => {
        try {
            await logic.addTaskCompanion(taskId, spaceId, existentUserId)
        } catch({error}) {
            expect(error).to.exist
            expect(error.message).to.equal(`user already added to task with id ${taskId}`)
        }
    })

    // task
    it('should fail on empty task id', async () => {
        taskId = ''

        try {
            await logic.addTaskCompanion(taskId, spaceId, companionId)
        } catch({message}) {
            expect(message).to.equal('task id is empty or blank')
        }
    })

    it('should fail on undefined task id', async () => {
        taskId = undefined

        try {
            await logic.addTaskCompanion(taskId, spaceId, companionId)
        } catch({message}) {
            expect(message).to.equal('task id with value undefined is not a string')
        }
    })

    it('should fail on wrong task id data type', async () => {
        taskId = 123

        try {
            await logic.addTaskCompanion(taskId, spaceId, companionId)
        } catch({message}) {
            expect(message).to.equal('task id with value 123 is not a string')
        }
    })

    // space
    it('should fail on empty space id', async () => {
        spaceId = ''

        try {
            await logic.addTaskCompanion(taskId, spaceId, companionId)
        } catch({message}) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try {
            await logic.addTaskCompanion(taskId, spaceId, companionId)
        } catch({message}) {
            expect(message).to.equal('space id with value undefined is not a string')
        }
    })

    it('should fail on wrong space id data type', async () => {
        spaceId = 123

        try {
            await logic.addTaskCompanion(taskId, spaceId, companionId)
        } catch({message}) {
            expect(message).to.equal('space id with value 123 is not a string')
        }
    })

    // companion
    it('should fail on empty user', async () => {
        companionId = ''

        try {
            await logic.addTaskCompanion(taskId, spaceId, companionId)
        } catch({message}) {
            expect(message).to.equal('companion id is empty or blank')
        }
    })

    it('should fail on undefined owner', async () => {
        companionId = undefined

        try {
            await logic.addTaskCompanion(taskId, spaceId, companionId)
        } catch({message}) {
            expect(message).to.equal('companion id with value undefined is not a string')
        }
    })

    it('should fail on wrong user data type', async () => {
        companionId = 123

        try {
            await logic.addTaskCompanion(taskId, spaceId, companionId)
        } catch({message}) {
            expect(message).to.equal('companion id with value 123 is not a string')
        }
    })

    after(() => database.disconnect())
})