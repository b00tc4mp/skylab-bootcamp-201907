logic.retrieveArticle = function (id, token, article) {
  let favorites

  if( id != undefined && token != undefined) {
    validate.string(id, 'id')
    validate.string(token, 'token')
    validate.string(article, 'article')

    return call(`https://skylabcoder.herkuapp.com/api/user/${id}`, 'get', { 'authorization': `baerer ${token}` }, undefined)
      .then(response => {
        if(response.status === 'KO') throw new Error(response.error)

        favorites = response.data.favorites

        return call(`https://newsapi.org/v2/top-headlines?category=${value}&country=gb&apiKey=c9813556fceb4eaf8db2c5d1638ab3fa`, 'get', undefined, undefined)
          .then(article => {
            if(article.error) throw new Error (article.error)

            favorites && (article.favorite =
            favorites.includes(article))

            return article
          })
      })
  } else {
    validate.string(article, 'article')

    return call(`https://newsapi.org/v2/top-headlines?category=${value}&country=gb&apiKey=c9813556fceb4eaf8db2c5d1638ab3fa`, undefined, undefined, undefined)
      .then(article => {
        if(article.error) throw new Error(article.error)

        return article
      })
  }
}

//como se selecciona solo una artículo??!!! 
