suite('TEST join', function () {
    test('convert array to string by separator', function () {
        array = [1,2,3];
        separator = '/';
        var result = join(array, separator);
        check(result, '1/2/3');
    });
 
    test('convert array to string (comma is default separator)', function () {
        array = [1,2,3];
        var result = join(array);
        check(result, '1,2,3');
    });
 
    test('argument not an array should throw error', function() {
        array = 1;
        var result = join(array);
        check(result, '1,2,3');},
        function(error) {
            check(error.message,'argument is not an array');
        });
 
 
 
 
 
 });