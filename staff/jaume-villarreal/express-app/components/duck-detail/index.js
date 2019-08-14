function DuckDetail(duck){
    return `<article>
                <h2>${duck.title}</h2>  
                <img src='${duck.imageUrl}'/>  
                <p>${duck.description}</p>
                <span>${duck.price}</span>
                <a href="${duck.link}" target="_blank">Go to store</a>
            </article>`
}

module.exports = DuckDetail