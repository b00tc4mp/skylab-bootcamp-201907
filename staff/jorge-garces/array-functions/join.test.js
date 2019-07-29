suite('join', function() {
  test('call the function with no arguments', function() {
    var elements = ['Fire', 'Air', 'Water'];

    var result = join(elements);

    check(result, 'Fire,Air,Water');
  });

  test('call the function with argument "@"', function() {
    var elements = ['Fire', 'Air', 'Water'];

    var result = join(elements, '@');

    check(result, 'Fire@Air@Water');
  });

  test('array has only one index', function() {
    var elements = ['Fire'];

    var result = join(elements);

    check(result, 'Fire');
  });

  test(
    'input is not an array',
    function() {
      join(1);
    },
    function(error) {
      check(error instanceof TypeError, true);
      check(error.message, '1 is not an array');
    }
  );
});
