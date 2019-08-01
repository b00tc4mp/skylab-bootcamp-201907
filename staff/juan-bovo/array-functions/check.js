// previous version:
// function check(result, expected) {
//     if (result.toString() !== expected.toString()) console.error('error: result does not match expected value, wacho!')
// }

function check(result, expected) {
    if (result.toString() !== expected.toString()) 
        console.error('error: result (' + result + ') doesnt match expected value (' + expected + ')');
};