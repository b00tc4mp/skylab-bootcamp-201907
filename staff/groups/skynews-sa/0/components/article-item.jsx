function ArticleItem({article: { title, urlToImage}}) {
    return <>
        <h3 className="item-h3">{title}</h3>
        <img className="item-img" src={urlToImage}/>
    </>
}