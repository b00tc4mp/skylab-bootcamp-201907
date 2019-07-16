/**
 * fill()
 */
function dFill(value, start, end, arr){
    let res=arr;
    for(let i=start;i<(end+1);i++){
        res[i]=value;
        checkFill(res[i], value)
    }
}