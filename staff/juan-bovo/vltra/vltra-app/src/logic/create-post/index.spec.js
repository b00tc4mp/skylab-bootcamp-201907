import createPost from '.'

const { random } = Math
const { database, models: { User, Post } } = require('vltra-data')

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

describe('logic - create post', () => {
    beforeAll(() => database.connect(REACT_APP_DB_URL_TEST))

    let title, body, author

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

        const user = await User.create({ name, surname, nickname : nickname.substr(0, 20), email, password, bookmarks, voted })
            
        //id = user.id

        title = `title-${Math.random()}`
        body = `body-${Math.random()}`
        author = user.id
    })

    it('should succeed creating a post on correct data', async () => {
        await createPost(title, body, author)

        const post = await Post.findOne({body})
        
        debugger
        expect(post.title).toBe(title)
        expect(post.body).toBe(body)
        expect(post.author.toString()).toBe(author)
        expect(post.date).toBeDefined()
        expect(post.comments instanceof Array).toBeTruthy
        expect(post.votes instanceof Array).toBeTruthy
    })

    it('should fail if post has already been published', async () => {
        const date = new Date
        const comments = []
        const votes = []
        
        const firstTry = await Post.create({title, body, author, date, comments, votes})
            try{
                await createPost('title', body, '5d74c89d6b50d08960730147', date, comments, votes)
                throw new Error('should not reach this point')
            }catch(error) {
                    expect(error).toBeTruthy()
                    expect(error.message).toBe(`post with content ${body} already exists`)
                }
    })

    it('should fail if body is larger than 2000 chars', async () => {
        const largeBody = 'v6fiOl95dWIfeneE7pvv9g0QYhV6oQpqigZ34yF3pfqma2vRQbjh1HVveoZzJqmWzAlSqLSH0S5j2v22jkohmnLaQhD4YxjyHVqPmgEPa3uxjdTRTnS0H1vt9W5Cs7oO9JQRXO9to9Pd7HSsFY2sNJ6IIUX7Lr3XidxgBbeVZP9WUUiOVEuSWZye9UTSHjcOBdAlyXDX5a98WTCGMB5SMn1H7nu9BVSbyy5j6K6COfIBFvwamu1wZPyMfLC7YBzz2Vsy8l9ogofoXtX16YmB6KUE7AB1BNusW2OQPwErmLZb3OzjkJMNswn5qYbiXigpAdTOsOEFBP1zO215l0KahzkcuHwZtZILxAbk3hJ81scyJUUTGPudVN1pQi6ycachNgP1gSH89EOoIGkazxc2rcUwb4vUzQFKJd9NYSRceuZTcB2DFEvFITYBcakclIrghAYlmrB1kX25hoiSUX41quFMNaZttOcmdvaB9bBAWWdvIVZ2JBL3RTSMKDavl1Aey9dflhjSEIKuqxd7SBF9G9hNio7h6OBw2fGhZaXOaLamvf20UOKg3bga1TyhLW7nfd7iaG5lrumvNCgGUOX2EwqDi78vvWrAllXw7N3L7XFAIZCnSfPzitulWQ643YbLRbyg2AvXudlafcFEzHQc5GLBhfipf05DC8JGN5Z9FMvmbZBFA7qGHGvcZW10hOwKNiezXgXiraHQadAls4sQTiuMMiARTG7tEAzKoiLMxQNMZKyvG3YG5XAzLyC8aZlY2wISnh8OvjGvYlJcdaJzC77IIJcuAS61KMMCMF6B2gpTuMaelAmb261cZ2hdvJCly6MaLSjAljGxv1GjhwOPdBXYFaI7BYBjWbiBIlaJWsXK0OMMQiRq6W13BklNIvgIyZVA4zxbuVfB6CzadlkPGIwFCMJ9lxEJn8jSlTsl6gg5bZezqNgQ41NbznqaM4VxdGTRggJNPOB6N0QrIdo1zbr9UHlg78UOg69DJC3H0XcxXUTf44KLORBCVpUGjSVufavBpqWhGScCgEsx0HLvXLBIpQQ9r8rxUE9SoIsVQHYcUcOupEBfQw7uDgEUTX4CobOZHI3cRIWMlFbTCZ4xJreuMNunc9UGUuBLIuxMPbSCIatZIeAQnrRnUUXAw4Z0LKLuj6smZp7PI9u5TLg2zKVedpnaSldbwzLzYK6FyQmuBzvKJSmFh91Wfg1luyyTCO6NHKiztb9PBvBopD2SOBgOyE1woB8I8MZlYoaOwEisSJ9I6BWDcg6mrDWxSpez8hXv8bGmLlRLyoKIZMtKyXR3Utzj5ui4xHb8wS5U5VfxRYGpbCjNGwze7p1yeKXvoNIWOvkg1uIbWE88HkoRf9dHVMeYFQcOnMl23CToeFijRo38VPkEb8Y0RoXylGsxFrI03q6VEuHsfDpsE4br74ofQNI1UsD5mRLw0JezmLZlyHCR7mgSjth5D3R5p9h2eVHWml9ScajZdH7psbIFNKHtMD07BTFkNCxS0lWiPVbc8p06AqluuFS1k5T6Za8gowQyecYBoMo5cSIKbqxtgk3wPRORZyE5vQ9OEX1gRLl4rX68xiNOcqIsIylxVLjUnHweM1XvFqdkmr1AlbNJ8y1TKgKeWNUlAUvTSzgN0Aoh0UwA0Z4olHqgV1dOQZD3ZpOx6Z6zxHMQ2184YDf2QN0wFOdlxVPfFnJfH6AbyKrOCylOAWiOEk8ojBDqXknLNGQ8Uont4gkLpCDh63PgVUVTt8vbPkzhXDAKwVAuaofU8QM72BZd1323ovTFNMCS3brM3ph5Hf7JFlcV3NbqSQmJzLuLmXxbeZOVN5AhjJ1DS6dFtVV3CuixEPa3cDnAbHL7NAT3Fir1MzMTN9I6LT0N7uaWW9Hy1qmiQDH7DfxnQU9PML75ctcCBOJcgY1Wt46oMKaRDU146CsiS6z9m52yFCBOpC5drwzVuXkqx8l6kDBIXrSMp8bIxemlhRNMHJUNWpBiqve44MRwg'

        try {
            await createPost(title, largeBody, author)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe(`post body is too long (max. 2000 characters)`)
        }
    })

    it('should fail if title is larger than 100 chars', async () => {
        const largeTitle = 'M3JqWyIXO19JpdiSJortiEERB8R2UpWF6Mo3XjCAeuLeol66arMXjgmhGPMkJXtA3x3eB4Bb6SWhp4pSkpR0wetJYTdK9pi8ods2U'

        try {
            await createPost(largeTitle, body, author)
            throw new Error('should not reach this point')
        } catch (error) {
            expect(error).toBeTruthy()
            expect(error.message).toBe(`title body is too long (max. 100 characters)`)
        }
    })

    it('should fail on empty title', () => 
        expect(() => 
            createPost('', body, author)
    ).toThrow('title is empty or blank')
    )
    it('should fail on undefined title', () => 
        expect(() => 
            createPost(undefined, body, author)
    ).toThrow(`title with value undefined is not a string`)
    )
    it('should fail on wrong title data type', () => 
        expect(() => 
            createPost(123, body, author)
    ).toThrow(`title with value 123 is not a string`)
    )

    it('should fail on empty body', () => 
        expect(() => 
            createPost(title, '', author)
    ).toThrow('body is empty or blank')
    )
    it('should fail on undefined body', () => 
        expect(() => 
            createPost(title, undefined, author)
    ).toThrow(`body with value undefined is not a string`)
    )
    it('should fail on wrong body data type', () => 
        expect(() => 
            createPost(title, 123, author)
    ).toThrow(`body with value 123 is not a string`)
    )

    it('should fail on empty author', () => 
        expect(() => 
            createPost(title, body, '')
    ).toThrow('author with value  is not a valid ObjectId')
    )
    it('should fail on undefined author', () => 
        expect(() => 
            createPost(title, body, undefined)
    ).toThrow(`author with value undefined is not a valid ObjectId`)
    )
    it('should fail on wrong author data type', () => 
        expect(() => 
            createPost(title, body, 'author')
    ).toThrow(`author with value author is not a valid ObjectId`)
    )

    afterAll(() => database.disconnect())
})