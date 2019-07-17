console.log('TEST: isarray');

try {
    isArray();
} catch (error) {
    console.log(error);
}

try {
    isArray(1);
} catch (error) {
    console.log(error);
}
