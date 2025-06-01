function Persons( { persons, filter, removeNote } ) {
    return (
        <ul>
            {
            persons
            .filter(per=>per.name.toLowerCase().includes(filter.toLowerCase()))
            .map(per=>(
                <li key={per.name}>
                    {per.name} {per.number}
                    <button onClick={() => removeNote(per.id)}>delete</button>
                </li>
                ))
            }
        </ul>
    )
}

export default Persons