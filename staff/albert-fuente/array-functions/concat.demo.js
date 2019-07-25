function concat (arr,...arg) {
    if (arg.length === 0) throw TypeError (`missing argument when calling function concat`);
    if (arg.length === 1) throw TypeError (`missing argument two when calling function concat`);
    var res=arr;//se refiere al this del Curray cuando lo creamos ejemplo: c.concat(a) siendo c un Curray()
    for(var i=0;i<arr.length;i++){
        res[arr.length++]=arr[i];
    }
    return res;
}