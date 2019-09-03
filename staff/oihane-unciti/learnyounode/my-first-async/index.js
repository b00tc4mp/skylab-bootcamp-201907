var fs = require('fs')  
       



fs.readFile(process.argv[2] , "utf8", (error, data) => {
    if (error) throw error
        
    var content = data.toString().split('\n').length - 1 
    
    console.log(content)
});

