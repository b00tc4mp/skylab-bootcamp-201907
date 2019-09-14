require('dotenv').config()

const { expect } = require('chai')
const votePost = require('.')
const { database, models: { User, Post } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - vote - post', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let userId, postId

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
        
        const user = await User.create({ name, surname, nickname: nickname.substr(0, 20), email, password, bookmarks, voted })
        userId = user.id
        
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
        await votePost(postId, userVote, userId)

        const post = await Post.findById(postId)

        expect(post.votes[0]).to.equal(2)

        const user = await User.findById(userId)

        expect(user.voted[0].toString()).to.equal(postId)
    })

    it('should fail on post already voted by the same user', async () => {
        //userVote = 5
        await votePost(postId, 5, userId)
        
        try{
            await votePost(postId, 3, userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value ${postId} has been already voted by this user`)
        }
    })

    it('should fail on userVote is bigger than 5', async () => {
        userVote = 6
        
        try{
            await votePost(postId, userVote, userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userVote min value = 1, max value = 5`)
        }
    })

    it('should fail on userVote is lower than 1', async () => {
        userVote = 0
        
        try{
            await votePost(postId, userVote, userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userVote min value = 1, max value = 5`)
        }
    })

    it('should fail on userVote is negative', async () => {
        userVote = -2
        
        try{
            await votePost(postId, userVote, userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userVote min value = 1, max value = 5`)
        }
    })

    it('should fail on wrong userId', async() => {
        const wrongUserId = "5d73b6051b33294ec553d343"
        try{
            await votePost(postId, 4, wrongUserId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`user with id ${wrongUserId} does not exist`)
        }
    })

    it('should fail on wrong PostId', async() => {
        const wrongPostId = "5d73952803f75b35e0b8d85e"
        try{
            await votePost(wrongPostId, 2, userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`post with id ${wrongPostId} does not exist`)
        }
    })

    it('should fail on empty userId', async () => {
        try{
            await votePost(postId, 3, '')
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value  is not a valid ObjectId`)
        }
    })
    it('should fail on undefined userId', async () => {
        try{
            await votePost(postId, 4, undefined)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value undefined is not a valid ObjectId`)
        }
    })
    it('should fail on wrong userId data type', async () => {
        try{
            await votePost(postId, 2, 123)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userId with value 123 is not a valid ObjectId`)
        }
    })

    it('should fail on empty postId', async () => {
        try{
            await votePost('', 3, userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value  is not a valid ObjectId`)
        }
    })
    it('should fail on undefined postId', async () => {
        try{
            await votePost(undefined, 4, userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value undefined is not a valid ObjectId`)
        }
    })
    it('should fail on wrong postId data type', async () => {
        try{
            await votePost(123, 2, userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value 123 is not a valid ObjectId`)
        }
    })

    it('should fail on empty userVote', async () => {
        try{
            await votePost(postId, '', userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userVote with value  is not a valid number`)
        }
    })
    it('should fail on undefined userVote', async () => {
        try{
            await votePost(postId, undefined, userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userVote with value undefined is not a valid number`)
        }
    })
    it('should fail on wrong userVote data type', async () => {
        try{
            await votePost(postId, '3', userId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`userVote with value 3 is not a valid number`)
        }
    })

    it('should fail on wrong userVote data type', () =>
       expect(() => votePost(postId, '3', userId)).to.throw(`userVote with value 3 is not a valid number`)
    )

    after(() => database.disconnect())
})

//validate number de userVote
//validate objectId de postId, userId