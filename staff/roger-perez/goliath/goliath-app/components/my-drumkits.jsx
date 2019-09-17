function Mydrumkits({drumkits, onEditDrumkit}) {
    return <ul>
        <h2>My drumkits</h2>
        {drumkits.map(drumkit => <li key={drumkit.name} onClick={ () => {
            onEditDrumkit(drumkit)
        }}>
            {drumkit.name} -  {drumkit.id}
        </li>)}
    </ul>
}