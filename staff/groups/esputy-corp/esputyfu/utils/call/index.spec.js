describe('call', () => {
    
    describe('api spotify', () => {
        const token = "BQDprgWYDeLRDbylEF46HRaOR6zU4n2uMhb-Rrsa8u_Q0-Xmby_S9KOBjmhfKHwxlNAi8QcJQ8AE8kpkXS8"
        const query = 'wonderwall'
        const types = 'track'
        // const num = '30'

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