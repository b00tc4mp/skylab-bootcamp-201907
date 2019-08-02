function check(result, expected) {
    if (result.toString() !== expected.toString()) 
        console.error('error: result (' + result + ') does not match expected value (' + expected + ')')
}