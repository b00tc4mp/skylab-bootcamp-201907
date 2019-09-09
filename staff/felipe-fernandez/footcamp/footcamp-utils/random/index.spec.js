const random = require('./index')
const { expect } = require('chai')

describe('random', () => {
    describe('number', () => {
        it('should return a number within a certain range', () => {
            const response = random.number(1, 10)
            expect(response > 1 && response < 10).to.be.true
        })
    })
    describe('boolean', () => {
        it('should return true or false random', () => {
            const response = random.boolean()
            expect(response === true || response === false).to.be.true
        })
    })
    describe('value', () => {
        it('should return a random value between certain values', () => {
            const response = random.value('car','house','bike')
            expect(response === 'car' || response === 'house' || response === 'bike') .to.be.true
        })
    })
})