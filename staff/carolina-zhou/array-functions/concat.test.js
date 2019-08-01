suite('concat', function () {
    test('default', function () {

        var words1 = ["hola", "amiga"];
        var words2 = ["adios", "amigo"];
        var expected = ["hola", "amiga", "adios", "amigo"];
        var result =  concat(words1, words2);

        checkArrays(result, expected);
    });

    test('not an array', function () {
        concat("hola", ["amiguis", 3]);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'hola is not an Array');
    });
}); 