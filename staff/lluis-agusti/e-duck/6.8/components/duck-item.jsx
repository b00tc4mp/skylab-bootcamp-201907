function DuckItem({ data: { duck: { id, title, }}}) {
    return <>
        <h3>{title}</h3>
        <p>{id}</p>
        {/* <FavButton active={favorite} onToggle={() => onToggle(id)} /> */}
    </>
}