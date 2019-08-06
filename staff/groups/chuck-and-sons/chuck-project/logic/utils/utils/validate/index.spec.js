describe('PARAMETERS VALIDATIONS' , () =>{

        describe('string validation' , ()=>{

            it('should validate a correct string' , ()=>{
                expect( () => {
                    validate.str('hello' , 'string')
                }).not.toThrow()
            })

           it("should fail with an empty string" , ()=>{
                expect( () => {
                    validate.str("" , "string")    
                }).toThrowError(TypeError , "string is empty or blank")

            })

            it('should fail with a wrong string' , ()=>{
                expect( () => {
                    validate.str(1 , 'string')
                }).toThrowError(TypeError , "string with value 1 is not a valid string")
            })

            it("should fail with wrong values" , ()=>{
                expect( () => {
                    validate.str('green' , 'string' , true , ['red' , 'blue' , 'yellow'])
                }).toThrowError(TypeError , 'string with value green does not match one of the following values: red, blue, yellow')
            })
        })

       describe('email validation' , ()=>{

            it('should validate a corret mail' , () => {
                expect( () => {
                    validate.email('a@mail.com' , 'email')
                }).not.toThrow()
            })

            it('should fail with a wrong email' , () => {
                expect( () => {
                    validate.email('a#mail.com' , 'email')
                }).toThrowError (TypeError , 'email with value a#mail.com is not a valid email')
            })
        })

        describe('url validation' , () => {
            it("should validate a correct URL" , () => {
                expect( () => {
                    validate.url("https://www.skylabcoders.com/ca" , 'url')
                }).not.toThrow()
            })

            it('shoud fail with a wrong URL' , () => {
                expect( () => {
                    validate.url('://www.skylabcoders.com/ca' , 'url')
                }).toThrowError(TypeError , "url with value ://www.skylabcoders.com/ca is not a valid URL")
            })
        })

        describe("function validation" , () => {
            it("should validate a correct function" , () => {
                expect( () => {
                    const handleEvent = () => {console.log('handleEvent')}
                    validate.fn(handleEvent , 'function')
                }).not.toThrow()
            })

            it("should fail with a wrong function" , () => {
                expect( () => {
                    validate.fn('hello' , 'function')
                }).toThrowError(TypeError , "function with value hello is not a valid function")
            })
        })
    }
)