function Categories(props) {
    const { categories, searchCategory } = props
    return (
        <section className="categories">
            <h3>Categories</h3>
            <ul className="categories__list">
                {categories.length && categories.map(category => {
                    return <li key={`${category}`} onClick={(event) => {
                        event.preventDefault()
                        searchCategory(category)
                    }}><p className="category">{category}</p></li>
                })}
            </ul>
        </section>
    )
}

