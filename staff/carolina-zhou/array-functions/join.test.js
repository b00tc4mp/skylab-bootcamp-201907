suite('join', function () {
  test('default 1', function () {

      var array = ['Fire', 'Air', 'Water'];
      var expected = "Fire,Air,Water";
      var result = join(array);

      check(result, expected);
  });

  test('default 2', function () {

    var array = ['Fire', 'Air', 'Water'];
    var expected = "Fire@Air@Water";
    var result = join(array, '@');

    check(result, expected);
  });

    test('not an array', function () {
        join(1);
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, '1 is not an array');
    });

    test('no arguments', function () {
        join();
    }, function (error) {
        check(error instanceof TypeError, true);
        check(error.message, 'missing argument 0 when calling function join');
    });
});  
  
