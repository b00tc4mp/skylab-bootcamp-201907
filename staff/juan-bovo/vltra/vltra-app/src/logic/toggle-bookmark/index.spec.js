import logic from '..'
import { database, models } from 'vltra-data'
import jwt from 'jsonwebtoken'

const { User, Post } = models

const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - toggle bookmarks', ()=>{
    beforeAll(() =>  database.connect(REACT_APP_DB_URL_TEST))

    let name, surname, nickname, email, password, bookmarks, voted, title, body, author, date, comments, votes, userId, postId, id
    
    beforeEach(async () => {
        await Post.deleteMany()
        await User.deleteMany()

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        bookmarks = []
        voted = []

        const user = await User.create({ name, surname, nickname: nickname.substr(0, 20), email, password, bookmarks, voted })
        userId = user.id

        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token

        title = `title-${Math.random()}`
        body = `body-${Math.random()}`
        author = userId
        date = new Date
        comments = []
        votes = []

        const post = await Post.create({title , body, author, date, comments, votes})
        postId = post.id
    })

    it('should succeed on correct push', async () => {
        const result = await logic.toggleBookmark(postId)
        
        expect(result).toBeTruthy()
        expect(result.message).toBe('bookmark correctly toggled')

        const user = await User.findById(userId)
        
        expect(user.bookmarks[0].toString()).toBe(postId)
    })

    it('should succeed on correct delete', async () => {
        const user = await User.findById(userId)

        user.bookmarks.push(postId)
        await user.save()
        
        const result = await logic.toggleBookmark(postId)
        expect(result).toBeTruthy()
        expect(result.message).toBe('bookmark correctly toggled')
    })

    it('should fail on wrong PostId', async() => {
        const wrongPostId = "5d73952803f75b35e0b8d85e"
        try{
            const comment = await logic.toggleBookmark(wrongPostId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`post with id ${wrongPostId} not found`)
        }
    })

    it('should fail on empty postId', async () => {
        
        try{
            await logic.toggleBookmark('')
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`postId with value  is not a valid ObjectId`)
        }
    })
    it('should fail on undefined postId', async () => {
        
        try{
            await logic.toggleBookmark(undefined)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`postId with value undefined is not a valid ObjectId`)
        }
    })
    it('should fail on wrong postId data type', async () => {
        
        try{
            await logic.toggleBookmark(123)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`postId with value 123 is not a valid ObjectId`)
        }
    })

    afterAll(() => database.disconnect())
})