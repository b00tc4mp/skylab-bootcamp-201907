logic.retrieveLists = function(userId, userToken, movieId, expression) {
    const AUTH_ENDPOINT = 'https://skylabcoders.herokuapp.com/api/user/'

    //Input Validation
    validate.string(userId, 'id')
    validate.string(userToken, 'token')

    debugger
    /* Call retrieve user endpoint to extract their favorites */
    return call(`${AUTH_ENDPOINT}${userId}`, 'get', {'authorization': `bearer ${userToken}`}, undefined)
        .then(response => {
            if (response.status === 'KO') throw Error(response.error)
            let lists = response.data.lists

            !lists ? lists = [] : lists

            if (lists.length) {
                lists.forEach(list => list.inList = list.movies.includes(movieId))
                expression(lists)
            } else {
                expression(lists)
            }
        })
}

