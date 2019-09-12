require('dotenv').config()

const { expect } = require('chai')
const retrievePost = require('.')
const { database, models: { User, Post } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve post', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let title, body, author, date, comments, votes, postId

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
        
        title = `title-${Math.random()}`
        body = `body-${Math.random()}`
        author = user.id
        date = new Date
        comments = []
        votes = []

        const post = await Post.create({title, body, author, date, comments, votes})
        postId = post.id
        
    })

    it('should succeed on correct id', async () => {
        const post = await retrievePost(postId)

        expect(post).to.exist
        expect(post.id).to.equal(postId)
        expect(post.title).to.equal(title)
        expect(post.body).to.equal(body)
        expect(post.author.toString()).to.equal(author)
        expect(post.date).to.exist
        expect(post.comments).to.be.an('array')
        expect(post.votes).to.be.an('array')
    })

    it('should fail on wrong id', async () => {
        const wrongId = '5d71070c887d12667c6095aa'
        try{
            await retrievePost(wrongId) //--> 5d71070c887d12667c6095bb
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`post with id ${wrongId} does not exist`)
            }
    })

    it('should fail on empty id', () =>
        expect(() =>
            retrievePost('')
        ).to.throw('postId is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            retrievePost(undefined)
        ).to.throw(`postId with value undefined is not a string`)
    )

    it('should fail on wrong id data type', () =>
        expect(() =>
            retrievePost(123)
        ).to.throw(`postId with value 123 is not a string`)
    )

after(() => database.disconnect())
})