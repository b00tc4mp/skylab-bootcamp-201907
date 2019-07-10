// mètode d'identificació d'usuari
var getURLparameters = function(){
    var query = window
                .location
                .search
                .substring(1)
                .split('=');
    var userName = decodeURI(query[1]);
    return userName;
};