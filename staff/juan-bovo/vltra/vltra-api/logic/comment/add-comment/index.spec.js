require('dotenv').config()

const { expect } = require('chai')
const addComment = require('.')
const { database, models: { User, Post, Comment } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - add comment to a post', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let commentAuthor, commentBody, commentDate, postId, userId

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

        let title, body, author, date, comments, votes

        title = `title-${Math.random()}`
        body = `body-${Math.random()}`
        author = userId
        date = new Date
        comments = []
        votes = []

        const post = await Post.create({title , body, author, date, comments, votes})
        postId = post.id
        

        commentAuthor = userId
        commentBody = `commentBody-${Math.random()}`
    })

    it('should add a comment on correct data', async () => {
        const comment = await addComment(postId, commentAuthor, commentBody)
        
        const commentId = comment
        
        const post = await Post.findById(postId)
        
        expect(post.comments).to.exist
        expect(post.comments.length).to.equal(1)
        expect(post.comments[0].id.toString()).to.equal(commentId)
        expect(post.comments[0].commentAuthor.toString()).to.equal(commentAuthor)
        expect(post.comments[0].commentBody).to.equal(commentBody)
        expect(post.comments[0].commentDate).to.exist
    })

    it('should fail if commentBody is larger than 500 chars', async () => {
        const largerBody ='83vZi1r0qqHKMcvMf0kKj5vDKfa8tnohh180XduYZYWww0GSjj7ldu4cOc9dZVIa0eaoA0BFehS0hYkF7gv8fOcOMA2sRV2DaI70SD9WD2m5kDEaHIjiiDsHy7QcRIByvvhAmgF8ACZEcMyC11L5eM28kEXH9Uhk7yND4ePpMNlvDbEhkvcN3IER71Pu3FHSnUM79fMBaXKmo25I7OfSNj3jt49cJEj2V4T2HoRRT9kdVfxeEQt1RrP3hGagcKwvDxdtU3W7Dyx8vpNI828KYp1f7EDSoVxcSUqUXHnkqCM3A3psphSiTKJnTsyiAhk5VOQr5W1MeyI1RhkheumphNjHv3UgXhehCadJaxF3i43nI1PkhovCNSxWXxCsJg7I4uC0ZUhCMymZEFjR8Xweg5ZvXW5gpodXL27lQlWfl2b9225fxhAl4APcuxqAOIYLHiYqJ1kXgnFKNSGd9ckNhUFvSPYO81FsS1vZXpdx7juLk6XOXl1HI'
        
        try{
            const comment = await addComment(postId, commentAuthor, largerBody)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal('comments larger than 500 chars are not allowed')
        }
    })

    it('should fail unexistant postId', async () => {
        const wrongPostId = '5d72794a24912c10b5c089e1' //--> 5d72794a24914c10b5c089e1
        
        try{
            const comment = await addComment(wrongPostId, commentAuthor, commentBody)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`post with id ${wrongPostId} does not exists`)
        }
    })

    it('should fail on empty commentAuthor', async () => {
        
        try{
            const comment = await addComment(postId, '', commentBody)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentAuthor with value  is not a valid ObjectId`)
        }
    })

    it('should fail on undefined commentAuthor', async () => {
        
        try{
            const comment = await addComment(postId, undefined, commentBody)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentAuthor with value undefined is not a valid ObjectId`)
        }
    })

    it('should fail on wrong commentAuthor data type', async () => {
        
        try{
            const comment = await addComment(postId, 123, commentBody)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentAuthor with value 123 is not a valid ObjectId`)
        }
    })

    it('should fail on empty commentBody', async () => {
        
        try{
            const comment = await addComment(postId, commentAuthor, '')
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentBody is empty or blank`)
        }
    })

    it('should fail on undefined commentBody', async () => {
        
        try{
            const comment = await addComment(postId, commentAuthor, undefined)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentBody with value undefined is not a string`)
        }
    })

    it('should fail on wrong commentBody data type', async () => {
        
        try{
            const comment = await addComment(postId, commentAuthor, 123)
            //throw new Error('should not reach this point')
        }catch(error){
            expect(error).to.exist
            expect(error.message).to.equal(`commentBody with value 123 is not a string`)
        }
    })

    after(() => database.disconnect())
})