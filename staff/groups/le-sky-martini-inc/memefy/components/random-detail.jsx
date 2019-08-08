function RandomDetail({ randomGif: { data: { title, images} }}) {
    return <>
        <h3 className={`random__title`}>{title}</h3>
        <img className={`random__photo`} src={images.downsized_large.url}/>
    </>
}