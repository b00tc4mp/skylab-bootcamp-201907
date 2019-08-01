describe ('isarray', function() {
    it('if output is an array (true) or not (false)', function () {
        arr = [4,5];
        var result = isarray(arr);
        expect(result, true);
    });
});
