logic.retrieveDuck = function(id, token, duckId) {
    let favorites

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(duckId, 'duck id')

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
            { 'authorization': `bearer ${token}` },
            undefined)
            .then(user => {
                if (user.status === 'KO') throw new Error(user.error)
                else favorites = user.data.favorites
            
                return call('http://duckling-api.herokuapp.com/api/ducks/' + duckId, 'get', undefined, undefined)
            })
            .then(duck => {
                if (duck.error) throw new Error(`cannot retrieve duck with id ${duckId}`)
                else if (favorites) {
                    duck.favorite =  favorites.includes(duckId)
                    return duck
                } 
            })  
    } else {
        validate.string(duckId, 'duck id')

        return call(`http://duckling-api.herokuapp.com/api/ducks/${duckId}`, undefined, undefined, undefined) 
            .then(duck => {
                if(duck.error) throw new Error(duck.error)
                else return duck
            })
    }
}