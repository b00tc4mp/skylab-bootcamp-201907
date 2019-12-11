const validate = require('./index')
const { expect } = require('chai')

describe("validate", () => {

    describe("string", () => {
        it("should detect that it's a string and not throw error", () => {
            const response = validate.string('hello', 'string')
            expect(response).to.be.undefined
        })
        it("should detect empty string", () => {
            expect(() => { validate.string() }).to.throw(Error, "undefined with value undefined is not a string")
        })
    })

    describe("email", () => {
        it("should detect that it's a email and not throw error", () => {
            const response = validate.email("a.a@test.com", "email")
            expect(response).to.be.undefined
        })
        it("should throw error if the email is not a email", () => {
            expect(() => { validate.email("a.a@com", "email") }).to.throw(Error, "email with value a.a@com is not a valid e-mail")
        })
    })

    describe("function", () => {
        it("should detect that it's a function and not throw error", () => {
            const func = function funct() { }
            const response = validate.function(func, "function")
            expect(response).to.be.undefined
        })
        it("should trow error if its not a function", () => {
            expect(() => { validate.function("hola", "function") }).to.throw("function with value hola is not a function")
        })
    })

    describe("url", () => {
        it("should detect that it's a url and not throw error", () => {
            const response = validate.url("www.url.com", "url")
            expect(response).to.be.undefined
        })
        it("should throw error if its not a url ", () => {
            expect(() => { validate.url("hola", "url") }).to.throw("url with value hola is not a valid URL")
        })
    })

    describe("url", () => {
        it("should detect that it's a url and not throw error", () => {
            const response = validate.url("www.url.com", "url")
            expect(response).to.be.undefined
        })
        it("should throw error if its not a url ", () => {
            expect(() => { validate.url("hola", "url") }).to.throw("url with value hola is not a valid URL")
        })
    })

    describe('Boolean', () => {
        it('should succeed on correct Boolean', () => {
            const result = validate.boolean(true, 'boolean')
            expect(result).to.not.exist
        })
        it('should fail on non correct Boolean', () => {
            expect(() =>
                validate.boolean('true', 'boolean')).to.throw(Error, `boolean with value true is not a boolean`)
        })
    })

    describe('Number', () => {
        it('should succeed on correct Number', () => {
            const result = validate.number(123, 'number')
            expect(result).to.not.exist
        })
        it('should fail on non correct Number', () => {
            expect(() =>
                validate.number('123', 'number')).to.throw(Error, `number with value 123 is not a number`)
        })
    })
    
    describe('Date', () => {
        it('should succeed on correct Date', () => {
            const newDate = new Date()
            const result = validate.date(newDate, 'date')
            expect(result).to.not.exist
        })
        it('should fail on non correct Date', () => {
            const _newDate = 'Thu Sep 05 2019 13:16:53 GMT+0200'
            expect(() =>
                validate.date(_newDate, 'date')).to.throw(Error, 'date with value Thu Sep 05 2019 13:16:53 GMT+0200 is not a date')
        })
    })
})