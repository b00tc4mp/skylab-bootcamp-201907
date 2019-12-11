import logic from '../../'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Space, Task } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - add task', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let taskName, taskType, description, date, taskSpace, companions
    let title, type, picture, address, passcode, cousers, spaceId
    let username, name, surname, email, password, spaces, tasks, id

    beforeEach(async () => {
        const taskTypeArray = ['particular', 'collective', 'maintenance']
        const spaceTypeArray = ['kitchen', 'bathroom', 'living room', 'coworking', 'garden', 'rooftop', 'other']
        
        taskName = `taskName-${Math.random()}`
        taskType =  `${taskTypeArray[Math.floor(Math.random() * taskTypeArray.length)]}`
        description = `description-${Math.random()}`
        date = new Date
        companions = []

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

        await User.deleteMany()

        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ username, name, surname, email, password: hash, spaces, tasks })
        id = user.id

        const space = await Space.create({ title, type, picture, address, passcode, cousers })
        spaceId = space.id
        space.cousers.push(id)
        await space.save()
        
        user.spaces.push(spaceId)
        await user.save()
        
        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__userCredentials__ = { id: id, token: token }
        
    })

    it('should succeed on correct data', async () => {
        const response = await logic.addTask(taskName, taskType, description, date, spaceId)
        expect(response).toBeUndefined()

        const task = await Task.findOne({ description, date  })
        expect(task).toBeDefined()
        expect(task._id).toBeDefined()
        expect(task.taskName).toBe(taskName)
        expect(task.taskType).toBe(taskType)
        expect(task.description).toBe(description)
        expect(new Date(task.date)).toEqual(date)
        expect(task.taskSpace.toString()).toBe(spaceId)
        expect(task.companions).toHaveLength(1)
    })

    // task name
    it('should fail on empty task name', async () => {
        taskName = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task name is empty or blank')
        }
    })

    it('should fail on undefined task name', async () => {
        taskName = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task name with value undefined is not a string')
        }
    })

    it('should fail on wrong task name data type', async () => {
        taskName = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task name with value 123 is not a string')
        }
    })

    // task type
    it('should fail on empty task type', async () => {
        taskType = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task type is empty or blank')
        }
    })

    it('should fail on undefined task type', async () => {
        taskType = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task type with value undefined is not a string')
        }
    })

    it('should fail on wrong task type data type', async () => {
        taskType = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task type with value 123 is not a string')
        }
    })

    // description
    it('should fail on empty task description', async () => {
        description = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task description is empty or blank')
        }
    })

    it('should fail on undefined task description', async () => {
        description = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task description with value undefined is not a string')
        }
    })

    it('should fail on wrong task description data type', async () => {
        description = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task description with value 123 is not a string')
        }
    })

    // date
    it('should fail on empty task date', async () => {
        date = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task date is empty or blank')
        }
    })

    it('should fail on undefined task date', async () => {
        date = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task date with value undefined is not a date')
        }
    })

    it('should fail on wrong space date data type', async () => {
        date = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('task date with value 123 is not a date')
        }
    })

    // space id
    it('should fail on empty space id', async () => {
        spaceId = ''

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('space id with value undefined is not a string')
        }
    })

    it('should fail on wrong space id data type', async () => {
        spaceId = 123

        try {
            await logic.addTask(taskName, taskType, description, date, spaceId)
        } catch({message}) {
            expect(message).toBe('space id with value 123 is not a string')
        }
    })

    afterAll(() => database.disconnect())
})
