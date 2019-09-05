const validate = require('./')
const { expect } = require('chai')

describe("utils - validate", () => {
    describe("string", () => {
        it("should succeed on target being a string", () => {
            validate.string("hello", "string")
            expect(true).to.be.true
        })
        it("should fail on empty string", () => {
            expect(() => { validate.string() }).to.throw(Error, "undefined with value undefined is not a string")
        })
    })
    describe("email", () => {
        it("should succeed on target being a valid e-mail", () => {
            validate.email("a.a@test.com", "email")
            expect(true).to.be.true
        })
        it("should fail on invalid email", () => {
            expect(() => { validate.email("a.a@com", "email") }).to.throw(Error, "email with value a.a@com is not a valid e-mail")
        })
    })
    describe("function", () => {
        it("should succeed on target being a function", () => {
            const func = function funct() { }
            validate.function(func, "function")
            expect(true).to.be.true
        })
        it("should fail on invalid function", () => {
            expect(() => { validate.function("hola", "function") }).to.throw(Error, "function with value hola is not a function")
        })
    })
    describe("url", () => {
        it("should succeed on target being a valid url", () => {
            validate.url("www.url.com", "url")
            expect(true).to.be.true
        })
        it("should fail on invalid url", () => {
            expect(() => { validate.url("hola", "url") }).to.throw(Error, "url with value hola is not a valid URL")
        })
    })
    describe("number", () => {
        it("should succeed on target being a number", () => {
            validate.number(123, "number")
            expect(true).to.be.true
        })
        it("should fail on invalid number", () => {
            expect(() => { validate.number("hola", "number") }).to.throw(Error, "number with value hola is not a number")
        })
    })
    describe("boolean", () => {
        it("should succeed on target being a boolean", () => {
            validate.boolean(true, "boolean")
            expect(true).to.be.true
        })
        it("should fail on invalid boolean", () => {
            expect(() => { validate.boolean("hola", "boolean") }).to.throw(Error, "boolean with value hola is not a boolean")
        })
    })
})