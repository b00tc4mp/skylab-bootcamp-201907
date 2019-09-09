require('dotenv').config()

const { expect } = require('chai')
const toggleBookmark = require('.')
const { database, models: { User, Post } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - toggle bookmark', () => {
    before(() => database.connect(DB_URL_TEST))

    let name, surname, nickname, email, password, bookmarks, voted, title, body, author, date, comments, votes, userId, postId
    
    beforeEach(async () => {debugger
        await Post.deleteMany()
        await User.deleteMany()

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random}`
        email = `email-${Math.random()}@domain.com`
        password = `password-${Math.random()}`
        bookmarks = []
        voted = []

        const user = await User.create({ name, surname, nickname, email, password, bookmarks, voted })
        userId = user.id

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
        const result = await toggleBookmark(userId, postId)
            expect(result).to.exist
            expect(result.length).to.equal(1) 
            expect(result[0].toString()).to.equal(postId)
    })

    it('should succeed on correct delete', async () => {
        const user = await User.findById(userId)

        user.bookmarks.push(postId)
        await user.save()
        
        const result = await toggleBookmark(userId, postId)
        expect(result).to.exist
        expect(result.length).to.equal(0) 
    })

    it('should fail on wrong userId', async() => {
        const wrongUserId = "5d73b6051b33294ec553d343"
        try{
            const comment = await toggleBookmark(wrongUserId, postId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`user with id ${wrongUserId} not found`)
        }
    })

    it('should fail on wrong wrongPostId', async() => {
        const wrongPostId = "5d73952803f75b35e0b8d85e"
        try{
            const comment = await toggleBookmark(userId, wrongPostId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`post with id ${wrongPostId} not found`)
        }
    })

    it('should fail on empty userId', async () => {
        
        try{
            await toggleBookmark('', postId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value  is not a valid ObjectId`)
        }
    })
    it('should fail on undefined userId', async () => {
        
        try{
            await toggleBookmark(undefined, postId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value undefined is not a valid ObjectId`)
        }
    })
    it('should fail on wrong userId data type', async () => {
        
        try{
            await toggleBookmark(123, postId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 123 is not a valid ObjectId`)
        }
    })

    it('should fail on empty postId', async () => {
        
        try{
            await toggleBookmark(userId, '')
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value  is not a valid ObjectId`)
        }
    })
    it('should fail on undefined postId', async () => {
        
        try{
            await toggleBookmark(userId, undefined)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value undefined is not a valid ObjectId`)
        }
    })
    it('should fail on wrong postId data type', async () => {
        
        try{
            await toggleBookmark(userId, 123)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value 123 is not a valid ObjectId`)
        }
    })

    after(() => database.disconnect())
})