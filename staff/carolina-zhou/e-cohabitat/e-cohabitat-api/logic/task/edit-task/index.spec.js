require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space, Task } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - edit task', () => {

    before(() => database.connect(DB_URL_TEST))

    let taskName, taskType, description, date, companions, id
    let title, type, picture, address, passcode, cousers, spaceId
    let username, name, surname, email, password, spaces, tasks, userId   

    beforeEach(async() => {
        const taskTypeArray = ['particular', 'collective', 'maintenance']
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        description = `description-${Math.random()}`
        date = new Date

        body = {
            taskName: `newName-${Math.random()}`,
            description: `newDescription-${Math.random()}`
        }

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

        const task = await Task.create({ taskName, taskType, description, date, taskSpace: space._id, companions })
        id = task._id.toString()

        user.spaces.push(spaceId)
        user.tasks.push(id)
        await user.save()

        space.cousers.push(userId)
        await space.save()

        task.companions.push(userId)
        await task.save()
    })

    it('should succeed on correct data', async () => {
        const result = await logic.editTask(id, body)
        expect(result).not.to.exist

        const task = await Task.findById(id)
        expect(task).to.exist
        expect(task.taskName).to.equal(body.taskName)
        expect(task.description).to.equal(body.description) 
            
    })

     it('should fail on non-existent task', async () => {
        id = '5d5d5530531d455f75da9fF9'

        try{
            await logic.editTask(id, body)

            throw new Error('should not reach this point')
        } catch({ message }) {
            expect(message).to.equal(`task with id ${id} does not exist`)
        }
    }) 

    it('should fail on empty task id', async () => {
        id = ''

        try{
            await logic.editTask(id, body)
        } catch({ message }) {
            expect(message).to.equal('task id is empty or blank')
        }
    })

    it('should fail on undefined task id', async () => {
        id = undefined

        try{
            await logic.editTask(id, body)
        } catch({ message }) {
            expect(message).to.equal("task id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong task id data type', async() => {
        id = 123

        try{
            await logic.editTask(id, body)
        } catch({ message }) {
            expect(message).to.equal("task id with value 123 is not a string")
        }
    })

    it('should fail on empty body', async () => {
        body = ''

        try{
            await logic.editTask(id, body)
        } catch({ message }) {
            expect(message).to.equal('body is empty or blank')
        }
    })

    it('should fail on undefined body', async () => {
        body = undefined

        try{
            await logic.editTask(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value undefined is not an object")
        }
    })
     
    it('should fail on wrong body data type', async() => {
        body = 123

        try{
            await logic.editTask(id, body)
        } catch({ message }) {
            expect(message).to.equal("body with value 123 is not an object")
        }
    })

    after(() => database.disconnect())
})