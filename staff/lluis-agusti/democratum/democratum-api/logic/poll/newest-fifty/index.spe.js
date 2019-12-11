require('dotenv').config()
const{ env : { DB_URL_TEST } } = process
const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose, database } = require('democratum-data')
const { User, Poll } = models
const bcrypt = require('bcryptjs')

describe.only('logic - list newest fifty polls', () => {

    before(() => mongoose.connect(DB_URL_TEST, {
        useNewUrlParser: true
    }))  

    let cityId1, authorId1, question1, optionA1, optionB1, description1, expiryDate1, imagePoll1, positives1, negatives1, pollStatus1

    let cityId2, authorId2, question2, optionA2, optionB2, description2, expiryDate2, imagePoll2, positives2, negatives2, pollStatus2

    beforeEach(async () => {

        await Poll.deleteMany()

        cityId1 = '5d70f41b7d4edc1233489990'
        authorId1 = `REJE-${Math.random()}`
        question1 = `REJE-${Math.random()}`
        optionA1 = `REJE-${Math.random()}`
        optionB1 = `REJE-${Math.random()}`
        description1 = `REJE-${Math.random()}`
        expiryDate1 = new Date
        imagePoll1 = `REJE-${Math.random()}`
        positives1 = 1000
        negatives1 = 1000
        pollStatus1 = 'approved'

        cityId2 = '5d70f41b7d4edc12334859991'
        authorId2 = `REJE-${Math.random()}`
        question2 = `REJE-${Math.random()}`
        optionA2 = `REJE-${Math.random()}`
        optionB2 = `REJE-${Math.random()}`
        description2 = `REJE-${Math.random()}`
        expiryDate2 = new Date
        imagePoll2 = `REJE-${Math.random()}`
        positives2 = 2000
        negatives2 = 2000
        pollStatus2 = 'approved'


        const poll1 = await Poll.create({ cityId: cityId1, authorId: authorId1, question: question1, optionA: optionA1, optionB: optionB1, description: description1, expiryDate: expiryDate1, imagePoll: imagePoll1, positives: positives1, negatives: negatives1, pollStatus: pollStatus1 })

        pollId1 = poll1.id.toString()

        const poll2 = await Poll.create({ cityId: cityId2, authorId: authorId2, question: question2, optionA: optionA2, optionB: optionB2, description: description2, expiryDate: expiryDate2, imagePoll: imagePoll2, positives: positives2, negatives: negatives2, pollStatus: pollStatus2 })

        pollId2 = poll2.id.toString()

    })

    it('should succeed on correct data', async () =>{
        const polls = await logic.newestFifty('approved')
  
            expect(polls).to.exist
            expect(polls[1]).to.exist
            //expect(polls).to.have.lengthOf(50)
    })

 it('should fail on empty status', () =>
    expect(() =>
        logic.newestFifty('')
    ).to.throw('status is empty or blank')
)

it('should fail on undefined status', () =>
    expect(() =>
        logic.newestFifty(undefined)
    ).to.throw(`status with value undefined is not a string`)
)
    
    after(() => mongoose.disconnect())
})

