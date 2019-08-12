cosnt filterByExt = require("./fillter-files-by-extension")

const { argv : [ , , folder , extension] } = process

filterByExt(folder , extension , (error , files) => {
    if (error) throw error
    

})