function DuckItem({ duck: { title, imageUrl, price } }) {
  return (
    <>
      vbnm,.
      <h3>{title}</h3>
      <img
        src={imageUrl}
        onClick={event => {
          event.preventDefault()
        }}
      />
      <span>{price}</span>
    </>
  )
}
