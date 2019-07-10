//a) Escribe una función que liste los nombres de propiedad del object (puedes usar el object avenger creado más arriba)
var avenger = {
    name : "Tony",
    class : "VII",
    id : 1
};
console.log(Object.keys(avenger).toString())
//b) Ahora, crea una function() que liste solo los valores de las propiedades.
console.log(Object.values(avenger).toString());
//c) Cambia el valor de la propiedad class por "XI" y asegurate de que los cambios se han efectuado.
avenger.class="XI";
console.log(avenger.class)
//d) Ahora, elimina la propiedad id y asegura los cambios.
delete avenger.id;
console.log(Object.keys(avenger).toString())
//e) Añade una nueva propiedad, por ejemplo city y dale un valor. Asegura los cambios e imprime por consola esa nueva propiedad.
avenger.city="Manhataan";
console.log((Object.keys(avenger)+Object.values(avenger)).toString())
//f) Lista el número de propiedades que contiene el object.
console.log(`There are ${Object.keys(avenger).length}`)
//g) Cambia la propiedad name por fullName y asegura los cambios.
avenger.fullName=avenger.name
delete avenger.name;
console.log(Object.keys(avenger).toString())
console.log(Object.values(avenger).toString());
//h) Lista todos las valores del object a través de un console.log()
console.log(`My name is ${avenger.name} and my class is ${avenger.class}`)
//h1) Añade más propiedades al object.
avenger.country;
avenger.job;
//h2) Asegura los cambios volviendo a listar los valores del object
console.log(Object.keys(avenger).toString())
//i) Crea un constructor de object llamado "Avenger", al cual 
//le pasarás ciertos parámetros, creando una instancia del object con las propiedades de nuestro object creado.
function Avenger(fullName, city, job, editorial){
    this.fullName=fullName;
    this.city=city;
    this.job=job;
    this.editorial=editorial;
}
let spiderman=new Avenger("Peter Parker", "NYC", "Student", "Marvel");
console.log(spiderman);
//j) Crea otro object e imprime sus propiedades por pantalla.
let thor=new Avenger("Thor", "Ragnarok", "God", "Marvel");
console.log(Object.keys(thor))
//k) Crea una propiedad del object que liste automáticamente los valores de la instancia.
function Avenger(fullName, city, job, editorial){
    this.fullName=fullName;
    this.city=city;
    this.job=job;
    this.editorial=editorial;
    this.properties=function(){
        console.log(`My name is ${this.fullName}`);
    }
}
let thor=new Avenger("Thor", "Ragnarok", "God", "Marvel");
console.log(thor.properties())
