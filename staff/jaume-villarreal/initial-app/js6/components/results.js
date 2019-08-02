// /**
//  * Results abstraction.
//  */

class Results extends Component{
    constructor(container){
        super(container)
    }

    listItems(items){
        if(items.error){
            throw new Error(items.error)
        }
        else{
            const ul = this.container.getElementsByTagName('ul')[0]
            ul.innerHTML = '';

            items.forEach( item => {
                const li = document.createElement('li')

                ul.appendChild(li)

                this.paintItem(li , item) //extended in duck-results.js
            })
        } 
    }

    paintItem(li , item){
        li.innerText = item
    }

     resetResults(){
        const ul = this.container.getElementsByTagName('ul')[0]
        ul.innerHTML = '';
    }
}