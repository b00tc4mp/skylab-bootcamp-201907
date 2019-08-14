const http = require('http')
const bl = require('bl') // Reminder: third-party package to abstract the difficulties involved in collecting an entire stream of data. Two different packages provide a useful API for solving this problem (there are likely more!): bl (Buffer List) and concat-stream. Both bl and concat-stream can have a stream piped in to them and they will collect the data for you. Once the stream has ended, a callback will be fired with the data.
const results = []
let count = 0

// FUNCTION ONE. Iterates through values in results array and logs them to the console.
// For loop is sequential. The iterator is only increased in value by one each time the loop runs.
function printResults () {
  for (let i = 0; i < 3; i++)
    console.log(results[i])
}

// FUNCTION TWO.
function httpGet (index) {
  // http.get method() from the core module: the three requested URLs are passed as the first argument; the second argument is a callback function that takes response as an argument.
  http.get(process.argv[2 + index], function (response) {
    // Inside of the callback function, the response.pip() method is used to pipe the body of the response to the bl() method from the ‘bl’ module.
    // The bl() method accepts a callback funciton as an argument.
    response.pipe(bl((err, data) => {
      if (err)
        return console.error(err)
 
      // The value of results at the index passed to httpGet (‘results[index’) is assigned the data from the callback.
      results[index] = data.toString()
      count++
      //Each time our callback inside of the bl() method is run, the value of the count variable is increased by 1.
      
 
      // If the value of count is equal to 3 for all three urls that are passed as arguments to this program, the printResults function is called.
      if (count == 3)
        printResults()
    }))
  })
}
 
// httpGet function accepts an index as an argument, which is used when the function is called at the end of the program. A for loop is used to iterate through values less than 3 in order to assign the appropriate index to variable i, which is passed to httpGet().
// To ensure that the results are logged to the console in the correct order: the for loop at the end of the program  iterates through the command line arguments in the correct order, and passes the iterator value to the httpGet function. This ensures that data is assigned to the ‘results’ array in the correct order. Finally, the for loop in the printResults function ensures that the results are logged to the console in the correct order.
for (let i = 0; i < 3; i++)
  httpGet(i)