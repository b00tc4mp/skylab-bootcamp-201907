function RandomDetail({ randomGif: { data: { title, images} }}) {
    return <div className={`random__group`}>
        <h3 className={`random__gif-title`}>{title}</h3>
        <img className={`random__photo`} src={images.downsized_large.url}/>
    </div>
}