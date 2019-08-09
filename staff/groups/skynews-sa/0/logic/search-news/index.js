/**Function that searches for news from the option to select
 * @param {string} category   Type of news (business, heathl,...)
 * @param {string} country    Country where the news is published
 * @throws {error} no category inserted
 * @throws {error} wrong input value
 * @return {Object} array of object whit the news
 */
logic.searchNews= (category,country) => {
    let fieldC =`country=${country}&`
    
   if(!category) throw Error("no category or value inserted")
   if(!country) fieldC=""
   
   const url = `https://newsapi.org/v2/top-headlines?category=${category}&${fieldC}apiKey=c9813556fceb4eaf8db2c5d1638ab3fa`
    
    return call(url,"get",undefined,undefined)
        .then((response)=>{
            const {articles} =response
        if( articles.length< 1) throw new Error("wrong input value")
        return call(url,'get', undefined, undefined)
            .then(response => response.articles.filter(element => {
                return  element.description!=null && element.urlToImage!=null && element.urlToImage.trim()!=''  && element.content!=null && element.publishedAt!=null 
            }))})
        }