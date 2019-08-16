{
    describe('utils - validate', () => {
        describe('string', () => {
            it("should detect that it's a string correctly", () => {
                expect(() => {
                    validate.string('test', 'string')
                }).not.toThrow()
            })
            it('should detect blank string', () => {
                expect(() => {
                    validate.string('        ', 'blank')
                }).toThrowError('blank is empty or blank')
            })
            })
        describe('email', () => {
            it('should throw error if email is not a valid email', () => {
                expect(() => {
                    validate.email('testingemail.com', 'email')
                }).toThrowError(`email with value testingemail.com is not a valid e-mail`)
            })
            it('should not to throw error on valid email', () => {
                expect(() => {
                    validate.email('random@email.com', 'email')
                }).not.toThrowError()
            })
        })
        describe('function', () => {
            it('should trow error if its not a function', () => {
                expect(() => {
                    validate.function(666, 'function')
                }).toThrow(TypeError(`function with value 666 is not a function`))
            })
        })
        describe('url', () => {
            it('should not to throw an error', () => {
                expect(() => {
                    validate.url('https://www.marca.com')
                }).not.toThrowError()
            }) 
            it('should throw an error ', () => {
                expect(() => {
                    validate.url('not a url.com', 'url')
                }).toThrowError(Error, `url with value not a url.com is not a valid URL`)
            })
        })
    })
}
