{
  describe('logic - search news', () => {
    it('should retrieve data', () => {
      let value = "business"
      return logic.searchNews(value)
      .then(result => {
        expect(result).toBeDefined()
        expect(result.length > 1).toBe(true)
      })
    })

    it('should fail on empty value', ()=> {
      expect(() => {
        logic.searchNews('')
      }).toThrowError(Error, 'no value inserted')
    })

    it('should fail on wrong value', () => 
    logic.searchNews('jhfjh')
    .catch(error => {
      expect(error).toBeDefined()
    }))
  })
}