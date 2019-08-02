//prettier-ignore

suite('flat', function () {
  var array = [1, 2, 3, ['a', 'b', 'c', [true, false, [undefined, null, [{}, function () { }, [NaN]]]]]];

  test('default', function () {
      var result = flat(array);
      checkArrays(result, [1, 2, 3, 'a', 'b', 'c', [true, false, [undefined, null, [{}, function () { }, [NaN]]]]]);
  });

  test('depth 2', function () {
      var result = flat(array, 2);
      checkArrays(result, [1, 2, 3, 'a', 'b', 'c', true, false, [undefined, null, [{}, function () { }, [NaN]]]]);
  });

  test('depth 3', function () {
      var result = flat(array, 3);
      checkArrays(result, [1, 2, 3, 'a', 'b', 'c', true, false, undefined, null, [{}, function () { }, [NaN]]]);
  });

  test('depth 4', function () {
      var result = flat(array, 4);
      checkArrays(result, [1, 2, 3, 'a', 'b', 'c', true, false, undefined, null, {}, function () { }, [NaN]]);
  });

  test('depth 5', function () {
      var result = flat(array, 5);
      checkArrays(result, [1, 2, 3, 'a', 'b', 'c', true, false, undefined, null, {}, function () { }, NaN]);
  });

  test('no array', flat, function (error) {
      check(error instanceof TypeError, true);
      check(error.message, 'undefined is not an array');
  });

  test('string as array', function () { flat('array'); }, function (error) {
      check(error instanceof TypeError, true);
      check(error.message, 'array is not an array');
  });

  test('boolean as array', function () {
      flat(true);
  }, function (error) {
      check(error instanceof TypeError, true);
      check(error.message, 'true is not an array');
  });
});
