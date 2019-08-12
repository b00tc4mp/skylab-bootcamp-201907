const FilterFilesByExtension=require("./filter-files-byextension")

const{argv:[,,folder,extension]}=process 

FilterFilesByExtension(folder,extension,(error,files)=>{
    if(error) throw error 

    files.forEach(file=>console.log(file))
})