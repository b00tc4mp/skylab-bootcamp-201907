{

    describe('RANDOM button function', () => {

        it('should Match all criterias', () => {
            return logic.getRandomJoke()
                .then(random => {
                    expect(random.lenght).not.toBe(0)
                    expect(random instanceof Object).toBeTruthy()
                    expect(Object.keys(random).find(x => x === 'id')).toMatch('id')
                    expect(Object.keys(random).find(x => x === 'value')).toMatch('value')
                    expect(random['id']).toBeDefined()
                    expect(random['value']).toBeDefined()

                })
        })



    })

}

