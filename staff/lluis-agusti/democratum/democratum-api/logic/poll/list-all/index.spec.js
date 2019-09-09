const logic = require('../../.')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const { Poll } = models

describe('logic - list all polls of a city', () => {

    before(() => mongoose.connect('mongodb://localhost/democratum-test', {
        useNewUrlParser: true
    }))

    let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, id


    beforeEach(async () => {
        cityId1 = `RETREVE1-${Math.random()}`
        authorId1 = `RETREVE1-${Math.random()}`
        question1 = `RETREVE1-${Math.random()}`
        optionA1 = `RETREVE1-${Math.random()}`
        optionB1 = `RETREVE1-${Math.random()}`
        description1 = `RETREVE1-${Math.random()}`
        expiryDate1 = new Date
        imagePoll1 = `RETREVE1-${Math.random()}`
        positives1 = 1000
        negatives1 = 1000
        pollStatus1 = 'pending'

        cityId2 = `RETREVE2-${Math.random()}`
        authorId2 = `RETREVE2-${Math.random()}`
        question2 = `RETREVE2-${Math.random()}`
        optionA2 = `RETREVE2-${Math.random()}`
        optionB2 = `RETREVE2-${Math.random()}`
        description2 = `RETREVE2-${Math.random()}`
        expiryDate2 = new Date
        imagePoll2 = `RETREVE2-${Math.random()}`
        positives2 = 2000
        negatives2 = 2000
        pollStatus2 = 'approved'
    
        const poll1 = await Poll.create({ cityId: cityId1, authorId: authorId1, question: question1, optionA: optionA1, optionB: optionB1, description: description1, expiryDate: expiryDate1, imagePoll: imagePoll1, positives: positives1, negatives: negatives1, pollStatus: pollStatus1 })

        pollId1 = poll1.id

        const poll2 = await Poll.create({ cityId: cityId2, authorId: authorId2, question: question2, optionA: optionA2, optionB: optionB2, description: description2, expiryDate: expiryDate2, imagePoll: imagePoll2, positives: positives2, negatives: negatives2, pollStatus: pollStatus2 })

        pollId2 = poll2.id


    })

    it('should succeed on correct data', async () =>{
        const poll = await logic.listAll()

                expect(poll).to.exist
                //expect(poll.length).to.equal(2)
                expect(poll[0]).to.exist
                expect(poll[0].cityId).to.equal(cityId)
                expect(poll[0].authorId).to.equal(authorId)
                expect(poll[0].question).to.equal(question)
                expect(poll[0].optionA).to.equal(optionA)
                expect(poll[0].optionB).to.equal(optionB)
                expect(poll[0].description).to.equal(description)
                expect(poll[0].expiryDate).to.equal(expiryDate)
                expect(poll[0].imagePoll).to.equal(imagePoll)
                expect(poll[0].positives).to.equal(positives)
                expect(poll[0].negatives).to.equal(negatives)
                expect(poll[0].pollStatus).to.equal(pollStatus)

                expect(poll).to.exist
                //expect(poll.length).to.equal(2)
                expect(poll[1]).to.exist
                expect(poll[1].cityId).to.equal(cityId)
                expect(poll[1].authorId).to.equal(authorId)
                expect(poll[1].question).to.equal(question)
                expect(poll[1].optionA).to.equal(optionA)
                expect(poll[1].optionB).to.equal(optionB)
                expect(poll[1].description).to.equal(description)
                expect(poll[1].expiryDate).to.equal(expiryDate)
                expect(poll[1].imagePoll).to.equal(imagePoll)
                expect(poll[1].positives).to.equal(positives)
                expect(poll[1].negatives).to.equal(negatives)
                expect(poll[1].pollStatus).to.equal(pollStatus)
    })

    
   
    after(() => mongoose.disconnect())
})