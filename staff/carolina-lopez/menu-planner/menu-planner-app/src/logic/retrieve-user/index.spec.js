import logic from '..'
import { database, models } from 'menu-planner-data'
import jwt from 'jsonwebtoken'

const { User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve user', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, email, password, id

    beforeEach(async () => {
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`

        await User.deleteMany()

        const user = await User.create({ name, surname, email, password })

        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
    })

    it('should succeed on correct data', async () =>{
            const user = await logic.retrieveUser()
           
                expect(user).toBeDefined()
                expect(user.id).toBe(id)
                expect(user._id).toBeUndefined()
                expect(user.name).toBe(name)
                expect(user.surname).toBe(surname)
                expect(user.email).toBe(email)
                expect(user.password).toBeUndefined() 
        })

      it('should throw an error with a wrong id', () =>
        logic.retrieveUser("5d5fe532b4f3f827e6fc64f8")
            .catch( error => {
                expect(error).to.exist
                expect(error.message).toBe(`user with id 5d5fe532b4f3f827e6fc64f8 not found`)
            })
     )
          
    afterAll(() => database.disconnect())
})