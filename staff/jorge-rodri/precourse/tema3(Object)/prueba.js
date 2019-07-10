var avenger = {
    name : "Tony",
    class : "VII",
    id : 1
};
console.log(`My name is ${avenger.name} and my class is ${avenger.class}`)
//h1) Añade más propiedades al object.
avenger.country=null;
avenger.job=null;
//h2) Asegura los cambios volviendo a listar los valores del object
console.log(Object.keys(avenger).toString())