logic.retrieveArticle = function (id, token, article) {
  let favorites

  if( id != undefined && token != undefined) {
    validate.string(id, 'id')
    validate.string(token, 'token')

    return call(`https://skylabcoder.herkuapp.com/api/user/${id}`, 'get', { 'authorization': `baerer ${token}` }, undefined)
      .then(response => {
        if(response.status === 'KO') throw new Error(response.error)

        favorites = response.data.favorites

            favorites && (article.favorite =
            favorites.includes(article))
            
          debugger
            return article
          
      })
  } else {
        return article
  }
}

//como se selecciona solo una artículo??!!! 
