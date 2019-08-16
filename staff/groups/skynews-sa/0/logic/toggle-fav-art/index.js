/**Function that agree favourite new in array of API
 * @param {number} id   Credential id for access the API
 * @param {number} token    Credential token for access the API
 * @throws {Error}  Error of user credentials
 */
logic.toggleFavArt =  (id, token, article) => {
  validate.string(id, 'id')
  validate.string(token, 'token')

  return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
    .then(response => {
      if(response.status === 'KO') throw new Error (response.error)
      
      const favorites = response.data.favorites

      const index = favorites.findIndex(favorite => favorite.url === article.url)

      if(index > -1) {
        favorites.splice(index, 1)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', {'content-type' : 'application/json', 'authorization': `bearer ${token}`}, {favorites})
        
        .then(response => {
          if(response.status === 'KO') throw new Error (response.error) 
        })

      } else {
        article.favorite=true
        favorites.push(article)

        return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'put', {'content-type' : 'application/json', 'authorization': `bearer ${token}`}, {favorites})

          .then(response => {
            if(response.status === 'KO') throw new Error (response.error)
          })
      }
    })
}
