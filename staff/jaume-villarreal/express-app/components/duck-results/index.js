function DuckResults(ducks){
    return  `<ul>
                ${ducks.map( duck => {
                    `<li>
                        <a href="/ducks/${duck.id}">
                            <h2>${duck.title}</h2>  
                            <img src='${duck.imageUrl}'/>  
                            <span>${duck.price}</span>
                        </a>
                    </li>`
                }).join('')}
            </ul>`
}

module.exports = DuckResults