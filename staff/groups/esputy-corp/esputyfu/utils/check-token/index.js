const checkToken = (token) => 
call(`https://api.spotify.com/v1/search?q=wonderwall&type=track`,
    'get', 
    { 'Authorization': `Bearer ${token}` }, 
    undefined,
    'spotify')
    .then(res => {
        if (res.error) throw Error(res.error.message)
    })
