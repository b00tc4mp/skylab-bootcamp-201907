import logic from '../../'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Space, Task } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve all space tasks', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let taskName, taskType, description, date, taskSpace, companions, taskId
    let title, type, picture, address, passcode, cousers, spaceTasks, spaceId
    let username, name, surname, email, password, spaces, tasks, id   

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
        spaces = []
        tasks = []

        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ username, name, surname, email, password: hash, spaces, tasks })
        id = user.id

        const space = await Space.create({ title, type, picture, address, passcode, cousers, spaceTasks })
        spaceId = space._id.toString()

        const task = await Task.create({ taskName, taskType, description, date, taskSpace: space._id, companions })
        taskId = task._id.toString()

        user.spaces.push(spaceId)
        user.tasks.push(taskId)
        await user.save()

        space.cousers.push(id)
        space.spaceTasks.push(taskId)
        await space.save()

        task.companions.push(id)
        await task.save()

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__userCredentials__ = { id: id, token: token }
    })

    it('should succeed on correct data', async() => {
        const tasks = await logic.retrieveAllSpaceTasks(spaceId)
        expect(tasks).toBeDefined
        expect(tasks.length).toBeGreaterThan(0)

        const taskDate = new Date(tasks[0].date)
        expect(tasks[0].taskName).toBe(taskName)
        expect(tasks[0].taskType).toBe(taskType)
        expect(tasks[0].description).toBe(description)
        expect(taskDate).toEqual(date)
        expect(tasks[0].taskSpace.toString()).toBe(spaceId)
        expect(tasks[0]._id).toBe(taskId)
    })

    // space id
    it('should fail on empty space id', async () => {
        try{
            await logic.retrieveAllSpaceTasks(' ')
        } catch({ message }) {
            expect(message).toBe('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
          try{
            await logic.retrieveAllSpaceTasks(undefined)
        } catch({ message }) {
            expect(message).toBe("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
         try{
            await logic.retrieveAllSpaceTasks(123)
        } catch({ message }) {
                expect(message).toBe("space id with value 123 is not a string")
        }
    })
    afterAll(() => database.disconnect())
})