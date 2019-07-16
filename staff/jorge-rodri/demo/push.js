function dForEach(arr, fn){
    let res=0;
    for(let i=0;i<arr.length;i++){
        res=fn(arr[i])
    }
}
dForEach([3, 5, 6], function(x){
    return x+x;
})