const arraySum = process.argv.slice(2)
let num= 0
arraySum.forEach(element => {
   num+=Number(element)
});
console.log(num)