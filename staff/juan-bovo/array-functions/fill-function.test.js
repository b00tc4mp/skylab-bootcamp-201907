suite('fill', function(){
    var array1 = [1, 2, 3, 4];

        test('All parameters (mandatory and optional)', function(){
            var result1 = filljuan(array1, 0, 2, 4) //,); // expected output: [1, 2, 0, 0]
            checkArrays(result1, [1, 2, 0, 0]);
        })

        test('Mandatory start parameters', function() {
            var result2 = filljuan(array1, 5, 1) // expected output: [1, 5, 5, 5]
            checkArrays(result2, [1, 5, 5, 5]);
        })

        test('Just mandatory parameters', function(){
            var result3 = filljuan(array1, 6); // expected output: [6, 6, 6, 6]
            checkArrays(result3, [6, 6, 6, 6]);
        })

        test('Empty parameters', function(){
            filljuan();
        }, function(e) {
            check(e instanceof TypeError, true);
            check(e.message, 'filljuan debe contener al menos un array y un caracter');
        })

        test('first parameter is not an array', function(){
            filljuan('a string');
        }, function(e) {
            check(e instanceof TypeError, true);
            check(e.message, 'filljuan necesita que el primer parámetro sea un array');
        })

        test('start parameter is not number', function(){
            filljuan(array1, 'X', 'a string');
        }, function(e) {
            check(e instanceof TypeError, true);
            check(e.message, 'la posición inicial debe ser un número entero válido');
        })

        test('end parameter is not a number', function(){
            filljuan(array1, 'X', 1, 'a string');
        }, function(e) {
            check(e instanceof TypeError, true);
            check(e.message, 'la posición final debe ser un número entero válido');
        })

})