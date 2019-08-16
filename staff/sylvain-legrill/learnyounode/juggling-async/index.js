const http = require('http');
const bl = require('bl');

let urls = process.argv.slice(2)
let count = urls.length;

let results = [];

urls.forEach((url, index) => {
    http.get(url, (res) => {
        res.pipe(bl((err, data) => {
            if (err) throw err;

            results[index] = data.toString();
            count--;

            if (count == 0) {
                results.forEach((result) => {
                    console.log(result)
                });
            }
        }))
    })
})