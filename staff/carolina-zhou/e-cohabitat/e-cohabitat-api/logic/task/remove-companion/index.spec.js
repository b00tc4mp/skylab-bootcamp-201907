require('dotenv').config()

const { expect } = require('chai')
const logic = require('../..')
const { database, models: { User, Space, Task } } = require('data')

const { env: { DB_URL_TEST }} = process

describe('logic - remove task companion', () => {

    before(() => database.connect(DB_URL_TEST))

    let taskName, taskType, description, date, taskSpace, companions, taskId
    let title, type, picture, address, passcode, cousers, spaceId
    let username, name, surname, email, password, companionIdOne
    let username2, name2, surname2, email2, password2, companionIdTwo
    let username3, name3, surname3, email3, password3, companionIdThree

    beforeEach(async() => {
        const taskTypeArray = ['particular', 'collective', 'maintenance']
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        description = `description-${Math.random()}`
        date = new Date

        await Task.deleteMany()
        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        username = `username-${Math.random()}`
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`

        username2 = `username2-${Math.random()}`
        name2 = `name2-${Math.random()}`
        surname2 = `surname2-${Math.random()}`
        email2 = `email2-${Math.random()}@email.com`
        password2 = `1232-${Math.random()}`

        const newUserOne = await User.create({ username, name, surname, email, password })
        companionIdOne = newUserOne.id

        const newUserTwo = await User.create({ username: username2, name: name2, surname: surname2, email: email2, password :password2 })
        companionIdTwo = newUserTwo.id

        const newSpace = await Space.create({ title, type, picture, address, passcode, cousers })
        newSpace.cousers.push(companionIdOne, companionIdTwo)
        spaceId = newSpace.id
        await newSpace.save()

        const newTask = await Task.create({ taskName, taskType, description, date, taskSpace: newSpace._id, companions })
        newTask.companions.push(companionIdOne, companionIdTwo)
        taskId = newTask._id.toString()
        await newTask.save()

        newUserOne.tasks.push(taskId)
        await newUserOne.save()

        newUserTwo.tasks.push(taskId)
        await newUserTwo.save()
    })

    it('should succeed on correct data', async () => {
        const userOne = await User.findById(companionIdOne)
        expect(userOne).to.exist
        expect(userOne.id).to.equal(companionIdOne)

        const userTwo = await User.findById(companionIdTwo)
        expect(userTwo).to.exist
        expect(userTwo.id).to.equal(companionIdTwo)

        const space = await Space.findById(spaceId)
        expect(space).to.exist
        expect(space.id).to.equal(spaceId)
        expect(space.cousers).to.include(companionIdOne, companionIdTwo)
        
        const task = await Task.findById(taskId)
        expect(task).to.exist
        expect(task.id).to.equal(taskId)
        expect(task.companions).to.include(companionIdOne, companionIdTwo)

        const result = await logic.removeTaskCompanion(taskId, companionIdOne)
        expect(result).to.exist
        expect(result.companions).not.to.include(companionIdOne) 
    })

    it('should fail on unexistent task', async () => {
        taskId = "5d5d5530531d455f75db9fF9"

        try {
            await logic.removeTaskCompanion(taskId, companionIdOne)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong task id provided')
        }
    })

    it('should fail on existent task but wrong companion', async () => {
        username3 = `username3-${Math.random()}`
        name3 = `name3-${Math.random()}`
        surname3 = `surname3-${Math.random()}`
        email3 = `email3-${Math.random()}@email.com`
        password3 = `1233-${Math.random()}`

        const newUserThree = await User.create({ username: username3, name: name3, surname: surname3, email: email3, password :password3 })
        companionIdThree = newUserThree.id

        try {
            await logic.removeTaskCompanion(taskId, companionIdThree)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal(`user with id ${companionIdThree} is not a task companion`)
        }
    })

    it('should fail on unexistent user', async () => {
        companionIdOne = '5d5d5530531d455f75da9fF9'
        try {
            await logic.removeTaskCompanion(taskId, companionIdOne)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).to.equal('wrong companion id provided')
        }
    })

    it('should fail on empty task id', async () => {
        taskId = ' '

        try{
            await logic.removeTaskCompanion(taskId, companionIdOne)
        } catch({ message }) {
            expect(message).to.equal('task id is empty or blank')
        }
    })

    it('should fail on undefined task id', async () => {
        taskId = undefined

        try{
            await logic.removeTaskCompanion(taskId, companionIdOne)
        } catch({ message }) {
            expect(message).to.equal("task id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong task id data type', async() => {
        taskId = 123

         try{
            await logic.removeTaskCompanion(taskId, companionIdOne)
        } catch({ message }) {
            expect(message).to.equal("task id with value 123 is not a string")
        }
    })

    it('should fail on empty companion id', async () => {
        companionIdOne = ' '

        try{
            await logic.removeTaskCompanion(taskId, companionIdOne)
        } catch({ message }) {
            expect(message).to.equal('companion id is empty or blank')
        }
    })

    it('should fail on undefined companion id', async () => {
        companionIdOne = undefined

        try{
            await logic.removeTaskCompanion(taskId, companionIdOne)
        } catch({ message }) {
            expect(message).to.equal("companion id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong companion id data type', async() => {
        companionIdOne = 123

         try{
            await logic.removeTaskCompanion(taskId, companionIdOne)
        } catch({ message }) {
                expect(message).to.equal("companion id with value 123 is not a string")
        }
    })

    after(() => database.disconnect())
})