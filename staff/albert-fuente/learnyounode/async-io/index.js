var fs=require("fs")
var regex=/\r?\n/g


    

//FIRST SOLUTION
/* fs.readFile(process.argv[2],"utf8", (err,res)=>{
    var res=res.toString().split("\n")
    console.log(res.length-1)
}) */

//SECOND SOLUTION
/* fs.readFile(process.argv[2],"utf8", (err,data)=>{
    var content=data.toString()
    console.log(content.match(regex).length)
})
 */
//THIRD SOLUTION
const {argv:[,,file]}=process

fs.readFile(file,"utf8",(error,content)=>{
    if(error) throw error 
    const lines=content.match(regex).length
    console.log(lines)
})