'use strict';

suite('Map', function () {
  test('Multiply numbers by 10', function () {
    var array = [1, 2, 3];

    var coeficient = 10;

    var result = map(array, function (value) {
      return value * coeficient;
    });

    checkArrays(result, [10, 20, 30])

  });

  test('Add <>', function () {
    var array = ["1", "2", "3"];

    var result = map(array, function (value) {
      return "<" + value + ">";
    });
    checkArrays(result, ["<1>", "<2>", "<3>"]);
  });

  test('Return value - index', function () {
    var array = [1, 2, 3];

    var result = map(array, function (value, index, array) {
      return value + "-" + index + "-" + array;
    });

    checkArrays(result, ["1-0-1,2,3", "2-1-1,2,3", "3-2-1,2,3"]);
  })

  test('No arguments', function () {
    map();
  }, function (error) {
    check(error instanceof TypeError, true);
    check(error.message, 'missing argument 0 when calling function Map')
  });

  test('not a function', function () {
    var array = [1, 2, 3]
    map(array, null);
  }, function (error) {
    check(error instanceof TypeError, true);
    check(error.message, 'null is not a function')
  });

  test('not an array', function () {
    map(1, function () { });
  }, function (error) {
    check(error instanceof TypeError, true);
    check(error.message, '1 is not an array')
  });

})








