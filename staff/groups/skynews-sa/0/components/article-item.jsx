function ArticleItem({article: { title, urlToImage}}) {
    return <>
        <h3>{title}</h3>
        <img src={urlToImage}/>
    </>
}