/**
 * Duck Details Abstraction
 */

class DuckDetail extends Component {
  constructor(container) {
    super(container)
  }

  displayDuck(duck) {
    const title = this.container.getElementsByTagName('h3')[0]
    title.innerText = duck.title

    const image = this.container.getElementsByTagName('img')[0]
    image.src = duck.imageUrl

    const price = this.container.getElementsByTagName('span')[0]
    price.innerText = duck.price

    const description = this.container.getElementsByTagName('p')[0]
    description.innerText = duck.description

    const link = this.container.getElementsByTagName('a')[0]
    link.href = duck.link

    const favoriteLink = this.container.getElementsByTagName('a')[2]
    favoriteLink.dataset.value = duck.id
  }

  onNavigateBack = expression => {
    const back = this.container.querySelectorAll('a')[1]
    back.addEventListener('click', event => {
      event.preventDefault()
      expression()
    })
  }

  toggleFavorite = expression => {
    const favoriteLink = this.container.querySelectorAll('a')[2]
    favoriteLink.addEventListener('click', event => {
      event.preventDefault()
      expression(event.target.dataset.value)
    })
  }
}

// Add duck to favorites
// li.addEventListener('click', event => {
//   event.preventDefault()

//   this.onClickItem(duck.id)
// })
