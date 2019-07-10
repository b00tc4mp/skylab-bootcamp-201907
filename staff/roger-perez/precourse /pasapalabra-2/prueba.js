const myForm = document.getElementById("respuesta").text

myForm.addEventListener("submit",(e) => {
    e.preventDefault();
    console.log(myForm);
})

