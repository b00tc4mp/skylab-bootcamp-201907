require('dotenv').config()

const { expect } = require('chai')
const createPost = require('.')
const { database, models: { User, Post } } = require('vltra-data')

const { env: { DB_URL_TEST }} = process

describe('logic - create post', () => {
    before(() =>  database.connect(DB_URL_TEST))

    let title, body, author, date, comments, votes

    beforeEach(async () => {
        await Post.deleteMany()
        await User.deleteMany()

        let name, surname, nickname, email, password, bookmarks, voted

        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        bookmarks = []
        voted= []

        const user = await User.create({ name, surname, nickname, email, password, bookmarks, voted })
            
        //id = user.id

        title = `title-${Math.random()}`
        body = `body-${Math.random()}`
        author = user.id
        date = new Date
        comments = []
        votes = []
    })

    it('should succeed creating a post on correct data', async () => {
        const result = await createPost(title, body, author, date, comments, votes)
        postId = result
        expect(postId).to.exist

        const post = await Post.findOne({body})
        
        expect(post.id).to.equal(postId)
        expect(post.title).to.equal(title)
        expect(post.body).to.equal(body)
        expect(post.author.toString()).to.equal(author)
        expect(post.date).to.exist
        expect(post.comments).to.be.an('array')
        expect(post.votes).to.be.an('array')
    })

    it('should fail if post has already been published', async () => {
        
        const firstTry = await Post.create({title, body, author, date, comments, votes})
            try{
                await createPost(title, body, author, date, comments, votes)
                throw new Error('should not reach this point')
            }catch(error) {
                    expect(error).to.exist
                    expect(error.message).to.equal(`post with content ${body} already exists`)
                }
    })

    it('should fail on empty title', () => 
        expect(() => 
            createPost('', body, author, date, comments, votes)
    ).to.throw('title is empty or blank')
    )
    it('should fail on undefined title', () => 
        expect(() => 
            createPost(undefined, body, author, date, comments, votes)
    ).to.throw(`title with value undefined is not a string`)
    )
    it('should fail on wrong title data type', () => 
        expect(() => 
            createPost(123, body, author, date, comments, votes)
    ).to.throw(`title with value 123 is not a string`)
    )

    it('should fail on empty body', () => 
        expect(() => 
            createPost(title, '', author, date, comments, votes)
    ).to.throw('body is empty or blank')
    )
    it('should fail on undefined body', () => 
        expect(() => 
            createPost(title, undefined, author, date, comments, votes)
    ).to.throw(`body with value undefined is not a string`)
    )
    it('should fail on wrong body data type', () => 
        expect(() => 
            createPost(title, 123, author, date, comments, votes)
    ).to.throw(`body with value 123 is not a string`)
    )

    it('should fail on empty author', () => 
        expect(() => 
            createPost(title, body, '', date, comments, votes)
    ).to.throw('author with value  is not a valid ObjectId')
    )
    it('should fail on undefined author', () => 
        expect(() => 
            createPost(title, body, undefined, date, comments, votes)
    ).to.throw(`author with value undefined is not a valid ObjectId`)
    )
    it('should fail on wrong author data type', () => 
        expect(() => 
            createPost(title, body, 'author', date, comments, votes)
    ).to.throw(`author with value author is not a valid ObjectId`)
    )

    it('should fail on empty date', () => 
        expect(() => 
            createPost(title, body, author, '', comments, votes)
    ).to.throw('date with value  is not a date')
    )
    it('should fail on undefined date', () => 
        expect(() => 
            createPost(title, body, author, undefined, comments, votes)
    ).to.throw(`date with value undefined is not a date`)
    )
    it('should fail on wrong date data type', () => 
        expect(() => 
            createPost(title, body, author, 123456, comments, votes)
    ).to.throw(`date with value 123456 is not a date`)
    )

    it('should fail on undefined comments', () => 
        expect(() => 
            createPost(title, body, author, date, undefined, votes)
    ).to.throw(`comments with value undefined is not an array`)
    )
    it('should fail on wrong comments data type', () => 
        expect(() => 
            createPost(title, body, author, date, 'comments', votes)
    ).to.throw(`comments with value comments is not an array`)
    )

    it('should fail on undefined votes', () => 
        expect(() => 
            createPost(title, body, author, date, comments, undefined)
    ).to.throw(`votes with value undefined is not an array`)
    )
    it('should fail on wrong votes data type', () => 
        expect(() => 
            createPost(title, body, author, date, comments, 'votes')
    ).to.throw(`votes with value votes is not an array`)
    )

    after(() => database.disconnect())
})