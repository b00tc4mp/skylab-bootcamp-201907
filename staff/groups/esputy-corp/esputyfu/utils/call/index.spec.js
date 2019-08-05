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
    
    describe('api spotify get tracks', () => {
        const token = "BQBe_1I2EcsHumCDavWtWXHjcMBHrvS6w81ajt8w_W0n3pV2SEgQ0mfhDEtoYaS10-Nz5VTa91Q6mFrYHvA"
        const query = 'wonderwall'
        const types = 'track'

        it('should succeed on correct data', done => {
            return call(`https://api.spotify.com/v1/search?q=${query}&type=${types}`,
            'get', 
            { 'Authorization': `Bearer ${token}` }, 
            undefined)

            .then(res => {
                expect(res).toBeDefined()
                expect(res.tracks.items.length).toBe(20)
                done()
            })
            .catch(error => expect(error).toBeUndefined())
        })

    })

})