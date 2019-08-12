const filterByExt = require("./filter-files-by-extension")

const { argv : [ , , folder , extension] } = process

filterByExt(folder , extension , (error , files) => {
    if (error) throw error
    files.forEach(file => console.log(file))

})