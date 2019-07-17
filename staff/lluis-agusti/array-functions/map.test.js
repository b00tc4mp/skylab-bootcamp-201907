console.log("map test");



// Caso 1:

try {
    map();
} catch (error) {
    console.log(error);
}


// Caso 2:

try {
    map(true);
} catch (error) {
    console.log(error);
}


// Caso 3:
try {
    map([1, 2, 3, 4], true);
} catch (error) {
    console.log(error);
}