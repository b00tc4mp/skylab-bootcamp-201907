const fs = require('fs') //et diu el archiu que estas treballant
const path = require('path') //et diu la extensio dela rchiu que vols
 
const { argv: [,, folder, extension]} = process //destructuring del process.argv

// const folder = process.argv[2]
// const ext = '.' + process.argv[3]


fs.readdir(folder, (err, files) => { /**readdir es per cridar si es async o sinc */
  if (err) throw Error ('error')
  files.forEach((file) => {
      (path.extname(file) === `.${extension}`) && console.log(file)  //extname extreu el path del archiu, pero amb el '.'
                                            //com un if
      
  })
})