import logic from '..'
import { database, models } from 'vltra-data'
import jwt from 'jsonwebtoken'

const { User, Post } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST
const REACT_APP_JWT_SECRET_TEST = process.env.REACT_APP_JWT_SECRET_TEST

describe('logic - vote post', () => {
    beforeAll(() =>  database.connect(REACT_APP_DB_URL_TEST))

    let userId, postId, id

    beforeEach(async () => {
        await User.deleteMany()
        await Post.deleteMany()

        let name, surname, nickname, email, password, bookmarks, voted, title, body, author, date, comments, votes
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        bookmarks = []
        voted = []
        
        const user = await User.create({ name, surname, nickname: nickname.substr(0, 20), email, password, bookmarks, voted })
        userId = user.id

        id = user.id

        const token = jwt.sign({ sub: id }, REACT_APP_JWT_SECRET_TEST)

        logic.__token__ = token
        
        title = `title-${Math.random()}`
        body = `body-${Math.random()}`
        author = user.id
        date = new Date
        comments = []
        votes = []

        const post = await Post.create({title, body, author, date, comments, votes})
        postId = post.id  
    })

    it('should succeed on adding a vote to a post', async () => {
        const userVote = 2
        await logic.votePost(postId, userVote)

        const post = await Post.findById(postId)
        
        expect(post.votes[0]).toBe(2)

        const user = await User.findById(userId)
        
        expect(user.voted[0].toString()).toBe(postId)
    })

    it('should fail on post already voted by the same user', async () => {
        //userVote = 5
        await logic.votePost(postId, 5)
        
        try{
            await logic.votePost(postId, 3)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`postId with value ${postId} has been already voted by this user`)
        }
    })

    it('should fail on userVote is bigger than 5', async () => {
        const userVote = 6
        
        try{
            await logic.votePost(postId, userVote)
            throw new Error('should not reach this point')
        }catch(error){
            debugger
            expect(error).toBeTruthy()
            expect(error.message).toBe(`userVote min value = 1, max value = 5`)
        }
    })

    it('should fail on userVote is lower than 1', async () => {
        const userVote = 0
        
        try{
            await logic.votePost(postId, userVote)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`userVote min value = 1, max value = 5`)
        }
    })

    it('should fail on userVote is negative', async () => {
        const userVote = -2
        
        try{
            await logic.votePost(postId, userVote)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`userVote min value = 1, max value = 5`)
        }
    })

    it('should fail on wrong PostId', async() => {
        const wrongPostId = "5d73952803f75b35e0b8d85e"
        try{
            await logic.votePost(wrongPostId, 2)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`post with id ${wrongPostId} does not exist`)
        }
    })

    it('should fail on empty postId', async () => {
        try{
            await logic.votePost('', 3)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`postId with value  is not a valid ObjectId`)
        }
    })
    it('should fail on undefined postId', async () => {
        try{
            await logic.votePost(undefined, 4)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`postId with value undefined is not a valid ObjectId`)
        }
    })
    it('should fail on wrong postId data type', async () => {
        try{
            await logic.votePost(123, 2)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`postId with value 123 is not a valid ObjectId`)
        }
    })

    it('should fail on empty userVote', async () => {
        try{
            await logic.votePost(postId, '')
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`userVote with value  is not a valid number`)
        }
    })
    it('should fail on undefined userVote', async () => {
        try{
            await logic.votePost(postId, undefined)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`userVote with value undefined is not a valid number`)
        }
    })
    it('should fail on wrong userVote data type', async () => {
        try{
            await logic.votePost(postId, '3')
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`userVote with value 3 is not a valid number`)
        }
    })

    afterAll(() => database.disconnect())
})