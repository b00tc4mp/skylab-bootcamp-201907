require('dotenv').config()

const { expect } = require('chai')
const retrieveUserPosts = require('.')
const { database, models: { User, Post } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve user posts', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let title, body, author, date, comments, votes, postId, title2, body2, date2, comments2, votes2, postId2, authorId

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
        
        const user = await User.create({ name, surname, nickname, email, password, bookmarks, voted })
        
        authorId = user.id

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
        const userPosts = await retrieveUserPosts(authorId)

        expect(userPosts).to.exist
        expect(userPosts.length).to.equal(2)
    })

    it('should fail on wrong authorId', async () => {
        const fakeAuthorId = '5d71070c887d12667c6095cc'

        try{
            await retrieveUserPosts(fakeAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`user with id ${fakeAuthorId} does not exist`)
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
        
        const user2 = await User.create({ name: name2, surname:surname2, nickname:nickname2, email:email2, password:password2, bookmarks:bookmarks2, voted:voted2 })

        const noPostsAuthorId = user2.id

        try{
            await retrieveUserPosts(noPostsAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`author with authorId ${noPostsAuthorId} does not have any posts`)
            }
    })

    it('should fail on empty authorId', async () => {
        const emptyAuthorId = ''

        try{
            await retrieveUserPosts(emptyAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`authorId with value ${emptyAuthorId} is not a valid ObjectId`)
            }
    })

    it('should fail on undefined authorId', async () => {
        const undefinedAuthorId = undefined

        try{
            await retrieveUserPosts(undefinedAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`authorId with value ${undefinedAuthorId} is not a valid ObjectId`)
            }
    })

    it('should fail on wrong authorId data type', async () => {
        const wrongAuthorId = 123

        try{
            await retrieveUserPosts(wrongAuthorId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`authorId with value ${wrongAuthorId} is not a valid ObjectId`)
            }
    })

    after(() => database.disconnect())
})