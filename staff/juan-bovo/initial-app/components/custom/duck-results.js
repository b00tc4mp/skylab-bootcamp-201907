/**
 * Ducks abstraction.
 * 
 * @param {HTMLElement} container 
 */
class DuckResults extends Results {
    constructor(container){
        super(container)
    }

    paintItem = (li, duck) => {
        const h3 = document.createElement('h3')

        h3.innerText = duck.title
        
        li.appendChild(h3)

        const img = document.createElement('img')
        img.src = duck.imageUrl
        
        li.appendChild(img)

        li.addEventListener('click', event => {
            event.preventDefault()

            this.onClickItem(duck.id)
        }) //.bind(this) entre llave y paréntesis
    }

    onClickItem = id => {
        console.log(id)
    }
}

// 'use strict';

// function DuckResults(container) {
//     Results.call(this, container);
// }

// DuckResults.prototype = Object.create(Results.prototype);
// DuckResults.prototype.constructor = DuckResults;

// DuckResults.prototype.paintItem = function (li, duck) {
//     var h3 = document.createElement('h3');

//     h3.innerText = duck.title;

//     li.appendChild(h3);

//     var img = document.createElement('img');
//     img.src = duck.imageUrl;

//     li.appendChild(img);

//     li.addEventListener('click', function(event) {
//         event.preventDefault();

//         this.onClickItem(duck.id);
//     }.bind(this));
// };

// DuckResults.prototype.onClickItem = function(id) {
//     console.log(id);
// };