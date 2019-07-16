console.log("FILTER DEMO");





var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
console.log(words, " these are the initial values")

// const result = words.filter(word => word.length > 6);

var result=(filter(words,"limit"));
check(result,["limit"])
