function check(result,expected){
    if(result.toString()!==expected.toString()){
        console.error("ERROR not expected values "+ expected);
    }else{
        console.log('%c a CORRECT', 'background: green; color: white; display: block;', expected)
    }
}
