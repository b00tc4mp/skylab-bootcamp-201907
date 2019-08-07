{
    describe('logic - search weather', () => {
      it('should retrieve data', () => {
        let category = "business"
        let country="gb"
        return logic.searchNews(category,country)
        .then(result => {
          expect(result).toBeDefined()
          expect(result.length > 1).toBe(true)
        })
      })
  
    })
  }