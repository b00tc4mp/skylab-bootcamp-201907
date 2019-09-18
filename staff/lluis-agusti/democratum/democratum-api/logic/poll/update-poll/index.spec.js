require('dotenv').config()
const{ env : { DB_URL_TEST } } = process
const logic = require('../..')
const { expect } = require('chai')
const { models , mongoose, database } = require('democratum-data')
const { User, Poll } = models
const bcrypt = require('bcryptjs')

describe('logic - update poll', () => {

    before(() => mongoose.connect(DB_URL_TEST, {
        useNewUrlParser: true
    }))

    let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus, id


    beforeEach(async () => {

        await Poll.deleteMany()


        cityId = `vehbrand-${Math.random()}`
        authorId = `vehmodel-${Math.random()}`
        question = `question-${Math.random()}`
        optionA = `optiona-${Math.random()}`
        optionB = `optionb-${Math.random()}`
        description = `description-${Math.random()}`
        expiryDate = new Date
        imagePoll = `image-${Math.random()}`
        positives = 1
        negatives = 1
        pollStatus = 'pending'

        body = {
            cityId1: `5d70f41b7d4edc12334851db`,
            authorId1: `UPDATEEEEEED-${Math.random()}`,
            question1: `UPDATEEEEEED-${Math.random()}`,
            optionA1: `UPDATEEEEEED-${Math.random()}`,
            optionB1: `UPDATEEEEEED-${Math.random()}`,
            description1: `UPDATEEEEEED-${Math.random()}`,
            expiryDate1: new Date,
            imagePoll1: `UPDATEEEEEED-${Math.random()}`,
            positives1: 1000,
            negatives1: 1000,
            pollStatus1: 'approved'
        }

        
        const poll = await Poll.create({ cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives,negatives, pollStatus, id })

        id = poll.id
    })

    it('should succeed on correct data', async () => {
        const response = await logic.updatePoll(id, body)

        expect(response).not.to.exist
        return (async () => {

            const poll = await Poll.findById(id)

            /* let cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus */

            expect(poll).to.exist
            expect(poll.cityId).to.equal(body.cityId1)
            expect(poll.authorId).to.equal(body.authorId1)
            expect(poll.question).to.equal(body.question1)
            expect(poll.optionA).to.equal(body.optionA1)
            expect(poll.optionB).to.equal(body.optionB1)
            expect(poll.description).to.equal(body.description1)
            expect(poll.expiryDate.toDateString()).to.equal(body.expiryDate1.toDateString())
            expect(poll.imagePoll).to.equal(body.imagePoll1)
            expect(poll.positives).to.equal(body.positives1)
            expect(poll.negatives).to.equal(body.negatives1)
            expect(poll.pollStatus).to.equal(body.pollStatus1)
        })
    })

    it('should fail on non-existing poll', async () => {
        try {

            await logic.updatePoll('5d5d5530531d455f75da9fF9', body)

        } catch ({
            message
        }) {
            expect(message).to.exist
        }
    })

    // cityId

    it('should fail on empty cityId', () =>
        expect(() =>
            logic.newPoll('', authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw('cityId is empty or blank')
    )

    it('should fail on undefined cityId', () =>
        expect(() =>
            logic.newPoll(undefined, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`cityId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(123, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`cityId with value 123 is not a string`)
    )

    // authorId

    it('should fail on empty authorId', () =>
        expect(() =>
            logic.newPoll(cityId, '', question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw('authorId is empty or blank')
    )

    it('should fail on undefined authorId', () =>
        expect(() =>
            logic.newPoll(cityId, undefined, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`authorId with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, 123, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`authorId with value 123 is not a string`)
    )

    // question

    it('should fail on empty question', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, '', optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw('question is empty or blank')
    )

    it('should fail on undefined question', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, undefined, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`question with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, 123, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`question with value 123 is not a string`)
    )

    // optionA

    it('should fail on empty optionA', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, '', optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw('optionA is empty or blank')
    )

    it('should fail on undefined optionA', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, undefined, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`optionA with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, 123, optionB, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`optionA with value 123 is not a string`)
    )

    // optionB

    it('should fail on empty optionB', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, '', description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw('optionB is empty or blank')
    )

    it('should fail on undefined optionB', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, undefined, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`optionB with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, 123, description, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`optionB with value 123 is not a string`)
    )

    // description

    it('should fail on empty description', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, '', expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw('description is empty or blank')
    )

    it('should fail on undefined description', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, undefined, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`description with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, 123, expiryDate, imagePoll, positives, negatives, pollStatus)
        ).to.throw(`description with value 123 is not a string`)
    )

    // imagePoll

    it('should fail on empty imagePoll', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, '', positives, negatives, pollStatus)
        ).to.throw('imagePoll is empty or blank')
    )

    it('should fail on undefined imagePoll', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, undefined, positives, negatives, pollStatus)
        ).to.throw(`imagePoll with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, 123, positives, negatives, pollStatus)
        ).to.throw(`imagePoll with value 123 is not a string`)
    )

    // positives

    it('should fail on undefined positives', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, undefined, negatives, pollStatus)
        ).to.throw(`positives with value undefined is not a number`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, '123', negatives, pollStatus)
        ).to.throw(`positives with value 123 is not a number`)
    )

    // positives

    it('should fail on undefined positives', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, undefined, pollStatus)
        ).to.throw(`negatives with value undefined is not a number`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, '123', pollStatus)
        ).to.throw(`negatives with value 123 is not a number`)
    )

    // pollStatus

    it('should fail on empty pollStatus', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, '')
        ).to.throw('pollStatus is empty or blank')
    )

    it('should fail on undefined imagePoll', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, undefined)
        ).to.throw(`pollStatus with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, 123)
        ).to.throw(`pollStatus with value 123 is not a string`)
    )

        it('should fail on empty pollStatus', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, '')
        ).to.throw('pollStatus is empty or blank')
    )

    it('should fail on undefined imagePoll', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, undefined)
        ).to.throw(`pollStatus with value undefined is not a string`)
    )

    it('should fail on wrong data type', () =>
        expect(() =>
            logic.newPoll(cityId, authorId, question, optionA, optionB, description, expiryDate, imagePoll, positives, negatives, 123)
        ).to.throw(`pollStatus with value 123 is not a string`)
    )

    after(() => mongoose.disconnect())
})
