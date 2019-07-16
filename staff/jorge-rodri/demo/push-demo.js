/* *
 * from()
 */
function fromD(arr, mp){
    let res=[];
    for(let i=0;i<arr.length;i++){
        res[i]=mp(arr[i]);
    }
    return res;
}
fromD([1,2,3], function(x){
    return x+1;
})
let x=0;
fromD([1,2,3], ()=>x+1);
/**
 * isArray()
 */
function isArrayD(arr){
    let res=arr instanceof Array;
    return res;
}
/**
 * of()
 */
function ofD(){
    let res=[];
    for(let i=0;i<arguments.length;i++){
        res[i]=arguments[i];
    }
    return res;
}
/**
 * concat()
 * duda Array.prototype
 */
function concatD(arr,arrC){
    let res;
    res=arrC+arr
    return res;
}
let b=["Jorge","es","el","puto","amo"]
let a=[1,2,3]
b.concatD(a)
/**
 * copyWhitin()
 */
function copyWhitinD(target,start,end,arr){
    let res=[];
    let count=0;
    for(let i=start;i<end+1;i++){
        aux[i]=arr[i];
    }
    for(let i=target;i<aux.length;i++){
        res[i]=aux[count++];
    }
    return res;
}
let arr=["a","b","c","d","e"];
arr.copyWhitinD(0,3,4);
/**
 * entries()
 */
function dEntries(arr){
    let res=[];
    for(let i=0;i<arr.length;i++){
        res[i]=i;
        res[i+1]=arr[i]; 
    }
    return res;
}
/**
 * fill()
 */
function dFill(value, start, end, arr){
    let res=arr;
    for(let i=start;i<(end+1);i++){
        res[i]=value;
    }
}
/**
 * includes
 */
function dIncludes(arr,searchElement, index){
    let res=false;
    for(let i=index;i<arr.length;i++){
        arr[i]==searchElement?res=true:null;
    }
    return res;
}
/**
 * join
 */
function dJoin(arr){
    let res="";
    for(let i=0;i<arr.length;i++){
        res+=arr[i]
        i<arr.length-1?res+=",":null;
    }
    return res;
}
dJoin([5,"Jorge",2])
/**
 * filter
 */
function dFilter(arr, fn){
    let res=[];
    let count=0;
    for(let i=0;i<arr.length;i++){
        if(fn(arr[i])){
            res[count++]=arr[i];
        }else{
            continue;
        }
    }
    return res;
}
/**
 * find()
 */
function dFind(arr, fn){
    let res;
    for(item in arr){
        if(fn(arr[item])){
            res=arr[item];
            break;
        }
    }
    return res;
}
/**
 *findIndex()
 */
function dFindIndex(arr, fn){
    let res=0;
    for(item in arr){
        console.log("item: "+item);
        if(fn(arr[item])){
            res=item;
            break;
        }
    }
}
/**
 * forEach()
 */
function dForEach(arr, expression){
    for(let i=0;i<arr.length;i++){
        expression(arr[i]);
    }
}
/** 
 * sort
 */
function dSort(arr){
    let res;
    let l=arr.length;
    for(let i=0;i<l;i++){
        for(let j=0;j<l-1-i;j++){
            if(arr[j]>arr[j+1]){
                [ arr[j], arr[j+1] ]=[ arr[j+1], arr[j] ];
            }
        }
    }
    return arr;
}
