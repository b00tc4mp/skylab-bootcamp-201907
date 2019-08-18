let fs = require('fs')
let path = require('path')
const {argv: [, , folder, file]} = process
fs.readdir(folder,(error,list) =>{
    if (error) throw error
    list.forEach(element=>{
        res=path.extname(element)
        if(res===`.${file}`){
            console.log(element)
        }
    })
})