import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'May Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    if (persons.findIndex((person) => person.name === newPerson.name) !== -1) {
      alert(`${newPerson.name} is already added to the phonebook.`)
    } else {
      setPersons(persons.concat(newPerson))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>
      <h1>Phonebook</h1>
      <div>debug: {newName} / {newNumber}</div>
      <label htmlFor='search'>Filter shown with </label>
      <input id='search' value={search} onChange={handleSearch} />
      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Name:</label>
          <input id='name' value={newName} onChange={handleNewName} />
          <br />
          <label htmlFor='name'>Number:</label>
          <input id='name' value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          search === "" ?
            persons.map((person) =>
              <li key={person.id}>
                {person.name} {person.number}
              </li>)
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
    </div>
  )
}

export default App