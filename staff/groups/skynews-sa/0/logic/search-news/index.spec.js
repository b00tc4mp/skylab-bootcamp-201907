{
  describe('logic - search news', () => {
    it('should retrieve data', () => {
      let category = "business"
      let country="gb"
      return logic.searchNews(category,country)
      .then(result => {
        expect(result).toBeDefined()
        expect(result.length > 1).toBe(true)
      })
    })

    it('should fail on empty category', ()=> {
      expect(() => {
        logic.searchNews('', "gb")
      }).toThrowError(Error, 'no category or value inserted')
    })


    it('should fail on wrong category', () => 
      logic.searchNews('jhfjh', "gb")
      .then((res)=>expect(res).toBeUndefined())
      .catch(error => { expect(error).toBeDefined() })
    )

    it('should fail on wrong country', () => 
    logic.searchNews('business', "1344")
    .then((res)=>expect(res).toBeUndefined())
    .catch(error => { expect(error).toBeDefined() })
  )
    it('should wrong on empty url image', () =>
      logic.searchNews('business', 'gb')
      .then((res) => expect(res.findIndex(element => element.urlToImage=='' || element.urlToImage== undefined || element.urlToImage== null)).toBe(-1))
  )

  it('should fail on wrong category', () => 
  logic.searchNews('jhfjh', "gasdasf")
  .then((res)=>expect(res).toBeUndefined())
  .catch(error => { expect(error).toBeDefined() })
  )
  })
}