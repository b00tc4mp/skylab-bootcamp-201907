/**
 * Duck Favorite Abstraction
 */

class DuckFavorites extends Results {
  constructor(container) {
    super(container)
  }
  paintItem(li, duck) {
    const h3 = document.createElement('h3')

    h3.innerText = duck.title

    li.appendChild(h3)

    const img = document.createElement('img')
    img.src = duck.imageUrl

    li.appendChild(img)

    li.addEventListener('click', event => {
      event.preventDefault()

      this.onClickItem(duck.id)
    })
  }

  onClickItem(id) {
    console.log(id)
  }
}
