const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const bcrypt = require('bcryptjs')
const { User, Poll } = models

describe('logic - create new poll', () => {

    before(() =>  mongoose.connect('mongodb://localhost/democratum-test', { useNewUrlParser: true }))
        
    let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, id

    beforeEach(async () => {

        //await Poll.deleteMany()

        cityId = `cityid-${Math.random()}`
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

    })

    it('should succeed on correct data', async () => {
        const result = await logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, id )
            
        expect(result).to.exist

        const poll = await Poll.findOne({ id })
    
        expect(poll).to.exist
        expect(poll.cityId).to.equal(cityId)
        expect(poll.authorId).to.equal(authorId)
        expect(poll.question).to.equal(question)
        expect(poll.optionA).to.equal(optionA)
        expect(poll.optionB).to.equal(optionB)
        expect(poll.description).to.equal(description)
        //expect(poll.expiryDate).to.equal(expiryDate)
        expect(poll.imagePoll).to.equal(imagePoll)
        expect(poll.positives).to.equal(Number(positives))
        expect(poll.negatives).to.deep.equal(Number(negatives))
        expect(poll.pollStatus).to.equal('pending')

    })

    after(() => mongoose.disconnect())
})