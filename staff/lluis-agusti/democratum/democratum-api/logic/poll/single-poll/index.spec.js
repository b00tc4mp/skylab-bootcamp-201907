require('dotenv').config()
const{ env : { DB_URL_TEST } } = process
const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose, database } = require('democratum-data')
const { User, Poll } = models
const bcrypt = require('bcryptjs')


describe('logic - retrieve single  poll', () => {
    before(() =>  mongoose.connect(DB_URL_TEST, { useNewUrlParser: true }))

    let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, pollId

    beforeEach(async() => {

        cityId = `NEWPOOOOOOLL-${Math.random()}`
        authorId = `authorid-${Math.random()}`
        question = `question-${Math.random()}`
        optionA = `optiona-${Math.random()}`
        optionB = `optionb-${Math.random()}@domain.com`
        description = `email@-${Math.random()}.com`
        expiryDate = new Date()
        imagePoll = `password-${Math.random()}`
        positives = 1
        negatives = 1
        pollStatus = 'pending'

        const poll = await Poll.create({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus })

        pollId = poll.id
    })

    it('should succeed on correct data', async() =>{
        const poll = await logic.singlePoll(pollId)
        
        expect(poll).to.exist
        expect(poll.cityId).to.equal(cityId)
        expect(poll.authorId).to.equal(authorId)
        expect(poll.question).to.equal(question)
        expect(poll.optionA).to.equal(optionA)
        expect(poll.optionB).to.equal(optionB)
        expect(poll.description).to.equal(description)
        expect(poll.expiryDate.toDateString()).to.equal(expiryDate.toDateString())
        expect(poll.imagePoll).to.equal(imagePoll)
        expect(poll.positives).to.equal(Number(positives))
        expect(poll.negatives).to.deep.equal(Number(negatives))
        expect(poll.pollStatus).to.equal('pending')
    })



    it('should fail on empty pollId', () =>
    expect(() =>
    logic.singlePoll('')
    ).to.throw('pollId is empty or blank')
    )

    it('should fail on undefined pollId', () =>
        expect(() =>
        logic.singlePoll(undefined)
        ).to.throw(`pollId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
    expect(() =>
    logic.singlePoll(124)
    ).to.throw(`pollId with value 124 is not a string`)
    )

    after(() => mongoose.disconnect())
})