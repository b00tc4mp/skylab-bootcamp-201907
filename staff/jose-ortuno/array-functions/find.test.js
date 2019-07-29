console.log('DEMO: find');
// El método find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada. En cualquier otro caso se devuelve undefined.

suite('find function', function () {
    test('happy path with array', function () {
    var array = [1, 2, 3 , 4 , 5];

    var result = find(array, function(element) {return element < 10})

    check(result, 1);
    })

    // test('find function object', function () {
    //     const inventario = [
    //         {nombre: 'manzanas', cantidad: 2},
    //         {nombre: 'bananas', cantidad: 0},
    //         {nombre: 'cerezas', cantidad: 5}
    //     ];
        
    //     function esCereza(fruta) { 
    //         return fruta.nombre === 'cerezas';
    //     }
        
    //     var result = inventario.find(esCereza);

    //     checkArrays(result, { nombre: 'cerezas', cantidad: 5 })
    // })

    // test('missing arguments', function () {
    //     result()
    // }, function (error) {
    //     check(error instanceof TypeError, true);
    //     check(error.message, 'missing argument when calling function find')
    // });
});
