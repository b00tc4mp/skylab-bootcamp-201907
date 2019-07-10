var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];
let create=function(){
    let flight={
        id:parseInt(prompt("Enter the id: ")),
        to:prompt("Enter the origin: "),
        from:prompt("Enter the destiny: "),
        cost:prompt("Enter the ticket price: "),
        scale:prompt("Scale: (TRUE or FALSE)").toLocaleLowerCase()
    }
    return flight;
};
//FUNCIONES
function pro(){
    let control=true;
    do{
        let name=prompt("Are you USER or ADMIN?").toLocaleLowerCase();
        switch(name){
            case "user":
                user();
                control=false;
            break;
            case "admin":
                admin();
                control=false;
            break;
            default:
                alert("ERROR!!, re-enter parameters.");  
        }  
        console.log("-----------\nGoodbye!")
    }while(control)
}
/*
*Function user
*/
function user(){
    let control="y";
    while(control=="y"){
        let oper=prompt("Press M, N or E to obtain the order of flights in maximum, minimum or equal price.").toLocaleLowerCase();
        switch(oper){
            case "m":
                console.log("-------------\n");
                flights.sort((a,b)=>b.cost-a.cost);
                flights.map((elemento)=>{console.log(`The flight originating in:${elemento.to}, and destination: ${elemento.from}
                has a cost of ${elemento.cost}€ and ${elemento.scale?"does":"doesn´t"} scale.`);
                })
                flights.sort((a,b)=>a.id-b.id);
            break;
            case "n":
                console.log("-------------\n");
                flights.sort((a,b)=>a.cost-b.cost);
                flights.map((elemento)=>{console.log(`The flight originating in:${elemento.to}, and destination: ${elemento.from}
                has a cost of ${elemento.cost}€ and ${elemento.scale?"does":"doesn´t"} scale.`);
                })
                flights.sort((a,b)=>a.id-b.id);
            break;
            case "e":
                console.log("-------------\n")
                let price=prompt("Enter price to search.");
                flights.map((elemento)=>price==elemento.cost?console.log(`The flight originating in:${elemento.to}, and destination: ${elemento.from}
                has a cost of ${elemento.cost}€ and ${elemento.scale?"does":"doesn´t"} scale.`):null)
            break;
            default:
                alert("ERROR");
        }
        control=prompt("Enter Y for more operations if no press enter.").toLocaleLowerCase();
    }
}
/*
*Function admin
*/
function admin(){
    let control="y";
    while(control=="y"){
        let name=prompt("Press A for add flight. or R for remove flights.").toLocaleLowerCase();
        switch(name){
            case "a":
                add();
                console.log("-------------\n");
                flights.map((elemento)=>{console.log(`The flight originating in:${elemento.to}, and destination: ${elemento.from}
                has a cost of ${elemento.cost}€ and ${elemento.scale?"does":"doesn´t"} scale.`)
                })
            break;
            case "r":
                let id=parseInt(prompt("Enter the id: "));
                remove(id);
                console.log("-------------\n");
                //flights.map((elemento)=>{console.log(`The flight originating in:${elemento.to}, and destination: ${elemento.from}
                //has a cost of ${elemento.cost}€ and ${elemento.scale?"does":"doesn´t"} scale.`)
                //})
            break;
            default:
                alert("ERROR!")
                continue;
        }
        control=prompt("Enter Y for more operations if no press enter.").toLocaleLowerCase()
    }
}
//remove element of array with id
function remove(id){
    flights.map((elemento)=>id==elemento.id?flights.splice(id,1):null)
    console.log("-----------\nThe flight "+id+" has been remove.")
}
//add new element of array
function add(){
    let count=0;
    for(let i=0;i<15;i++){
        flights.push(create());
        count++;
        let control=prompt("Press N if you want to exit, otherwise press another key.").toLocaleLowerCase();
        if(control=="n"){
            console.log(`${count} flights have been added.`)
            break;
        }
        if(i==14){
            alert("You can´t enter more flights.")
            console.log(`${count} flights have been added.`)
        }    
    }
}
pro()