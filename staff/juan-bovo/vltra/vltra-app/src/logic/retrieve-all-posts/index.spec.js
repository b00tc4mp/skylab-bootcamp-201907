import retrieveAllPosts from '.'

const { random } = Math
const { database, models: { User, Post } } = require('vltra-data')

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - retrieve all posts', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let title, body, author, date, comments, votes, postId,
    title2, body2, date2, comments2, votes2, postId2, 
    title3, body3, date3, comments3, votes3, postId3,
    title4, body4, date4, comments4, votes4, postId4,
    authorId, authorId2

    beforeEach(async () => {
        await User.deleteMany()
        await Post.deleteMany()

        let name, surname, nickname, email, password, bookmarks, voted,
        name2, surname2, nickname2, email2, password2, bookmarks2, voted2
        
        name = `name-${Math.random()}`
        surname = `surname-${Math.random()}`
        nickname = `nickname-${Math.random()}`
        email = `email-${Math.random()}@email.com`
        password = `123-${Math.random()}`
        bookmarks = []
        votes = []

        name2 = `name-${Math.random()}`
        surname2 = `surname-${Math.random()}`
        nickname2 = `nickname-${Math.random()}`
        email2 = `email-${Math.random()}@email.com`
        password2 = `123-${Math.random()}`
        bookmarks2 = []
        votes2 = []
        
        const user = await User.create({ name, surname, nickname : nickname.substr(0, 20), email, password, bookmarks, voted })
        authorId = user.id
        
        const user2 = await User.create({ name: name2, surname:surname2, nickname:nickname2.substr(0, 20), email:email2, password:password2, bookmarks:bookmarks2, voted:voted2 })
        authorId2 = user2.id

        title = `title-${Math.random()}`
        body = `body-${Math.random()}`
        //author = authorId
        date = new Date
        comments = []
        votes = []

        title2 = `title-${Math.random()}`
        body2 = `body-${Math.random()}`
        //author2 = authorId
        date2 = new Date
        comments2 = []
        votes2 = []

        title3 = `title-${Math.random()}`
        body3 = `body-${Math.random()}`
        //author3 = authorId2
        date3 = new Date
        comments3 = []
        votes3 = []

        title4 = `title-${Math.random()}`
        body4 = `body-${Math.random()}`
        //author4 = authorId2
        date4 = new Date
        comments4 = []
        votes4 = []



        const post = await Post.create({title , body, author: authorId, date, comments, votes})
        postId = post.id

        const post2 = await Post.create({ title : title2 , body : body2, author : authorId, date : date2, comments : comments2, votes : votes2 })
        postId2 = post2.id

        const post3 = await Post.create({ title : title3 , body : body3, author : authorId2, date : date3, comments : comments3, votes : votes3 })
        postId3 = post3.id

        const post4 = await Post.create({ title : title4 , body : body4, author : authorId2, date : date4, comments : comments4, votes : votes4 })
        postId4 = post4.id
    })

    it('should succeed on correct id', async () => {
        const allPosts = await retrieveAllPosts()
        debugger
        expect(allPosts.posts).toBeDefined()
        expect(allPosts.posts.length).toBe(4)
    })

    it('should fail if there are no posts', async () => {
        await Post.deleteMany()
        
        try {
            const allPosts = await retrieveAllPosts()
            throw new Error('should not reach this point')
        }catch(error){
            expect(error).toBeTruthy()
            expect(error.message).toBe(`there are no post to retrieve`)
    }
    })

    afterAll(() => database.disconnect())
})