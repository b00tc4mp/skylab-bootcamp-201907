logic.searchDucks = function(id, token, query) {
    let favorites

    if (id != undefined && token != undefined) {
        validate.string(id, 'id')
        validate.string(token, 'token')
        validate.string(query, 'query', false)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
            { 'authorization': `bearer ${token}` }, undefined)
            .then(response => {
                if (response.status === 'KO') throw new Error(response.error)
                else {favorites = response.data.favorites

                    return call('http://duckling-api.herokuapp.com/api/search?q=' + query, 'get', undefined, undefined)
                    .then(response => {
                        if (response.error) throw new Error(`fail search with criteria ${query}`)
                        else {
                            favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))
                        }
                    })
                }
            }
        )
    } else {
        validate.string(query, 'query', false)
        return call(`http://duckling-api.herokuapp.com/api/search?q=${query}`, 'get')
        .then(response => {
            if (response.error) throw new Error(`fail search with criteria ${query}`)
            else {
                favorites && response.forEach(duck => duck.favorite = favorites.includes(duck.id))
                return response
            }
        })
    }
}

// logic.searchDucks = function(id, token, query, expression) {
//     let favorites

//     if (id != undefined && token != undefined) {
//         validate.string(id, 'id')
//         validate.string(token, 'token')
//         validate.string(query, 'query', false)
//         validate.function(expression, 'expression')

//         call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get',
//             { 'authorization': `bearer ${token}` },
//             undefined,
//             (error, response) => {
//                 if (error) expression(error)
//                 else if (response.status === 'KO') expression(new Error(response.error))
//                 else {
//                     favorites = response.data.favorites

//                     call('http://duckling-api.herokuapp.com/api/search?q=' + query, 'get', undefined, undefined, (error, ducks) => {
//                         if (error) expression(new Error(`fail search with criteria ${query}`))
//                         else {
//                             if (ducks.error) expression(undefined, [])
//                             else {
//                                 favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))

//                                 expression(undefined, ducks)
//                             }
//                         }
//                     })
//                 }
//             }
//         )
//     } else {
//         validate.string(query, 'query', false)
//         validate.function(expression, 'expression')

//         call('http://duckling-api.herokuapp.com/api/search?q=' + query, 'get', undefined, undefined, (error, ducks) => {
//             if (error) expression(new Error(`fail search with criteria ${query}`))
//             else {
//                 if (ducks.error) expression(undefined, [])
//                 else {
//                     favorites && ducks.forEach(duck => duck.favorite = favorites.includes(duck.id))

//                     expression(undefined, ducks)
//                 }
//             }
//         })
//     }
// }