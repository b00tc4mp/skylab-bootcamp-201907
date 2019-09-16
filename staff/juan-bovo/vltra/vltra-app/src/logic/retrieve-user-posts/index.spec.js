import logic from '..'
import { database, models } from 'vltra-data'
import jwt from 'jsonwebtoken'

const { User, Post } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - retrieve user posts', () => {
    beforeAll(() =>  database.connect(REACT_APP_DB_URL_TEST))

    let title, body, author, date, comments, votes, postId, 
    title2, body2, author2, date2, comments2, votes2, postId2, authorId, id

    beforeEach(async () => {
        await User.deleteMany()
        await Post.deleteMany()

        let name, surname, nickname, email, password, bookmarks, voted
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        bookmarks = []
        votes = []
        
        const user = await User.create({ name, surname, nickname, email, password })

        authorId = user.id
        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token

        title = `title-${Math.random()}`
        body = `body-${Math.random()}`
        author = authorId
        date = new Date
        comments = []
        votes = []

        title2 = `title-${Math.random()}`
        body2 = `body-${Math.random()}`
        author2 = authorId
        date2 = new Date
        comments2 = []
        votes2 = []

        const post = await Post.create({title , body, author, date, comments, votes})
        postId = post.id
        

        const post2 = await Post.create({ title : title2 , body : body2, author : author2, date : date2, comments : comments2, votes : votes2 })
        postId2 = post2.id
    })

    it('should succeed on correct id', async () => {
        const userPosts = await logic.retrieveUserPosts(authorId)
        
        expect(userPosts).toBeTruthy()
        expect(userPosts.length).toBe(2)
    })

    it('should fail on wrong authorId', async () => {
        const fakeAuthorId = '5d71070c887d12667c6095cc'
        
        try{
            await logic.retrieveUserPosts(fakeAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).toBeDefined()
                expect(error.message).toBe(`user with id ${fakeAuthorId} does not exist`)
            }
    })

    it('should throw an error if authorId has no posts', async () => {
        let name2, surname2, nickname2, email2, password2, bookmarks2, voted2
        
        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        nickname2 = `nickname-${Math.random()}`
        email2 = `email-${Math.random()}@email.com`
        password2 = `123-${Math.random()}`
        bookmarks2 = []
        votes2 = []
        
        const user2 = await User.create({ name: name2, surname:surname2, nickname:nickname2.substr(0, 20), email:email2, password:password2, bookmarks:bookmarks2, voted:voted2 })

        const noPostsAuthorId = user2.id

        try{
            await logic.retrieveUserPosts(noPostsAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe(`author with authorId ${noPostsAuthorId} does not have any posts`)
            }
    })

    it('should fail on empty authorId', async () => {
        const emptyAuthorId = ''

        try{
            await logic.retrieveUserPosts(emptyAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).toBeTruthy
                expect(error.message).toBe(`authorId with value ${emptyAuthorId} is not a valid ObjectId`)
            }
    })

    it('should fail on undefined authorId', async () => {
        const undefinedAuthorId = undefined

        try{
            await logic.retrieveUserPosts(undefinedAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).toBeTruthy()
                expect(error.message).toBe(`authorId with value ${undefinedAuthorId} is not a valid ObjectId`)
            }
    })

    it('should fail on wrong authorId data type', async () => {
        const wrongAuthorId = 123

        try{
            await logic.retrieveUserPosts(wrongAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).toBeTruthy
                expect(error.message).toBe(`authorId with value ${wrongAuthorId} is not a valid ObjectId`)
            }
    })

    afterAll(() => database.disconnect())
})