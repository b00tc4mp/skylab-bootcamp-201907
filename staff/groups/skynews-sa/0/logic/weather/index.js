/**Function that return Json of info to API weather
 * @param {number} latitude latitude of city
 * @param {number} longitude longitude of city
 * @return {Object} Json whit the info of API
 */
logic.weather= (latitude,longitude) => {
    if(latitude==undefined) latitude=41.390205
    if(longitude==undefined) longitude=2.154007
    const url = `https://bypasscors.herokuapp.com/api/?url=https://api.darksky.net/forecast/776931ab64cf18a6fc26dc860c9d2a9a/${latitude},${longitude}`
   
    return call(url,'get', undefined, undefined)
        .then(myJson =>{
            return myJson;
        })
    
        
}