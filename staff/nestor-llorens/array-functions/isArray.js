function isarray(arr){
    if (Object.prototype.toString.call(arr) == '[object Array]') return true;
    else return false;
}