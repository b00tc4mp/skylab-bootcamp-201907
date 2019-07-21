var array1 = ['one', 'two', 'three'];
var array2 = [];

function test(){
    for(var i=0; i<array1.length; i++){
        array2[i] = array1.pop();
    }
    console.log(array2);
}
test();

Curray.prototype.reverse = function (){
    var result = "";
    for (var i = this.length; i > 0; --i) { 
        if(i != 0){
            result += this[i] + ",";
        }else{
            result += this[i];
        }
        
    } 
    return result;  
} 