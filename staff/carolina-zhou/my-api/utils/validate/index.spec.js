const validate = require('.')
const { expect } = require('chai')

const {
    random
} = Math

describe('logic - validate', () => {
    describe('string', () => {
        it('should succeed on correct string', () => {
            const result = validate.string('query', 'string')
            expect(result).to.be.undefined

        })
        it('should fail on non correct string', () => {
            expect(() =>
                validate.string(123, 'string')).to.throw(Error, `string with value 123 is not a string`)

        })
        it('should fail on empty string', () => {
            expect(() =>
                validate.string('', 'string')).to.throw(Error, `string is empty or blank`)

        })

        it('should fail on empty string', () => {
            expect(() =>
                validate.string('', 'string')).to.throw(Error, `string is empty or blank`)

        })

    })
    describe('email', () => {
        it('should succeed on correct email', () => {
            const result = validate.email('John-' + random() + '@gmail.com', 'string')
            expect(result).to.be.undefined

        })
        it('should fail on non correct email', () => {
            expect(() =>
                validate.email(123, 'email')).to.throw(Error, `email with value 123 is not a valid e-mail`)

        })

    })

    describe('URL', () => {
            it('should succeed on correct URL', () => {
                const result = validate.url('https://developer.mozilla.org/es/', 'string')
                expect(result).to.be.undefined

            })
            it('should fail on non correct URL', () => {
                expect(() =>
                    validate.url(123, 'url')).to.throw(Error, `url with value 123 is not a valid URL`)

            })
        })

})