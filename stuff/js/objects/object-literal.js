var o = {
    a: 1,
    0: 'b',
    'hola mundo': 'hello world',
    person: { name: 'John', surname: 'Doe' }
};

console.log(o.a);
console.log(o[0]);
console.log(o['hola mundo']);
console.log(o.person.name);
console.log(o['person'].name);
console.log(o['person']['name']);
console.log(o.person['name']);

