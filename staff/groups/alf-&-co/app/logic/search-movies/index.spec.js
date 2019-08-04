{
    const { random } = Math

    /* Search movie specs:
        a) User should be able to search by keyword and get list of movies returned.
        b) If user is logged, search results will incorporate favorites information.
        c) Empty search will return non-filtered list of movies
        d) Non-valid query should display message saying no results for that query
    */

    describe('logic - search movies', () => {
    
        it('should succeed on correct data', () =>
           callToFunction(param1, param2)
               .then(data => {
                   expect(data).toBeDefined()
    
                   const {id, token } = data
                   expect(id).toBeDefined()
                   expect(token).toBeDefined()
               })
        )


        describe('logic - search movies - user with favorites', () => {
            let user

            beforeEach(() => {
            
                user = {
                    name: 'John-' + random(),
                    surname: 'Doe-' + random(),
                    username: 'johndoe-' + random() + '@mail.com',
                    password: '123-' + random(),
                    favorites: []
                }
            
                return call(url, 'post', { 'content-type': 'application/json' }, user)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                    })
            })

        })
    })
}