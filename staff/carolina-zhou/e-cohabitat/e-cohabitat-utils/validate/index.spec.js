const validate = require('.')
const { expect } = require('chai')

describe('logic - validate', () => {
    
    describe('string', () => {
        it('should succeed on correct data type (string)', () => {
            const result = validate.string('e-cohabitat', 'string')
            expect(result).to.be.undefined

        })
        it('should fail on incorrect data type (not a string)', () => {
            expect(() =>
                validate.string(123, 'string')).to.throw(Error, `string with value 123 is not a string`)

        })
        it('should fail on empty string', () => {
            expect(() =>
                validate.string('', 'string')).to.throw(Error, `string is empty or blank`)

        })
    })

    describe('email', () => {
        it('should succeed on correct data type (email)', () => {
            validate.email('carolina@gmail.com', 'email')
            expect(true).to.be.true

        })
        it('should fail on incorrect data type (not an email)', () => {
            expect(() =>
                validate.email(123, 'email')).to.throw(Error, `email with value 123 is not a valid e-mail`)

        })
        it('should fail on empty email', () => {
            expect(() =>
                validate.email('', 'email')).to.throw(Error, `email is empty or blank`)

        })
    })

    describe('URL', () => {
            it('should succeed on correct data type (URL)', () => {
                validate.url('https://developer.mozilla.org/es/', 'url')
                expect(true).to.be.true

            })
            it('should fail on incorrect data type (not an URL)', () => {
                expect(() =>
                    validate.url(123, 'url')).to.throw(Error, `url with value 123 is not a valid URL`)

            })
            it('should fail on empty URL', () => {
                expect(() =>
                    validate.url('', 'url')).to.throw(Error, `url is empty or blank`)
    
            })
        })

    describe('function', () => {
        it ('should succeed on correct data type (function)', () => {
            const func = function funct() {}
            validate.function(func,'function')
            expect(true).to.be.true 
        })
        it ('should fail on incorrect data type (not a function)',() => {
            expect(() => { validate.function('e-cohabitat', 'function') }).to.throw(Error, `function with value e-cohabitat is not a function`)
        })
        it('should fail on empty function', () => {
            expect(() =>
                validate.function('', 'function')).to.throw(Error, `function is empty or blank`)

        })
    })

    describe("number", () => {
        it("should succeed on correct data type (number)", () => {
            validate.number(123, "number")
            expect(true).to.be.true
        })
        it("should succeed on incorrect data type (not a number)", () => {
            expect(() => { validate.number("e-cohabitat", "number") }).to.throw(Error, "number with value e-cohabitat is not a number")
        })
        it('should fail on empty number', () => {
            expect(() =>
                validate.number('', 'number')).to.throw(Error, `number is empty or blank`)

        })
    })
    
    describe("boolean", () => {
        it("should succeed on correct data type (boolean)", () => {
            validate.boolean(true, "boolean")
            expect(true).to.be.true
        })
        it("should succeed on incorrect data type (not a boolean)", () => {
            expect(() => { validate.boolean("e-cohabitat", "boolean") }).to.throw(Error, "boolean with value e-cohabitat is not a boolean")
        })
        it('should fail on empty boolean', () => {
            expect(() =>
                validate.boolean('', 'boolean')).to.throw(Error, `boolean is empty or blank`)

        })
    })

    describe("object", () => {
        it("should succeed on correct data type (object)", () => {
            validate.object({ name: "e-cohabitat" }, "object")
            expect(true).to.be.true
        })
        it("should succeed on incorrect data type (not an object)", () => {
            expect(() => { validate.object("e-cohabitat", "object") }).to.throw(Error, "object with value e-cohabitat is not an object")
        })
        it('should fail on empty object', () => {
            expect(() =>
                validate.object('', 'object')).to.throw(Error, `object is empty or blank`)

        })
    })

})