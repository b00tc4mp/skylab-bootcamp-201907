logic.searchNews= (value) => {
    const url = `https://newsapi.org/v2/top-headlines?category=${value}&country=gb&apiKey=c9813556fceb4eaf8db2c5d1638ab3fa`

    if(value.length < 1) throw new Error("no value inserted")
    
    return call(url,"get",undefined,undefined)
        .then((response)=>{
        if(response.articles.length < 1) throw new Error("wrong input value")
        return call(url,'get', undefined, undefined)
            .then(response => response.articles.filter(element => {
                return element.description!=null && element.urlToImage!=null && element.content!=null && element.publishedAt!=null
            }))})
        }