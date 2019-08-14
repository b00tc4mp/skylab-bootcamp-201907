const http = require ('http')
const bl = require('bl')

const {argv:[, , url]}=process

http.get(url, response =>{
    response.pipe(bl((error,data) => {
        if (error) throw Error
    data=data.toString()
    console.log(data.length)
    console.log(data)

    }))
})