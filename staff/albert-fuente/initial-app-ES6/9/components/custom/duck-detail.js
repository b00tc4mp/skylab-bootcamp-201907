/**
 * Duck Detail abstraction.
 * 
 * @param {HTMLElement} container 
 */

class DuckDetail extends Component{
    constructor(container){
        super(container)
    }
    displayDuck (duck) {
        let title = this.container.getElementsByTagName('h3')[0]
        title.innerText = duck.title
    
        const image = this.container.getElementsByTagName('img')[0]
        image.src = duck.imageUrl
    
        const price = this.container.getElementsByTagName('span')[0]
        price.innerText = duck.price
    
        const description = this.container.getElementsByTagName('p')[0]
        description.innerText = duck.description
    
        const link = this.container.getElementsByTagName('a')[0]
        link.href = duck.link

        const fav=this.container.getElementsByClassName("duck-detail__fav")[0]
        fav.dataset.value=duck.title



        






    }
    //FUNCTION FOR BACK BUTTON
    onNavigateBack (expression) {
        const back = this.container.children[5]
    
        back.addEventListener('click', event => {
            event.preventDefault()
    
            expression()
        })
    }

    addFav(expression){
        const fav=this.container.getElementsByClassName("duck-detail__fav")[0]
            
    
        fav.addEventListener("click",event=>{
            event.preventDefault();
            
            const ul = document.getElementById('favs')
            alert("FAVORITO: "+ fav.dataset.value)
            const h3 = document.createElement('h3')
            const li=document.createElement("li")
            h3.innerText = fav.dataset.value
            li.appendChild(h3)
            ul.appendChild(li)


/*          const h3 = document.createElement('h3')
            const li=document.createElement("li")
            users[0].favourite.push(duck.title)
            h3.innerText = users[0].favourite 
            
            li.appendChild(h3)
            ul.appendChild(li) */
    
            expression(fav.dataset.value)
        })
    
    }
    //FUNCTION ADD TO FAVORITES
/*     favourites(expression){
        const fav=this.container.getElementsByClassName("duck-detail__fav")[0]
        

        fav.addEventListener("click",event=>{
            event.preventDefault();
            
            const ul = document.getElementById('favs')
            let title=document.querySelector(".duckTitle").innerText
            alert("FAVORITO: " + title)
            const fav=document.querySelector("#favTest")
            fav.innerText=title
            const h3 = document.createElement('h3')
            const li=document.createElement("li")
            h3.innerText = title    
            
            li.appendChild(h3)
            ul.appendChild(li)
    
            expression()
        })
    } */


}

/* 
function DuckDetail(container) {
    Component.call(this, container);
}

DuckDetail.prototype = Object.create(Component.prototype);
DuckDetail.prototype.constructor = DuckDetail;

DuckDetail.prototype.displayDuck = function(duck) {
    var title = this.container.getElementsByTagName('h3')[0];
    title.innerText = duck.title;

    var image = this.container.getElementsByTagName('img')[0];
    image.src = duck.imageUrl;

    var price = this.container.getElementsByTagName('span')[0];
    price.innerText = duck.price;

    var description = this.container.getElementsByTagName('p')[0];
    description.innerText = duck.description;

    var link = this.container.getElementsByTagName('a')[0];
    link.href = duck.link;
}; */