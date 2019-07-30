
/**
 * Duck Home panel
 * @param {HTMLElement} container 
 */
function DuckHome(container){
    Component.call(this, container);

    var sections= this.container.getElementsByTagName('section');
    var search = new SearchPanel(sections[0]);

    this.search = search;
    var results = new DuckResults(sections[1]);

    this.results = results;

    
};

DuckHome.prototype= Object.create(Component.prototype);
DuckHome.prototype.constructor= DuckHome;


DuckHome.prototype.onClickLogout = function(expression){
    var logoutButton = this.container.children[1];

    logoutButton.addEventListener('click', function(event){
        event.preventDefault();
        expression();
    });
};


/**
 * ShowProducts Results
 * @param {HTMLElement} container 
 */
function DuckResults(container){
    ShowProducts.call(this, container);
}

DuckResults.prototype = Object.create(ShowProducts.prototype);
DuckResults.prototype.constructor = DuckResults;

DuckResults.prototype.paintItem = function (li, item){
    var h3 = document.createElement('h3');

    h3.innerText = item.title;
    li.appendChild(h3);

    var img = document.createElement('img');

    img.src = item.imageUrl;
    li.appendChild(img);

    li.addEventListener('click', function(event) {
        event.preventDefault();

        this.onItemClick(duck.id);
    }.bind(this));

};

DuckResults.prototype.onItemClick = function(id){
    console.log(id);
}