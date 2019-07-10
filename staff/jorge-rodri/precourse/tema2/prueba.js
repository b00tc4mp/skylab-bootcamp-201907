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
    user()