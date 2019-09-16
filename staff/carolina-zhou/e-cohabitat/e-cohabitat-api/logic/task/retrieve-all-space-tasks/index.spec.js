require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space, Task } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve all space tasks', () => {

    before(() => database.connect(DB_URL_TEST))

    let taskName, taskType, description, date, taskSpace, companions, taskId
    let title, type, picture, address, passcode, cousers, spaceTasks, spaceId
    let username, name, surname, email, password, spaces, tasks, userId   

    beforeEach(async() => {
        const taskTypeArray = ['particular', 'collective', 'maintenance']
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        picture = `picture-${Math.random()}`
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
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        const user = await User.create({ username, name, surname, email, password, spaces, tasks })
        userId = user._id.toString()

        const space = await Space.create({ title, type, picture, address, passcode, cousers, spaceTasks })
        spaceId = space._id.toString()

        const task = await Task.create({ taskName, taskType, description, date, taskSpace, companions })
        taskId = task._id.toString()

        user.spaces.push(spaceId)
        user.tasks.push(taskId)
        await user.save()

        space.cousers.push(userId)
        space.spaceTasks.push(taskId)
        await space.save()

        task.taskSpace.push(spaceId)
        task.companions.push(userId)
        await task.save()
    })

    it('should succeed on correct data', async() => {
        const tasks = await logic.retrieveAllSpaceTasks(spaceId)
        expect(tasks).to.exist
        expect(tasks).not.to.be.empty

        expect(tasks.toString()).to.equal(taskId)
    })

    it('should fail on empty id', async () => {
        try{
            await logic.retrieveAllSpaceTasks(' ')
        } catch({ message }) {
            expect(message).to.equal('space id is empty or blank')
        }
    })

    it('should fail on undefined id', async () => {
          try{
            await logic.retrieveAllSpaceTasks(undefined)
        } catch({ message }) {
            expect(message).to.equal("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong id data type', async() => {
         try{
            await logic.retrieveAllSpaceTasks(123)
        } catch({ message }) {
                expect(message).to.equal("space id with value 123 is not a string")
        }
    })

    after(() => database.disconnect())
})