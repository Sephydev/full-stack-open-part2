const Numbers = ({ search, persons }) => {
  return (
    <ul>
      {search === "" ?
        persons.map((person) =>
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        )
        :
        persons
          .filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
          .map((person) =>
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          )

      }
    </ul>
  )
}

export default Numbers