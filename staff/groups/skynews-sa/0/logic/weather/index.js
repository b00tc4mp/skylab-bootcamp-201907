logic.weather= (latitude,longitude) => {
    if(latitude==undefined) latitude=41.390205
    if(longitude==undefined) longitude=2.154007
    const url = `https://bypasscors.herokuapp.com/api/?url=https://api.darksky.net/forecast/776931ab64cf18a6fc26dc860c9d2a9a/${latitude},${longitude}`

/*     https://newsapi.org/v2/top-headlines?category=${value}&country=gb&apiKey=c9813556fceb4eaf8db2c5d1638ab3fa
 */
   
    return call(url,'get', undefined, undefined)
        .then(myJson =>{
            return myJson;
        })
    
        
}