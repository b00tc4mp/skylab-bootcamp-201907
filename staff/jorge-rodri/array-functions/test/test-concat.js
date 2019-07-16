var result=concatD([1,2,3],[4,5,6])
function checkConcat(expect,res){
    if(expect.toString()!==res.toString())
        console.error("error");
}

checkConcat([1, 2, 3, 4, 5, 6], result)