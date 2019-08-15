{

    const { random } = Math
    
    
    describe('call', () => {
        describe('post', () => {
            it('should succeed on coherent data', () => {
                return call('https://skylabcoders.herokuapp.com/api/user', 'post', { 'content-type': 'application/json' }, {
                    username: `pepito-${Math.random()}`,
                    password: 'grillo'
                })
                    .then(res => expect(res).toBeDefined())
                    .catch(error => expect(error).toBeUndefined())
            })
        })
    
        describe('get', () => {
            it('should succeed on coherent data', () => {
                return call('https://api.giphy.com/v1/gifs/search?api_key=yXEKD5c78ISwI8WSOKyTndpHZH9XpqQW&q=white&limit=25&offset=0&rating=G&lang=en', 'get', undefined, undefined)
                    .then(res => res.data)
                    .then(res => expect(res).toBeDefined())
                    .catch(error => expect(error).toBeUndefined())
            })
        })
    
        describe('put', () => {
            it('should succeed on coherent data', () => {
                return call('https://reqres.in/api/users/2', 'put', undefined, {
                    "name": "Janet",
                    "last_name": "Weaver"
                })
                    .then(res => expect(res).toBeDefined())
                    .catch(error => expect(error).toBeUndefined())
            })
        })
        describe('patch', () => {
            it('should succeed on coherent data', () => {
                return call('https://reqres.in/api/users/2', 'put', undefined, {
                    "name": "Janet",
                    "last_name": "Weaver"
                })
                    .then(res => expect(res).toBeDefined())
                    .catch(error => expect(error).toBeUndefined())
            })
        })
        
    })
    
        
    
        describe('delete', () => {
            let user
            let credentials
    
            beforeEach(() => {
                user = {
                    name: 'LePink-' + random(),
                    surname: 'Martini-' + random(),
                    username: 'lepinkmartini-' + random() + '@mail.com',
                    password: 'zzz-' + random(),
                    favorites: []
                }
                console.log(user.name)
                console.log(user.surname)
                console.log(user.username)
                console.log(user.password)
    
                return call('https://skylabcoders.herokuapp.com/api/user', 'post', {
                        'content-type': 'application/json'
                    }, user)
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
                        else return call('https://skylabcoders.herokuapp.com/api/auth', 'post', {
                            'content-type': 'application/json'
                        }, {
                            username: user.username,
                            password: user.password
                        })
                    })
                    .then(response => {
                        if (response.status === 'KO') throw new Error(response.error)
    
                        credentials = response.data
                    })
            })
    
                it('should suceed on delete the user', () => {
                    return call(`https://skylabcoders.herokuapp.com/api/user/${credentials.id}`, 'delete', {
                            'authorization': `bearer ${credentials.token}`,
                            'content-type': 'application/json'
                        }, {
                            username: user.username,
                            password: user.password
                        })
                        .then(response => {
                            if (response.status === 'KO') throw new Error(response.error)
                        })
                        .then(username => expect(username).toBeUndefined())
                        .then(password => expect(password).toBeUndefined())
                })
        })
    
    
    
    
    
    
    }