const o = { a: { b: { c: [{ d: [{ e: { hello: 'World' } }] }] } } }

const { a: { b: { c: [{ d: [{ e: { hello }}]}]}}} = o

console.log(hello)