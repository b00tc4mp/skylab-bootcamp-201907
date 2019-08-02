function fromD(item, expression) {
  if (item == undefined && expression==undefined) throw ReferenceError("Error de referencia");
  if (!(item instanceof number)|| !(item instanceof String) || !(item instanceof Boolean) ) throw TypeError ("Error de tipo");
  
    var  result = [];

   
        
    
        for(var i =0; i<item.length; i++){
            result = expression(item[i])
        }
    

    return result;
} 

