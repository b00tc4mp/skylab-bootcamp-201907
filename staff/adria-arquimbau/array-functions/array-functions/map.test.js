console.log("Test map")

try {
    map()
} catch (error) {
    console.log(error)
}

try {
   map(1) 
} catch (error) {
    console.log(error)
    
}

try {
    map([1,2,3], 1)
} catch (error) {
    console.log(error)
}