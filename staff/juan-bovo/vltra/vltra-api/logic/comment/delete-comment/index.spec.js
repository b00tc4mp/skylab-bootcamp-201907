require('dotenv').config()

const { expect } = require('chai')
const deleteComment = require('.')
const { database, models: { User, Post, Comment } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - retrieve user posts', () => {
    before(() =>  database.connect(DB_URL_TEST))
    let commentAuthor, commentBody1, commentBody2, commentBody3, commentBody4, commentDate, postId, postId2, postId3, userId, commentId1, commentId2, commentId3, commentId4

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
        
        const user = await User.create({ name, surname, nickname:nickname.substr(0, 20), email, password, bookmarks, voted })
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
        commentId1 = comment1.id

        const comment2 = new Comment({commentAuthor, commentBody : commentBody2, commentDate})
        commentId2 = comment2.id

        const comment3 = new Comment({commentAuthor, commentBody : commentBody3, commentDate})
        commentId3 = comment3.id

        const comment4 = new Comment({commentAuthor, commentBody : commentBody4, commentDate})
        commentId4 = comment4.id

        post.comments.push(comment1, comment2, comment3)
        post2.comments.push(comment4)

        await post.save()
        await post2.save()

    })

    it('should succesfully delete a comment', async ()  =>{
        const commentToDelete = await deleteComment(commentId2, postId)
        expect(commentToDelete).not.to.exist

        const post = await Post.findById(postId)
        expect(post.comments.length).to.be.equal(2)
        expect(post.comments[0].id).to.be.equal(commentId1)
        expect(post.comments[1].id).to.be.equal(commentId3)
        expect(post.comments[2]).not.to.exist
        
        const commentDeleted = await Comment.findById(commentId2)
        
        expect(commentDeleted).not.to.exist        
    })

    it('should fail unexistant postId', async () => {
        const wrongPostId = '5d72794a24912c10b5c089e1'
        
        try{
            const comment = await deleteComment(commentId1, wrongPostId)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`post with id ${wrongPostId} does not exists`)
        }
    })

    it('should fail on wrong wrongCommentId', async () => {
        const wrongCommentId = '5d72794a24912c10b5c089e1'
        
        try{
            const comment = await deleteComment(wrongCommentId, postId)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentId with value ${wrongCommentId} not found`)
        }
    })

    it('should fail on empty postId', async () => {
        
        try{
            const comment = await deleteComment(commentId1, '')
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value  is not a valid ObjectId`)
        }
    })

    it('should fail on undefined postId', async () => {
        
        try{
            const comment = await deleteComment(commentId1, undefined)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value undefined is not a valid ObjectId`)
        }
    })

    it('should fail on wrong postId data type', async () => {
        
        try{
            const comment = await deleteComment(commentId1, 123456)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`postId with value 123456 is not a valid ObjectId`)
        }
    })

    it('should fail on empty commentId', async () => {
        
        try{
            const comment = await deleteComment('', postId)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentId with value  is not a valid ObjectId`)
        }
    })

    it('should fail on undefined commentId', async () => {
        
        try{
            const comment = await deleteComment(undefined, postId)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentId with value undefined is not a valid ObjectId`)
        }
    })

    it('should fail on wrong commentId data type', async () => {
        
        try{
            const comment = await deleteComment(123456, postId)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentId with value 123456 is not a valid ObjectId`)
        }
    })

    after(() => database.disconnect())
})