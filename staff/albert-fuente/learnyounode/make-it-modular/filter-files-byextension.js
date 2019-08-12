var fs=require("fs")
var path=require("path")

function filterFilesByExtension(folder,extension,callback){

    fs.readdir(folder,(error,files)=>{
        if(error) return console.error(error
            
            const _extension=`.${ext}`
            
            const filtered=files.filter(file=>
                path.extname(file)===_extension)
        callback(filtered)
    })
}

module.exports=filterFilesByExtension

