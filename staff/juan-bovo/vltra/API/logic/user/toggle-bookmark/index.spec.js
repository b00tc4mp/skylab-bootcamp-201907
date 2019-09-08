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

    after(() => database.disconnect())
})