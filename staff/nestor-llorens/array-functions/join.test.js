describe('join', function () {
    it('convert array to string by separator', function () {
        array = [1,2,3];
        separator = '/';
        var result = join(array, separator);
        expect(result, '1/2/3');
    });

    it('convert array to string (comma is default separator)', function () {
        array = [1,2,3];
        var result = join(array);
        expect(result, '1,2,3');
    });

    it('argument not an array should throw error', function() {   
        array = 1;
        var result = join(array);
        expect(result, '1,2,3');},
        function(error) {
            expect(error.message,'argument is not an array')
        });
});
