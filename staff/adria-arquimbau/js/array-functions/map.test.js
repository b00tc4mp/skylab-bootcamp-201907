console.log('TEST: map')

try {
    map();
} catch (error) {
    console.log(error);
}

try {
    map(true);
} catch (error) {
    console.log(error);
}

try {
    map([1, 2, 3, 4], true);
} catch (error) {
    console.log(error);
}

