const formatDate = require('.')
const { expect } = require('chai')

describe("format date", () => {
    it ("should format a new Date into a string date", () => {
        const date = new Date()
        const formatedDate = formatDate(date)
        expect( formatedDate ).to.be.a( 'string' )
        expect( formatedDate ).to.be.a( 'string' )
    })    
    
    it ("should throw error if its not a date ", () => {
        expect(() => { formatDate(123) }).to.throw(Error, "argument with value 123 is not a date type value")
    })
    
    it ("should throw error if its not a date ", () => {
        expect(() => { formatDate() }).to.throw(Error, "argument with value undefined is not a date type value")
    })
    
    it ("should throw error if date is empty or blank ", () => {
        expect(() => { formatDate("") }).to.throw(Error, "date is empty or blank")
    })
})