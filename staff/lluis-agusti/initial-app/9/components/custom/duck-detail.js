/**
 * Duck Detail abstraction.
 * 
 * @param {HTMLElement} container 
 */
function DuckDetail(container) {
    Component.call(this, container);
} 

// DuckDetail.prototype = Object.create(Results.prototype);
// DuckDetail.prototype.constructor = DuckDetail;

Ducks.prototype.paintDuck = function (li, duck) {
    
    var h3 = document.createElement('h3');
    h3.innerText = "Your next duck: " + duck.title;
    li.appendChild(h3);

    var h4 = document.createElement('h4');
    h4.innerText = "Almost free: " + duck.price;
    li.appendChild(h4);
    
    var img = document.createElement('img');
    img.src = duck.imageUrl;
    li.appendChild(img);

    var p = document.createElement('p');
    p.innerText = "Description: " + duck.description;
    li.appendChild(p);

};