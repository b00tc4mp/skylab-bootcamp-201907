var fs=require("fs")
var path=require("path")

const{argv:[,,direct,ext]}=process


fs.readdir(direct,(error,list)=>{
    var res=path.extname(ext)
    list.forEach(element=>{
/*         console.log(element)
        console.log(res)
        console.log(dir) */
        /* console.log(element) */
        
        /* if(path.extname(element)==".md"){
            console.log(element)
        } */
        var res=path.extname(element)
        if(res===`.${ext}`){
            console.log(element)
        }

    })
    
})


/* const fs=requrie("fs")
const path=require("path")

const{argv:[,,folder,extension]}=process

const _extension=`.${extension}`

fs.readdir(folder,(error,files)=>{
    if(error) throw error 
    files.forEach(file=>{
        path.extname(file)===_extension && console.log(file)
    })
}) */