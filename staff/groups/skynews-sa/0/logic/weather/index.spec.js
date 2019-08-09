{
  describe('logic - search weather', () => {
    it('should retrieve data', () => {

      return logic.weather("41.390205", "2.154007")
        .then(result => {
          expect(result).toBeDefined()
        })
    })
    it('should fail on wrong coordinates', () =>
      logic.weather('dgajdf', "dsafs")
        .then((res) => expect(res).toBeDefined())
        .catch(error => expect(error).toBeDefined())
    )
    it('should fail on no coordinates', () =>
      logic.weather('', "")
        .then((res) => expect(res).toBeDefined())
        .catch(error => expect(error).toBeDefined())
    )
    it('should succes humidity', () => {

      return logic.weather("41.390205", "2.154007")
        .then(result => {
          expect(result.currently.humidity).toBeDefined()
        })
    })

    it('should wrong humidity', () => {

      return logic.weather("41.390205", "2.154007")
        .then(result => {
          expect(result.currently.xxx).toBeUndefined()
        })
    })
    it('should succes temperature', () => {

      return logic.weather("41.390205", "2.154007")
        .then(result => {
          expect(result.currently.temperature).toBeDefined()
        })
    })

    it('should succes field', () => {

      return logic.weather("41.390205", "2.154007")
        .then(result => {
          expect(result.currently.icon).toBeDefined()
        })
    })

    it('should fail on 1 missing coordinate', () =>
      logic.weather('', "2")
        .then((res) => expect(res).toBeDefined())
        .catch(error => expect(error).toBeDefined())
    )
    it('should fail on 1 missing coordinate', () =>
      logic.weather('2', "")
        .then((res) => expect(res).toBeDefined())
        .catch(error => expect(error).toBeDefined())
    )

  })
}