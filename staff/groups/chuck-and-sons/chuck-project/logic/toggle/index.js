logic.toggleFavoriteItem = function(id , token , idItem){
    validate.str(id , 'id')
    validate.str(token , 'token')
    validate.str(idItem , 'idItem')

    return call(`https://skylabcoders.herokuapp.com/api/user/${id}` , 'get', {'authorization' : `bearer ${token}` , undefined})
    .then(response => {
        if (response.status === 'KO') throw Error (response.error)
        
        const favorites = response.data.favorites
        const index = favorites.findIndex(favorite => favorite === idItem)

        if(index > -1){
            favorites.splice(index , 1)
            
            return call(`https://skylabcoders.herokuapp.com/api/user/${id}` , 'put' , {'content-type' : 'application/json' , 'authorization' : `bearer ${token}`} , {favorites})
            
            .then(response => {
                if (response.status === 'KO') throw Error (response.error)
            })
        }else{
            return call(`https://api.chucknorris.io/jokes/${idItem}` , 'get' , undefined , undefined)
            .then(joke => {
                if(joke.error === "Not Found") throw new Error (joke.error)

                favorites.push(joke.id)
                
                return call(`https://skylabcoders.herokuapp.com/api/user/${id}` , 'put' , {'content-type' : 'application/json' , 'authorization' : `bearer ${token}`} , {favorites})
            })
        }
    })
}