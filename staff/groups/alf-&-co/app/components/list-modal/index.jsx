function ListModal({movieId, lists, onCreateList, onToggleMovieList}) {
    return  <>
        {lists &&
            lists.map(list => 
                <li key={Math.random().toFixed(5)}>
                {list.inList ?
                    <>
                        <input type="checkbox" key={Math.random().toFixed(5)}  id={list.name} value={list.name} checked onClick={() => onToggleMovieList(movieId, list.name)}/>
                        <label htmlFor={list.name}>{list.name}</label>
                    </>
                    :
                    <>
                        <input type="checkbox" key={Math.random().toFixed(5)}  id={list.name} value={list.name} onClick={() => onToggleMovieList(movieId, list.name)}/>
                        <label htmlFor={list.name}>{list.name}</label>
                    </>
                }
                </li>)
            }

        <form onSubmit={(event) => {
            onCreateList(event)
        }}>
            <input type="text" name="list" />
            <button>Create new list</button>
        </form>
    </>
}