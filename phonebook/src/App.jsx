import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])

  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    if (persons.findIndex((person) => person.name === newPerson.name) !== -1) {
      console.log(newPerson.name)
      alert(`${newPerson.name} is already added to the phonebook.`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map((person) => <li key={person.name}>{person.name}</li>)
        }
      </ul>
    </div>
  )
}

export default App