console.log('DEMO: entries method');

var a = ['a', 'b', 'c'];
var iterator = a.entries();

for (let e of iterator) {
    console.log(e)  
}
console.log('expected method:\n[0, "a"]\n[1, "b"]\n[2, "c"]');