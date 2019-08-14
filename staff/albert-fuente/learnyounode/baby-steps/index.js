const sum=process.argv.slice(2)

const res=sum.reduce((acc,value)=>acc+Number(value),0)

console.log(res)