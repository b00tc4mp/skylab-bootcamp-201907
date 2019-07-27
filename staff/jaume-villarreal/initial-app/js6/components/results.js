// /**
//  * Results abstraction.
//  */

class Results extends Component{
    constructor(container){
        super(container)
    }

    listItems(items){

        console.log(items.error)
        if(items.error){
            throw new Error(items.error)
        }
        else{
            const ul = this.container.getElementsByTagName('ul')[0]
            ul.innerHTML = '';

            items.forEach( item => {
                const li = document.createElement('li')
                ul.appendChild(li)
                this.paintItem(li , item)
            })
        }
        
    }

    paintItem(li , item){
        li.innerText = item
    }
}