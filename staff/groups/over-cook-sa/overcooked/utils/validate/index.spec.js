{
describe("validate", () => {
    describe("string", () => {
        it ("should detect that it's a string and not throw error", () => {
            expect( ()=> {
                validate.string("hello","string")                
            }).not.toThrow()
        })

        it ("should detect empty string", () => {
            expect( () => {
                validate.string()
            }).toThrow(TypeError(`undefined with value undefined is not a string`))
        })

    })
    describe("email", () => {
        it ("should throw error if the user is not a mail", () => {
            expect( () => {
                validate.email("a.a.com","email")
            }).toThrow(new Error(`email with value a.a.com is not a valid e-mail`))
        })

        it ("should not to throw error", () => {
            expect(() => {
                validate.email("anna@gmail.com")
            }).not.toThrow()
        })
    })
    describe("function", () => {
        it ("should trow error if its not a function",() => {
            expect(() => {
                validate.function("hola", "function")
            }).toThrow(TypeError(`function with value hola is not a function`))
        })
    })
    describe("url", () => {

        it ("should throw an error ", () => {
            expect(() => {
                validate.url("htt//stackoverflow.com/questions/4144686/", "url")
            }).toThrowError(Error , `url with value htt//stackoverflow.com/questions/4144686/ is not a valid URL`)
        })

        it ("should not to throw an error", () => {
            expect(() => {
                validate.url("https://stackoverflow.com/questions/4144686")
            }).not.toThrow()
        })
    })
})
}