require('dotenv').config()

const { expect } = require('chai')
const deletePost = require('.')
const { database, models: { User, Post } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process


describe('logic - delete post', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let title, body, author, date, comments, votes, userId, postId

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

    it('should succeed on deleting an existing post', async () => {
        const post = await deletePost(postId, userId)
        
        expect(post).not.to.exist

        const postQuery = await Post.findById(postId)

        expect(postQuery).not.to.exist

    })

    it('should fail on wrong post id', async() => {
        const wrongPostId = '5d71070c887d12667c6095cc'

        try{
            const post = await deletePost(wrongPostId, userId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`post with id ${wrongPostId} does not exist`)
            }
    })

    it('should fail on wrong post id', async() => {
        const wrongUserId = '5d71070c887d12667c6095cc'

        try{
            const post = await deletePost(postId, wrongUserId)
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).to.exist
                expect(error.message).to.equal(`postId ${postId} does not belong to userId ${wrongUserId}`)
            }
    })

    it('should fail on empty postId', () =>
        expect(() =>
            deletePost('', userId)
        ).to.throw('postId with value  is not a valid ObjectId')
    )
    it('should fail on undefined postId', () =>
        expect(() =>
            deletePost(undefined, userId)
        ).to.throw(`postId with value undefined is not a valid ObjectId`)
    )
    it('should fail on wrong postId data type', () =>
        expect(() =>{
            deletePost(123, userId)
        }
        ).to.throw(`postId with value 123 is not a valid ObjectId`)
    )

    it('should fail on empty userId', () =>
        expect(() =>
            deletePost(postId, '')
        ).to.throw('userId with value  is not a valid ObjectId')
    )

    it('should fail on undefined userId', () =>
        expect(() =>
            deletePost(postId, undefined)
        ).to.throw(`userId with value undefined is not a valid ObjectId`)
    )

    it('should fail on wrong userId data type', () =>
        expect(() =>{
            deletePost(postId, 123)
        }
        ).to.throw(`userId with value 123 is not a valid ObjectId`)
    )

    after(() => database.disconnect())
})