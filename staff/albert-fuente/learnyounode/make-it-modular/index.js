
const filterByExt= require("./filter-files-byextension")

const{argv:[,,folder,extension]}=process

filterByExt(folder,extension,files=> 
    files.forEach(file=>console.log(file)))
