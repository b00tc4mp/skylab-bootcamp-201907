console.log("CONCAT DEMO");

var arr1=[1,2,3]
var arr2=[4,5,6]
var result=concatAll(arr1,arr2);

check(result, [1,2,3,4,5,6]);


/**Variables declaradas y no definidas */
var m;
try{
    concatAll(m)
}catch(error){
    console.log(error)
}

