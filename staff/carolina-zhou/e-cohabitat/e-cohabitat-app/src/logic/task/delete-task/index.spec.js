import logic from '../../'
import { database, models } from 'data'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Space, Task } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST


describe('logic - delete task', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let taskName, taskType, description, date, taskSpace, companions, taskId
    let title, type, picture, address, passcode, cousers, spaceTasks, spaceId
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
        await User.deleteMany()

        title = `name-${Math.random()}`
        type = `${spaceTypeArray[Math.floor(Math.random() * spaceTypeArray.length)]}`
        picture = `picture-${Math.random()}`
        address = `address-${Math.random()}`
        passcode = `123-${Math.random()}`

        const hash = await bcrypt.hash(password, 10)
        const user = await User.create({ username, name, surname, email, password: hash, spaces, tasks })
        id = user.id

        const space = await Space.create({ title, type, picture, address, passcode, cousers, spaceTasks })
        spaceId = space.id

        const task = await Task.create({ taskName, taskType, description, date, taskSpace: space._id, companions })
        taskId = task.id

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

    it('should succeed on correct data', async () => {
        const result = await logic.deleteTask(spaceId, taskId)
        expect(result).toBeNull

        const task = await Task.findById(taskId)
        expect(task).toBeNull
    })

    it('should fail on unexistent user', async () => {
        try {
            await logic.deleteTask('5d5d5530531d455f75da9fF9', taskId)
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).toBe('there is no space with the provided space id')
        }
    })

    it('should fail on unexistent task', async () => {
        try {
            await logic.deleteTask(spaceId, '5d5d5530531d455f75da9fF9')
            
            throw Error('should not reach this point')
        } catch({message}) {
            expect(message).toBe('there is no task with the provided task id')
        }
    })

    it('should fail on empty space id', async () => {
        spaceId = ' '

        try {
            await logic.deleteTask(spaceId, taskId)
        } catch({ message }) {
            expect(message).toBe('space id is empty or blank')
        }
    })

    it('should fail on undefined space id', async () => {
        spaceId = undefined

        try {
            await logic.deleteTask(spaceId, taskId)
        } catch({ message }) {
            expect(message).toBe("space id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong space id data type', async() => {
        spaceId = 123

         try {
            await logic.deleteTask(spaceId, taskId)
        } catch({ message }) {
            expect(message).toBe("space id with value 123 is not a string")
        }
       
    })

    it('should fail on empty task id', async () => {
        taskId = ' '

        try {
            await logic.deleteTask(spaceId, taskId)
        } catch({ message }) {
            expect(message).toBe('task id is empty or blank')
        }
    })

    it('should fail on undefined task id', async () => {
        taskId = undefined

        try {
            await logic.deleteTask(spaceId, taskId)
        } catch({ message }) {
            expect(message).toBe("task id with value undefined is not a string")
        }
    })
     
    it('should fail on wrong task id data type', async() => {
        taskId = 123

        try {
            await logic.deleteTask(spaceId, taskId)
        } catch({ message }) {
            expect(message).toBe("task id with value 123 is not a string")
        }
    })

    afterAll(() => database.disconnect())
})