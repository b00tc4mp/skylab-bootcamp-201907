suite('map', function() {
  test('add 10 to each array element', function() {
    var array = [1, 2, 3];

    var coeficient = 10;

    var result = map(array, function(value) {
      return value * coeficient;
    });

    checkArrays(result, [10, 20, 30]);
  });

  test('enclose each array elemnt in <>', function() {
    array = ['1', '2', '3'];

    var result = map(array, function(value) {
      return '<' + value + '>';
    });

    checkArrays(result, ['<1>', '<2>', '<3>']);
  });

  test('separate each array element with "-"', function() {
    array = [1, 2, 3];

    var result = map(array, function(value, index, array) {
      return value + '-' + index + '-' + array;
    });
    checkArrays(result, ['1-0-1,2,3', '2-1-1,2,3', '3-2-1,2,3']);
  });

  test(
    'input is not an array',
    function() {
      map(1);
    },
    function(error) {
      check(error instanceof TypeError, true);
      check(error.message, '1 is not an array');
    }
  );
});