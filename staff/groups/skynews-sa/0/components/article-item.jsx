function ArticleItem({article: { title, urlToImage}}) {
    return <>
        <h3 className="title">{title}</h3>
        <img className="img" src={urlToImage}/>
    </>
}