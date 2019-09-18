require('dotenv').config()
const{ env : { DB_URL_TEST } } = process
const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose, database } = require('democratum-data')
const { User, Poll } = models
const bcrypt = require('bcryptjs')

describe('logic - list all polls of a city', () => {

    before(() => mongoose.connect(DB_URL_TEST,  { useNewUrlParser: true }))

    let cityId0, fullname0, address0, documentId0, email0, imgDocId0, password0, participatedPolls0, proposedPolls0, userRole0    

    let cityId1, authorId1, question1, optionA1, optionB1, description1, expiryDate1, imagePoll1, positives1, negatives1, pollStatus1

    let cityId2, authorId2, question2, optionA2, optionB2, description2, expiryDate2, imagePoll2, positives2, negatives2, pollStatus2




    beforeEach(async () => {

        await Poll.deleteMany()

        cityId1 = '5d70f41b7d4edc12334851db'
        authorId1 = `LISTALL1-${Math.random()}`
        question1 = `LISTALL1-${Math.random()}`
        optionA1 = `LISTALL1-${Math.random()}`
        optionB1 = `LISTALL1-${Math.random()}`
        description1 = `LISTALL1-${Math.random()}`
        expiryDate1 = new Date
        imagePoll1 = `LISTALL1-${Math.random()}`
        positives1 = Math.random()
        negatives1 = Math.random()
        pollStatus1 = 'approved'

        cityId2 = '5d70f41b7d4edc12334851db'
        authorId2 = `LISTALL1-${Math.random()}`
        question2 = `LISTALL1-${Math.random()}`
        optionA2 = `LISTALL1-${Math.random()}`
        optionB2 = `LISTALL1-${Math.random()}`
        description2 = `LISTALL1-${Math.random()}`
        expiryDate2 = new Date
        imagePoll2 = `LISTALL1-${Math.random()}`
        positives2 = Math.random()
        negatives2 = Math.random()
        pollStatus2 = 'rejected'

        
        cityId0 = '5d70f41b7d4edc12334851db'
        fullname0 = `listall-${Math.random()}`
        address0 = `LISTALL1-${Math.random()}`
        documentId0 = `LISTALL1-${Math.random()}@domain.com`
        email0 = `LISTALL1@-${Math.random()}.com`
        imgDocId0 = `LISTALL1-${Math.random()}`
        password0 = `LISTALL1-${Math.random()}`
        userRole0 = 'citizen'

        const user0 = await User.create({cityId: cityId0, fullname: fullname0, address: address0, documentId: documentId0, email: email0, imgDocId: imgDocId0, password: await bcrypt.hash(password0, 10), participatedPolls: participatedPolls0, proposedPolls: proposedPolls0, userRole: userRole0})

        userId = user0.id


        const poll1 = await Poll.create({ cityId: cityId1, authorId: authorId1, question: question1, optionA: optionA1, optionB: optionB1, description: description1, expiryDate: expiryDate1, imagePoll: imagePoll1, positives: positives1, negatives: negatives1, pollStatus: pollStatus1 })

        pollId1 = poll1.id.toString()

        const poll2 = await Poll.create({ cityId: cityId2, authorId: authorId2, question: question2, optionA: optionA2, optionB: optionB2, description: description2, expiryDate: expiryDate2, imagePoll: imagePoll2, positives: positives2, negatives: negatives2, pollStatus: pollStatus2 })

        pollId2 = poll2.id.toString()

    })

    it('should succeed on correct data', async () =>{
        const polls = await logic.listAll(userId, '5d70f41b7d4edc12334851db')
        
                expect(polls).to.exist
                expect(polls[0]).to.exist


                expect(polls[0].cityId).to.equal(cityId1)
                expect(polls[0].authorId).to.equal(authorId1)
                expect(polls[0].question).to.equal(question1)
                expect(polls[0].optionA).to.equal(optionA1)
                expect(polls[0].optionB).to.equal(optionB1)
                expect(polls[0].description).to.equal(description1)
                expect(polls[0].expiryDate.toDateString()).to.equal(expiryDate1.toDateString())
                expect(polls[0].imagePoll).to.equal(imagePoll1)
                expect(polls[0].positives).to.deep.equal(positives1)
                expect(polls[0].negatives).to.equal(negatives1)
                expect(polls[0].pollStatus).to.equal(pollStatus1)

                expect(polls[1]).to.exist
                expect(polls[1].cityId).to.equal(cityId2)
                expect(polls[1].authorId).to.equal(authorId2)
                expect(polls[1].question).to.equal(question2)
                expect(polls[1].optionA).to.equal(optionA2)
                expect(polls[1].optionB).to.equal(optionB2)
                expect(polls[1].description).to.equal(description2)
                expect(polls[1].expiryDate.toDateString()).to.equal(expiryDate2.toDateString())
                expect(polls[1].imagePoll).to.equal(imagePoll2)
                expect(polls[1].positives).to.equal(positives2)
                expect(polls[1].negatives).to.equal(negatives2)
                expect(polls[1].pollStatus).to.equal(pollStatus2)
    })

it('should fail on empty userId', () =>
    expect(() =>
        logic.listAll('', '5d70f41b7d4edc12334851db')
    ).to.throw('userId is empty or blank')
)

it('should fail on undefined userId', () =>
    expect(() =>
        logic.listAll(undefined, '5d70f41b7d4edc12334851db')
    ).to.throw(`userId with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.listAll(123, '5d70f41b7d4edc12334851db')
    ).to.throw(`userId with value 123 is not a string`)
)

it('should fail on empty targetCityId', () =>
    expect(() =>
        logic.listAll(userId, '')
    ).to.throw('targetCityId is empty or blank')
)

it('should fail on undefined targetCityId', () =>
    expect(() =>
        logic.listAll(userId, undefined)
    ).to.throw(`targetCityId with value undefined is not a string`)
)

it('should fail on wrong data type', () =>
    expect(() =>
        logic.listAll(userId, 123)
    ).to.throw(`targetCityId with value 123 is not a string`)
)
    
   
    after(() => mongoose.disconnect())
})