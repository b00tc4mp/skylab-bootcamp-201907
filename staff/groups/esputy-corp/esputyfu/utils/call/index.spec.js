{
    describe('utils - call', () => {
        describe('api spotify get token', () => {
            it('should succeed on correct data', () =>
                call(`http://skylabcoders.herokuapp.com/proxy?url=https://accounts.spotify.com/api/token`,
                    'post',
                    {
                        'Authorization': `Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk=`,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    'grant_type=client_credentials')
                    .then(res => {
                        expect(res).toBeDefined()
                    })

            )
        })

        describe('spotify api get tracks', () => {
            let _token
            
            beforeEach(() =>
                //get new token
                fetch(`http://skylabcoders.herokuapp.com/proxy?url=https://accounts.spotify.com/api/token`,
                    {method: 'post',
                    headers: {'Authorization': `Basic NTQ3N2NhOWQ5NmY2NDZhMmI4NjQ0M2M0MDBmY2FlZDA6OTA4YmI2MGJlMTIyNGJkOTkzZmZjZDY2NWVmNDU5ZDk=`,
                    'Content-Type': 'application/x-www-form-urlencoded'},
                    body:'grant_type=client_credentials'}
                ).then(res => res.json())
                .then(res => _token = res.access_token)
            )

            it('should succeed on correct data', () =>
                call(`https://api.spotify.com/v1/search?q=wonderwall&type=track`,
                    'get',
                    { 'Authorization': `Bearer ${_token}` },
                    undefined,
                    )

                    .then(res => {
                        expect(res).toBeDefined()
                        expect(res.tracks.items.length).toBe(20)
                    })

            )

        })

        describe('skylab api methods tests', () => {
            let body

            let _body
            beforeEach(() =>

                body = {
                    username: `esputy-${Math.random()}`,
                    password: `esputy-${Math.random()}`
                }
            )

            _body = JSON.stringify(body)

            
            it('post should succeed on correct data', () => {
                return call('https://skylabcoders.herokuapp.com/api/user',
                    'post',
                    { 'content-type': 'application/json' },
                    _body)
                        .then(res => expect(res).toBeDefined())

                }
            )

            it('get should succeed on correct url and method', () => {
                return call('https://skylabcoders.herokuapp.com/api/users',
                    'get',
                    undefined,
                    undefined)

                    .then(res => expect(res).toBeDefined())

        })

        //TODO: PATCH, PUT, DELETE
        })

    })
}