
describe ("validate", () => {
    let aux
    it("should succeed in correct string", ()=>{
        aux = "pepito grillo"
        expect(validate.string (aux, "aux")).toBeUndefined()
    })
    it("should fail on a value which is not a chain", () => {
        aux = 1
        expect( () => validate.string (aux, 'aux')).toThrowError(TypeError, `aux with value ${aux} is not a string`)
    })
    it("should fail on empty data", () => {
        aux = ""

        expect( () => validate.string (aux, 'aux')).toThrowError(Error, `aux is empty or blank`)
    }) 
    it("should succeed in email", ()=>{
        let email = "j@gmail.com"

        expect(validate.email (email, "email")).toBeUndefined()
    }) 
    it("should fail on no a email form", () => {
        email = "j"

        expect( () => validate.email (email, 'email')).toThrowError(Error, `email with value ${email} is not a valid e-mail`)
    }) 
    it("should succeed in url", ()=>{
        let url = "https://www.google.com/"

        expect(validate.url (url, "url")).toBeUndefined()
    }) 
    it("should fail on url", () => {
        url = "j"

        expect( () => validate.url (url, 'url')).toThrowError(Error, `url with value ${url} is not a valid URL`)
    }) 
    
})

