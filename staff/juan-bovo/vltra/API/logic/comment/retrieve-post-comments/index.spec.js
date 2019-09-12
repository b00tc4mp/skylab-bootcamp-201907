require('dotenv').config()

const { expect } = require('chai')
const retrievePostsComments = require('.')
const { database, models: { User, Post, Comment } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve user posts', () => {
    before(() =>  database.connect(DB_URL_TEST))
    let commentAuthor, commentBody1, commentBody2, commentBody3, commentBody4, commentDate, postId, postId2, postId3, userId

    beforeEach(async () => {
        await User.deleteMany()
        await Post.deleteMany()
        await Comment.deleteMany()

        let name, surname, nickname, email, password, bookmarks, voted
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        bookmarks = []
        voted = []
        
        const user = await User.create({ name, surname, nickname, email, password, bookmarks, voted })
        userId = user.id


        let title, body, author, date, comments, votes,
        title2, body2, date2, comments2, votes2,
        title3, body3, date3, comments3, votes3
        
        title = `title-${Math.random()}`
        body = `body-${Math.random()}`
        author = userId
        date = new Date
        comments = []
        votes = []

        title2 = `title-${Math.random()}`
        body2 = `body-${Math.random()}`
        author2 = userId
        date2 = new Date
        comments2 = []
        votes2 = []

        title3 = `title-${Math.random()}`
        body3 = `body-${Math.random()}`
        author3 = userId
        date3 = new Date
        comments3 = []
        votes3 = []

        const post = await Post.create({title , body, author, date, comments, votes})
        postId = post.id

        const post2 = await Post.create({ title : title2 , body : body2, author : author2, date : date2, comments : comments2, votes : votes2 })
        postId2 = post2.id

        const post3 = await Post.create({ title : title3 , body : body3, author : author3, date : date3, comments : comments3, votes : votes3 })
        postId3 = post3.id
        
        commentAuthor = userId
        commentBody1 = `commentBody-${Math.random()}`
        commentBody2 = `commentBody-${Math.random()}`
        commentBody3 = `commentBody-${Math.random()}`
        commentBody4 = `commentBody-${Math.random()}`
        commentDate = new Date


        const comment1 = new Comment({commentAuthor, commentBody : commentBody1, commentDate})

        const comment2 = new Comment({commentAuthor, commentBody : commentBody2, commentDate})

        const comment3 = new Comment({commentAuthor, commentBody : commentBody3, commentDate})

        const comment4 = new Comment({commentAuthor, commentBody : commentBody4, commentDate})

        post.comments.push(comment1, comment2, comment3)
        post2.comments.push(comment4)

        await post.save()
        await post2.save()

    })

    it('should retrieve all the comments for a post', async() =>{
        const postComments = await retrievePostsComments(postId)
        
        expect(postComments).to.exist
        expect(postComments.length).to.equal(3)
    })

    it('should retrieve all the comments for two different post', async() =>{
        const postComments = await retrievePostsComments(postId)
        const postComments2 = await retrievePostsComments(postId2)
        
        expect(postComments).to.exist
        expect(postComments.length).to.equal(3)

        expect(postComments2).to.exist
        expect(postComments2.length).to.equal(1)
    })

    it('should retrieve no comments for a post withous comments', async() =>{
        const postWithNoComments = await retrievePostsComments(postId3)
        expect(postWithNoComments).to.exist
        expect(postWithNoComments.length).to.equal(0)
    })

    it('should fail on wrong postId', async() =>{
        const wrongPostId = '5d72794a24912c10b5c089e1' //--> 5d72794a24914c10b5c089e1

        try{
            const postComments = await retrievePostsComments(wrongPostId)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`post with id ${wrongPostId} does not exist`)
        }
    })

    it('should fail on empty postId', async () => {
        
        try{
            const comment = await retrievePostsComments('')
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value  is not a valid ObjectId`)
        }
    })

    it('should fail on undefined postId', async () => {
        
        try{
            const comment = await retrievePostsComments(undefined)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value undefined is not a valid ObjectId`)
        }
    })

    it('should fail on wrong postId data type', async () => {
        
        try{
            const comment = await retrievePostsComments(123)
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value 123 is not a valid ObjectId`)
        }
    })

    after(() => database.disconnect())
})