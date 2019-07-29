console.log('DEMO: find');

// El método find() devuelve el valor del primer elemento del array que cumple la función de prueba proporcionada. En cualquier otro caso se devuelve undefined.

// El valor del primer elemento del array que cumple la función de prueba proporcionada; de lo contrario, devuelve undefined.

var array = [1, 2, 3 , 4 , 5];
console.log('array', array);

var result = find(array, function(element) {return element < 10})

console.log(result)

// ---------

const inventario = [
    {nombre: 'manzanas', cantidad: 2},
    {nombre: 'bananas', cantidad: 0},
    {nombre: 'cerezas', cantidad: 5}
];

function esCereza(fruta) { 
    return fruta.nombre === 'cerezas';
}

console.log(inventario.find(esCereza));
// { nombre: 'cerezas', cantidad: 5 }