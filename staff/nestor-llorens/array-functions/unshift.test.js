describe ('unshift', function() {
    it('pushes arguments on initial position of array and returns length', function () {
        arr = [4,5];
        var result = unshift(arr, 1,2,3);
        expect(result, 5);
        expect(arr, [1,2,3,4,5])
    });
});
