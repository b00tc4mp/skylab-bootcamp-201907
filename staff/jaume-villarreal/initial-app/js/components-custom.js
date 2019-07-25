/**
 * Duck Home abstraction.
 * 
 * @param {HTMLElement} container 
 */

 function DuckHome(container){
    Component.call(this,container);

    var sections = this.container.getElementsByTagName('section');

    this.search = new Search(sections[0]);

    this.results = new Ducks(sections[1]);

    var detail = new DuckDetail(sections[2]);
    this.detail = detail;

 }

 DuckHome.prototype = Object.create(Component.prototype);
 DuckHome.prototype.constructor = DuckHome;

 DuckHome.prototype.onClickLogout = function(expression){
     var logout = this.container.children[1];

     logout.addEventListener('click' , function(event){
         event.preventDefault();
         expression();
     })
 };


/**
* Ducks abstraction
* 
* @param {HTMLElement} container
*/

function Ducks(container){
    Results.call(this,container);
};

Ducks.prototype = Object.create(Results.prototype);
Ducks.prototype.constructor = Ducks;

Ducks.prototype.paintItem = function(li , duck){
    var h3 = document.createElement('h3');
    
    h3.innerText = duck.title;
    
    li.appendChild(h3);
    
    var img = document.createElement('img');
    
    img.src = duck.imageUrl;

    li.appendChild(img);

    li.addEventListener('click', function(event) {
        event.preventDefault();

        this.onItemClick(duck.id);
    }.bind(this));
}

Ducks.prototype.onItemClick = function(id){
    console.log(id);
}

/**
* Duck Detail abstraction
* 
* @param {HTMLElement} container
*/

function DuckDetail (container){
    Component.call(this , container);
}

DuckDetail.prototype = Object.create(Component.prototype);
DuckDetail.prototype.constructor = DuckDetail;

