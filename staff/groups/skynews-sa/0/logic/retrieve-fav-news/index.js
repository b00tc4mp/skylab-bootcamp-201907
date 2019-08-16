/** Function that retrieve the favs array of API
 * @param {number} id   Credential id for access the API
 * @param {number} token    Credential token for access the API
 * @throws {Error}  Error of user credentials
 * @return {Array} Array with favorites articles 
 */
logic.retrieveFavNews =  (id, token) => {
  validate.string(id, 'id')
  validate.string(token, 'token')

  return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
            if (response.status === 'KO') throw new Error(response.error)

            const favorites = response.data.favorites

            if (!favorites.length) return []

            return favorites
        })
}

