/* const { expect } = require('chai')
const validate = require('..')

const {
    random
} = Math

describe('logic - validate', () => {
    describe('string', () => {
        it('should succeed on correct string', () => {
            const result = validate.string('query', 'string')
            expect(result).toBeUndefined()

        })
        it('should fail on non correct string', () => {
            expect(() =>
                validate.string(123, 'string')).toThrowError(Error, `string with value 123 is not a string`)

        })
        it('should fail on empty string', () => {
            expect(() =>
                validate.string('', 'string')).toThrowError(Error, `string is empty or blank`)

        })

        it('should fail on empty string', () => {
            expect(() =>
                validate.string('', 'string')).toThrowError(Error, `string is empty or blank`)

        })

    })
    describe('email', () => {
        it('should succeed on correct email', () => {
            const result = validate.email('John-' + random() + '@gmail.com', 'string')
            expect(result).toBeUndefined()

        })
        it('should fail on non correct email', () => {
            expect(() =>
                validate.email(123, 'email')).toThrowError(Error, `email with value 123 is not a valid e-mail`)

        })

    })

    describe('URL', () => {
            it('should succeed on correct URL', () => {
                const result = validate.url('https://developer.mozilla.org/es/', 'string')
                expect(result).toBeUndefined()

            })
            it('should fail on non correct URL', () => {
                expect(() =>
                    validate.url(123, 'url')).toThrowError(Error, `url with value 123 is not a valid URL`)

            })
        })

    describe('Boolen', () => {
            it('should succeed on correct Boolean', () => {
                const result = validate.boolean(true, 'boolean')
                expect(result).toBeUndefined()

            })
            it('should fail on non correct Boolean', () => {
                expect(() =>
                    validate.url('true', 'boolean')).toThrowError(Error, `boolean with value 'true' is not a boolean`)

            })
        })
    describe('Number', () => {
            it('should succeed on correct Number', () => {
                const result = validate.number(123, 'number')
                expect(result).toBeUndefined()

            })
            it('should fail on non correct Number', () => {
                expect(() =>
                    validate.url('123', 'number')).toThrowError(Error, `number with value '123' is not a number`)

            })
        })

}) */