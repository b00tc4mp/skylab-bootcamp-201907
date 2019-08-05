describe('call', () => {

    // xdescribe('api spotify get token', () => { // NOT POSSIBLE TO GET TOKEN FROM BROWSER FOR SECURITY REASONS AS CLIENT CREDENTIALS ARE SENT IN PLAIN TEXT

    //     it('should succeed on correct data', done => {
    //         return call(`https://accounts.spotify.com/api/token`,
    //         'post', 
    //         { 'Authorization': `Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk=`,
    //         'Content-Type':'application/x-www-form-urlencoded' }, 
    //         { "grant_type": "client_credentials" } )

    //         .then(res => {
    //             expect(res).toBeDefined()
    //             done()
    //         })
    //         .catch(error => expect(error).toBeUndefined())

    //     })
    // })
    
    describe('spotify api get tracks', () => {

        const query = 'wonderwall'
        const types = 'track'
        const api = 'spotify'

        it('should succeed on correct data', () => 
            call(`https://api.spotify.com/v1/search?q=${query}&type=${types}`,
            'get', 
            { 'Authorization': `Bearer ${token}` }, 
            undefined,
            api)

            .then(res => {
                expect(res).toBeDefined()
                expect(res.tracks.items.length).toBe(20)
            })
            .catch(error => expect(error).toBeUndefined())
        )

        it('should throw error on wrong method (spotify api only accepts "get")', () => 
            expect(() => 
                call(`https://api.spotify.com/v1/search?q=${query}&type=${types}`,
                'post', 
                { 'Authorization': `Bearer ${token}` }, 
                undefined,
                api)).toThrowError(Error, 'method with value post does not match one of the expected values: get'))
            
    })

    describe('skylab api methods tests', () => {
        const api = 'skylab'
        
        it('post should succeed on correct data', () => {
            return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, {
                username: `esputy-${Math.random()}`,
                password: `esputy-${Math.random()}`
            },
            api)
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })
        it('get should succeed on correct url and method', () => {
            return call('https://skylabcoders.herokuapp.com/api/users', 'get', undefined, undefined, api) 
                
                .then(res => expect(res).toBeDefined())
                .catch(error => expect(error).toBeUndefined())
        })

        //TO DO PATCH, PUT, DELETE
    })
    describe('api tests', () => {
        const api = 'random'
        
        it('"should throw error when api is not "spotify" or "skylab"', () => {
            expect(() => 
                call(`https://api.spotify.com/v1/search?q=wonderwall&type=track`,
                'post', 
                { 'Authorization': `Bearer ${token}` }, 
                undefined,
                api)).toThrowError(Error, 'random must be "spotify or "skylab"')
        })
    })

})

//TODO MORE TESTS