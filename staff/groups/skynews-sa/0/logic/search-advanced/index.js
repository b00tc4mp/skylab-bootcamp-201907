/**Function that search news for query
 * @param {string} query    value of search in API
 * @throws {error} bad query value inserted
 * @return {Array} array of news
 */
logic.searchNewsAdvanced = (query) => {

    if (!query) throw Error("no query inserted")

    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=0b43829c3b6049768d553a6c5a839dea`

    return call(url, "get", undefined, undefined)
        .then((response) => {
            const { articles } = response
            if (articles.length < 1) throw new Error("wrong input value")
            return call(url, 'get', undefined, undefined)
                .then(response => response.articles.filter(element => {
                    return element.description != null && element.urlToImage != null && element.urlToImage.trim() != '' && element.content != null && element.publishedAt != null
                }))
        })
} 