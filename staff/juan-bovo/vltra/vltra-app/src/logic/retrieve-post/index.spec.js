import retrievePost from '.'

const { random } = Math
const { database, models: { User, Post } } = require('vltra-data')

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - retrieve post', () => {
    beforeAll(() =>  database.connect(REACT_APP_DB_URL_TEST))

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
        
        const user = await User.create({ name, surname, nickname : nickname.substr(0, 20), email, password, bookmarks, voted })
        
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

        expect(post).toBeTruthy
        
        expect(post.id).toBe(postId)
        expect(post.title).toBe(title)
        expect(post.body).toBe(body)
        expect(post.author.toString()).toBe(author)
        expect(post.date).toBeTruthy
        expect(post.comments instanceof Array).toBeTruthy
        expect(post.votes instanceof Array).toBeTruthy
    })

    it('should fail on wrong id', async () => {
        const wrongId = '5d71070c887d12667c6095aa'
        try{
            await retrievePost(wrongId) //--> 5d71070c887d12667c6095bb
            throw new Error('should not reach this point')
        }catch(error) {
                expect(error).toBeTruthy
                expect(error.message).toBe(`post with id ${wrongId} does not exist`)
            }
    })

    it('should fail on empty id', () =>
        expect(() =>
            retrievePost('')
        ).toThrow('postId is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            retrievePost(undefined)
        ).toThrow(`postId with value undefined is not a string`)
    )

    it('should fail on wrong id data type', () =>
        expect(() =>
            retrievePost(123)
        ).toThrow(`postId with value 123 is not a string`)
    )

    afterAll(() => database.disconnect())
})