logic.searchNews= (category,country) => {
    let fieldC =`country=${country}&`
    
    /*     https://newsapi.org/v2/top-headlines?category=${value}&country=gb&apiKey=c9813556fceb4eaf8db2c5d1638ab3fa
    */
   if(!category) throw TypeError("no category or value inserted")
   if(!country) fieldC=""
   
   const url = `https://newsapi.org/v2/top-headlines?category=${category}&${fieldC}apiKey=c9813556fceb4eaf8db2c5d1638ab3fa`
    
    return call(url,"get",undefined,undefined)
        .then((response)=>{
            const {articles} =response
        if( articles.length< 1) throw new Error("wrong input value")
        return call(url,'get', undefined, undefined)
            .then(response => response.articles.filter(element => {
                return element.description!=null && element.urlToImage!=null && element.content!=null && element.publishedAt!=null
            }))})
        /* .then(error=undefined) */
        }