const logic = require('../../.')
const { expect } = require('chai')
const { models , mongoose } = require('democratum-data')
const { Poll } = models

describe('logic - update citizen', () => {

    before(() =>  mongoose.connect('mongodb://localhost/democratum-test', { useNewUrlParser: true }))

    let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, id


    beforeEach(async () => {
        cityId = `vehbrand-${Math.random()}`
        authorId = `vehmodel-${Math.random()}`
        question = `question-${Math.random()}`
        optionA = `optiona-${Math.random()}`
        optionB = `optionb-${Math.random()}`
        description = `description-${Math.random()}`
        expiryDate = `vehplate-${Math.random()}`
        imagePoll = `image-${Math.random()}`
        positives = 1
        negatives = 1
        pollStatus = 'pending'

        body = {
        cityId: `vehbrand-${Math.random()}`,
        authorId: `vehmodel-${Math.random()}`,
        question: `question-${Math.random()}`,
        optionA: `optiona-${Math.random()}`,
        optionB: `optionb-${Math.random()}`,
        description: `description-${Math.random()}`,
        expiryDate: `vehplate-${Math.random()}`,
        imagePoll: `image-${Math.random()}`,
        positives: 1000,
        negatives: 1000,
        pollStatus: 'approved'
        }

        await Poll.deleteMany()
            const poll = await Poll.create({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, id })
            id = poll.id
    })

    it('should succeed on correct data', async () =>{
        const response = await logic.updatePoll(id, body)

            expect(response).not.to.exist
            return ( async () => {
            
            const poll = await Poll.findById(id)

            let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus
           
                expect(poll).to.exist
                expect(poll.cityId).to.equal(body.cityId)
                expect(poll.authorId).to.equal(body.authorId)
                expect(poll.question).to.equal(body.question)
                expect(poll.optionA).to.equal(body.optionA)
                expect(poll.optionB).to.equal(body.optionB)
                expect(poll.description).to.equal(body.description)
                expect(poll.expiryDate).to.equal(body.expiryDate)
                expect(poll.imagePoll).to.equal(body.imagePoll)
                expect(poll.positives).to.equal(body.positives)
                expect(poll.negatives).to.equal(body.negatives)
                expect(poll.pollStatus).to.equal(body.pollStatus)
        })
    })

    it('should fail on non-existing user', async () => {
       try {

        await logic.updatePoll('5d5d5530531d455f75da9fF9', body)

       } catch({ message }){
           
           expect(message).to.equal('wrong credentials')
     }
    })

    after(() => mongoose.disconnect())
})
