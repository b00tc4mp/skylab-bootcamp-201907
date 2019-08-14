function Search(query){
    return `<form action="/search">
                    <input type="text" name="q" id="q" value="${query || ''}">
                    <br/>
                    <button>Search</button>
                </form> `
} 

module.exports = Search