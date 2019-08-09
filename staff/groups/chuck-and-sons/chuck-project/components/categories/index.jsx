function Categories(props) {
    const { categories, searchCategory } = props
    return (
        <section className="categories">
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

