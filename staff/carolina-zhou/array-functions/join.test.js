console.log('TEST join');

var elements = ['Fire', 'Air', 'Water'];

var result = join(elements);
check(result, "Fire,Air,Water");

var result = join(elements, '@');
check(result, "Fire@Air@Water");