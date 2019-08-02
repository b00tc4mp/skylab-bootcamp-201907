suite('reduceRight', function () {

    test('default', function () {

        var array = ['A', 'B', 'C'];
        var expected = 'CBA';
        var result = '';
        
        result = reduceRight(array, function (empty, current) {
            return empty + current;
        });
        for (var i in result) {
            check(result[i], expected[i]);
        }
        
    });

});