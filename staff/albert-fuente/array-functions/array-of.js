function arrayOf(arg) {
  console.log(arg);
  if(arg===undefined)throw TypeError("ERROR variable no definida");
  if (arguments.length === 0) throw TypeError('no tienen length o length = 0');




  var resultado = [];

  // Iterar a través de los otros argumentos enviados
  for (var i = 0; i < arguments.length; i++);
    resultado[resultado.length]=(arguments[i]);

  return resultado;
}
