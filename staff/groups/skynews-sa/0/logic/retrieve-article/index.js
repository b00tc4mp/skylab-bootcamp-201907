logic.retrieveArticle = (id, token, article) => {
  let favorites
  let index=-1
  if( id != undefined && token != undefined) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    return call(`https://skylabcoders.herokuapp.com/api/user/${id}`, 'get', { 'authorization': `bearer ${token}` }, undefined)
        .then(response => {
        if(response.status === 'KO') throw new Error(response.error)
        favorites = response.data.favorites
        favorites && (index = favorites.findIndex((favorite)=>{return favorite.url==article.url}))
        if(index>-1){article.favorite=true} else {article.favorite=false}
        return article
      })
  } else {
        return article
  }
}