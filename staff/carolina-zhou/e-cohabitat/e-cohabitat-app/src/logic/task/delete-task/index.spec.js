/* require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space, Task } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - delete task', () => {

    before(() => database.connect(DB_URL_TEST))

    let taskName, taskType, description, date, taskSpace, companions, taskId
    let title, type, picture, address, passcode, cousers, spaceId
    let username, name, surname, email, password, spaces, tasks, userId   

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

        const user = await User.create({ username, name, surname, email, password, spaces, tasks })
        userId = user._id.toString()

        const space = await Space.create({ title, type, picture, address, passcode, cousers })
        spaceId = space._id.toString()

        const task = await Task.create({ taskName, taskType, description, date, taskSpace, companions })
        taskId = task._id.toString()

        user.spaces.push(spaceId)
        user.tasks.push(taskId)
        await user.save()

        space.cousers.push(userId)
        await space.save()

        task.taskSpace.push(spaceId)
        task.companions.push(userId)
        await task.save()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.deleteTask(userId, taskId)
        expect(result).not.to.exist
        const task = await Task.findById(taskId)
        expect(task).not.to.exist
    })

    it('should fail on unexistent user', async () => {
        try {
            await logic.deleteTask('5d5d5530531d455f75da9fF9', taskId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('there is no user with the provided user id')
        }
    })

    it('should fail on unexistent task', async () => {
        try {
            await logic.deleteTask(userId, '5d5d5530531d455f75da9fF9')
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('there is no task with the provided task id')
        }
    })

    it('should fail on empty user id', async () => {
        userId = ' '

        try {
            await logic.deleteTask(userId, taskId)
        } catch({ message }) {
            expect(message).to.equal('user id is empty or blank')
        }
    })

    it('should fail on undefined user id', async () => {
        userId = undefined

        try {
            await logic.deleteTask(userId, taskId)
        } catch({ message }) {
            expect(message).to.equal("user id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong user id data type', async() => {
        userId = 123

         try {
            await logic.deleteTask(userId, taskId)
        } catch({ message }) {
            expect(message).to.equal("user id with value 123 is not a string")
        }
       
    })

    it('should fail on empty task id', async () => {
        taskId = ' '

        try {
            await logic.deleteTask(userId, taskId)
        } catch({ message }) {
            expect(message).to.equal('task id is empty or blank')
        }
    })

    it('should fail on undefined task id', async () => {
        taskId = undefined

        try {
            await logic.deleteTask(userId, taskId)
        } catch({ message }) {
            expect(message).to.equal("task id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong task id data type', async() => {
        taskId = 123

        try {
            await logic.deleteTask(userId, taskId)
        } catch({ message }) {
            expect(message).to.equal("task id with value 123 is not a string")
        }
    })

    after(() => database.disconnect())
}) */